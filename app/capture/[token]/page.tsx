"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

type Session = {
  token: string;
  scenario?: string | null;
  vehicle_type?: string | null;
  status: string;
};

const silhouetteMap: Record<string, string> = {
  car: "/silhouettes/car.png",
  electric_car: "/silhouettes/car.png",
  pickup: "/silhouettes/pickup.png",
  van: "/silhouettes/van.png",
  motorcycle: "/silhouettes/motorcycle.png",
  atv: "/silhouettes/atv.png",
};

const silhouetteScale: Record<string, number> = {
  car: 0.78,
  electric_car: 0.78,
  pickup: 0.82,
  van: 0.86,
  motorcycle: 0.55,
  atv: 0.6,
};

const normalizeVehicleType = (type?: string | null): string => {
  if (!type) return "car";
  const t = type.toLowerCase();
  if (["car", "sedan", "hatchback"].includes(t)) return "car";
  if (["electric_car", "electric", "ev"].includes(t)) return "electric_car";
  if (["motorcycle", "motor", "bike"].includes(t)) return "motorcycle";
  if (["atv", "quad"].includes(t)) return "atv";
  if (["pickup", "truck"].includes(t)) return "pickup";
  if (["van", "minivan", "kamyonet"].includes(t)) return "van";
  return "car";
};

export default function CapturePage() {
  const params = useParams();
  const token = params?.token as string;
  const api = process.env.NEXT_PUBLIC_API_BASE;

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const liveIntervalRef = useRef<any>(null);
  const tickRef = useRef<any>(null);

  const [vehicleType, setVehicleType] = useState("car");
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSec, setElapsedSec] = useState(0);

  const [rotation, setRotation] = useState(0);
  const [smoothedRotation, setSmoothedRotation] = useState(0);
  const [lastAlpha, setLastAlpha] = useState<number | null>(null);

  const [warnings, setWarnings] = useState<string[]>([]);
  const hasWarning = warnings.length > 0;

  const [msg, setMsg] = useState(
    "Aracın önünden başlayın ve rehber noktayı takip ederek etrafında dönün."
  );

  const MIN_DURATION_SEC = 25;

  /* SESSION */
  useEffect(() => {
    if (!token) return;
    fetch(`${api}/session/${token}`)
      .then((r) => r.json())
      .then((s: Session) => {
        setVehicleType(normalizeVehicleType(s.vehicle_type));
      })
      .catch(() => {});
  }, [api, token]);

  /* CAMERA */
  useEffect(() => {
    if (!navigator?.mediaDevices?.getUserMedia) {
      setMsg("Bu tarayıcı kamera erişimini desteklemiyor.");
      return;
    }

    let stream: MediaStream | null = null;

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" }, audio: false })
      .then((s) => {
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.play().catch(() => {});
        }
      })
      .catch(() => setMsg("Kamera açılamadı. Tarayıcı izinlerini kontrol edin."));

    return () => stream?.getTracks().forEach((t) => t.stop());
  }, []);

  /* GYRO */
  useEffect(() => {
    const handler = (e: DeviceOrientationEvent) => {
      if (!recording || e.alpha == null) return;
      if (lastAlpha !== null) {
        let diff = Math.abs(e.alpha - lastAlpha);
        if (diff > 180) diff = 360 - diff;
        setRotation((r) => Math.min(360, r + Math.min(diff, 12)));
      }
      setLastAlpha(e.alpha);
    };
    window.addEventListener("deviceorientation", handler);
    return () => window.removeEventListener("deviceorientation", handler);
  }, [recording, lastAlpha]);

  /* ROTATION SMOOTH */
  useEffect(() => {
    if (!recording) return;
    setSmoothedRotation((p) => Math.min(360, p * 0.85 + rotation * 0.15));
  }, [rotation, recording]);

  /* TIMER */
  const startTimer = () => {
    tickRef.current = setInterval(() => {
      if (!startTime) return;
      setElapsedSec((Date.now() - startTime) / 1000);
    }, 250);
  };

  const stopTimer = () => {
    if (tickRef.current) clearInterval(tickRef.current);
  };

  /* RECORD START */
  const startRecording = () => {
    if (!videoRef.current?.srcObject) {
      setMsg("Kamera hazır değil.");
      return;
    }

    chunks.current = [];
    setRotation(0);
    setSmoothedRotation(0);
    setElapsedSec(0);
    setLastAlpha(null);

    const now = Date.now();
    setStartTime(now);

    const rec = new MediaRecorder(videoRef.current.srcObject as MediaStream, {
      mimeType: "video/webm",
      videoBitsPerSecond: 4_000_000,
    });

    rec.ondataavailable = (e) => e.data.size && chunks.current.push(e.data);

    rec.onstop = async () => {
      setUploading(true);
      const blob = new Blob(chunks.current, { type: "video/webm" });
      const form = new FormData();
      form.append("video", blob);

      try {
        const res = await fetch(`${api}/upload/${token}/video`, {
          method: "POST",
          body: form,
        });
        if (res.ok) {
          window.location.href = `/report/${token}`;
        } else {
          setMsg("Yükleme veya analiz hatası.");
        }
      } catch {
        setMsg("Bağlantı hatası.");
      } finally {
        setUploading(false);
      }
    };

    mediaRecorderRef.current = rec;
    rec.start();
    setRecording(true);
    startTimer();
    setMsg("Yavaşça aracı dolaşın. En az 25 saniye çekim yapın.");
  };

  /* RECORD STOP */
  const stopRecording = () => {
    const duration = startTime ? (Date.now() - startTime) / 1000 : 0;

    if (duration < MIN_DURATION_SEC) {
      setMsg(`Çekim kısa. En az ${MIN_DURATION_SEC} sn çekmelisiniz.`);
      return;
    }

    if (smoothedRotation < 300) {
      setMsg("360° tarama tamamlanmadı. Aracı tam tur dolaşın.");
      return;
    }

    stopTimer();
    setRecording(false);
    setMsg("Video yükleniyor ve analiz ediliyor…");
    mediaRecorderRef.current?.stop();
  };

  const captureProgress = Math.min(
    100,
    Math.round(
      Math.min(1, elapsedSec / MIN_DURATION_SEC) * 70 +
        Math.min(1, smoothedRotation / 360) * 30
    )
  );

  return (
    <main>
      <div style={{ position: "relative", height: "100vh", background: "#000" }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 140,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: 10,
            background: "#333",
            borderRadius: 999,
          }}
        >
          <div
            style={{
              width: `${captureProgress}%`,
              height: "100%",
              background: "#00c853",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 90,
            left: "50%",
            transform: "translateX(-50%)",
            color: "#fff",
            textAlign: "center",
          }}
        >
          {msg}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {!recording ? (
            <button
              disabled={uploading}
              onClick={startRecording}
              style={{
                padding: 16,
                fontSize: 18,
                borderRadius: 999,
                background: "#00c853",
                color: "#fff",
                border: "none",
              }}
            >
              ▶️ Çekimi Başlat
            </button>
          ) : (
            <button
              onClick={stopRecording}
              style={{
                padding: 16,
                fontSize: 18,
                borderRadius: 999,
                background: "#111",
                color: "#fff",
                border: "none",
              }}
            >
              ⏹️ Bitir
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
