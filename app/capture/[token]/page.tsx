"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

type Session = {
  token: string;
  scenario?: string | null;
  vehicle_type?: string | null;
  status: string;
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
  const timerRef = useRef<any>(null);

  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSec, setElapsedSec] = useState(0);

  const [msg, setMsg] = useState(
    "Aracın önünden başlayın ve yavaşça etrafında dolaşın."
  );

  const MIN_DURATION_SEC = 25;

  /* ================= CAMERA ================= */
  useEffect(() => {
    if (!navigator?.mediaDevices?.getUserMedia) {
      setMsg("Bu tarayıcı kamera erişimini desteklemiyor.");
      return;
    }

    let stream: MediaStream | null = null;

    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      })
      .then((s) => {
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.play().catch(() => {});
        }
      })
      .catch(() =>
        setMsg("Kamera açılamadı. Tarayıcı izinlerini kontrol edin.")
      );

    return () => stream?.getTracks().forEach((t) => t.stop());
  }, []);

  /* ================= TIMER ================= */
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      if (!startTime) return;
      setElapsedSec((Date.now() - startTime) / 1000);
    }, 250);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  /* ================= START ================= */
  const startRecording = () => {
    if (!videoRef.current?.srcObject) {
      setMsg("Kamera hazır değil.");
      return;
    }

    chunks.current = [];
    setElapsedSec(0);

    const now = Date.now();
    setStartTime(now);

    const rec = new MediaRecorder(videoRef.current.srcObject as MediaStream, {
      mimeType: "video/webm",
      videoBitsPerSecond: 4_000_000,
    });

    rec.ondataavailable = (e) => e.data.size && chunks.current.push(e.data);

    rec.onstop = async () => {
      setUploading(true);
      setMsg("Video yükleniyor ve analiz ediliyor… Lütfen bekleyin.");

      const blob = new Blob(chunks.current, { type: "video/webm" });
      const form = new FormData();
      form.append("video", blob);

      try {
        const res = await fetch(`${api}/upload/${token}/video`, {
          method: "POST",
          body: form,
        });

        if (!res.ok) throw new Error();

        // 🔥 ANALİZ BİTTİ → REPORT
        window.location.href = `/report/${token}`;
      } catch {
        setMsg("Yükleme veya analiz sırasında hata oluştu.");
        setUploading(false);
      }
    };

    mediaRecorderRef.current = rec;
    rec.start();
    setRecording(true);
    startTimer();
    setMsg("Yavaşça aracı dolaşın. En az 25 saniye çekim yapın.");
  };

  /* ================= STOP ================= */
  const stopRecording = () => {
    const duration = startTime ? (Date.now() - startTime) / 1000 : 0;

    if (duration < MIN_DURATION_SEC) {
      setMsg(`Çekim kısa. En az ${MIN_DURATION_SEC} sn çekmelisiniz.`);
      return;
    }

    stopTimer();
    setRecording(false);
    mediaRecorderRef.current?.stop();
  };

  const captureProgress = Math.min(
    100,
    Math.round((elapsedSec / MIN_DURATION_SEC) * 100)
  );

  /* ================= UI ================= */
  if (uploading) {
    return (
      <main style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h2>🔍 Analiz Yapılıyor</h2>
          <p>Video ve ses verileri inceleniyor.</p>
          <p>Bu işlem 1–3 dakika sürebilir.</p>
        </div>
      </main>
    );
  }

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
            bottom: 190,
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
            bottom: 150,
            left: "50%",
            transform: "translateX(-50%)",
            color: "#fff",
            textAlign: "center",
            width: "90%",
            fontSize: 14,
          }}
        >
          {msg}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {!recording ? (
            <button
              onClick={startRecording}
              style={{
                padding: "14px 22px",
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
                padding: "14px 22px",
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
