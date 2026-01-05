"use client";

import { useEffect, useState, useRef } from "react";

type SuspiciousImage = {
  image_path: string;
  caption?: string;
};

type Session = {
  token: string;
  scenario: string;
  vehicle_type: string;
  status: string;
  error?: string;

  confidence?: {
    confidence_score: number;
    confidence_level: string;
    reasons: string[];
  };

  ai_commentary?: {
    ok: boolean;
    method: string;
    text: string;
  };

  suspicious_images?: SuspiciousImage[];
};

function prettyVehicle(v: string) {
  const map: Record<string, string> = {
    car: "Araba (içten yanmalı)",
    electric_car: "Elektrikli araba",
    motorcycle: "Motosiklet",
    atv: "ATV",
    pickup: "Pickup",
    van: "Van / Kamyonet / Minibüs",
  };
  return map[v] || v;
}

function prettyScenario(s: string) {
  const map: Record<string, string> = {
    buy_sell_seller: "Araç alım–satım (satıcı çekimi)",
    buy_sell_buyer: "Araç alım–satım (alıcı çekimi)",
    own_car: "Kendi aracım / eş–dost",
    pre_inspection: "Muayene öncesi ön kontrol",
    buy_sell: "Araç alım–satım",
  };
  return map[s] || s;
}

export default function ReportPage({ params }: { params: { token: string } }) {
  const token = params.token;
  const api = process.env.NEXT_PUBLIC_API_BASE;

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [waiting, setWaiting] = useState(true);

  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const r = await fetch(`${api}/session/${token}`);
        const data = await r.json();

        setSession(data);
        setLoading(false);

        const analysisDone =
          data.status === "analysis_completed" ||
          data.confidence ||
          data.ai_commentary ||
          data.suspicious_images;

        if (analysisDone) {
          setWaiting(false);
          clearInterval(interval);
        }

        // ⏱️ max 3 dk bekle
        if (Date.now() - startTimeRef.current > 3 * 60 * 1000) {
          setWaiting(false);
          clearInterval(interval);
        }
      } catch {
        // Render sleep → sessiz devam
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [token, api]);

  if (loading || waiting) {
    return (
      <div className="container" style={{ padding: 24 }}>
        <h2>🔄 Analiz yapılıyor</h2>
        <p>
          Video ve ses verileri inceleniyor.<br />
          Bu işlem 1–3 dakika sürebilir.
        </p>
      </div>
    );
  }

  if (!session) {
    return <div className="container">Rapor bulunamadı.</div>;
  }

  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: 22, maxWidth: 900, margin: "0 auto" }}>

            <h2>📊 Araç Ön Analiz Sonucu</h2>

            <p>
              <b>Araç Tipi:</b> {prettyVehicle(session.vehicle_type)} <br />
              <b>Senaryo:</b> {prettyScenario(session.scenario)}
            </p>

            {session.error && (
              <div style={{ background: "#fff3cd", padding: 12, borderRadius: 6 }}>
                ⚠️ Analiz sırasında bazı teknik sınırlamalar oluştu.
              </div>
            )}

            {session.confidence && (
              <>
                <hr />
                <h3>🔐 Güven Skoru</h3>
                <b>
                  {session.confidence.confidence_score}/100 –{" "}
                  {session.confidence.confidence_level.toUpperCase()}
                </b>
                <ul>
                  {session.confidence.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </>
            )}

            {session.suspicious_images?.length ? (
              <>
                <hr />
                <h3>🔍 Şüpheli Görsel Bulgular</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {session.suspicious_images.slice(0, 4).map((img, i) => (
                    <div key={i}>
                      <img
                        src={`${api}${img.image_path}`}
                        style={{ width: "100%", borderRadius: 6 }}
                      />
                      <small>{img.caption}</small>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {session.ai_commentary && (
              <>
                <hr />
                <h3>🧠 Yapay Zekâ Değerlendirmesi</h3>
                <p style={{ whiteSpace: "pre-line" }}>
                  {session.ai_commentary.text}
                </p>
              </>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
