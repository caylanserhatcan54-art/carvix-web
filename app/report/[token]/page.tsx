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
  const [waiting, setWaiting] = useState(false);
  const [timeoutReached, setTimeoutReached] = useState(false);

  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    let interval: any;

    const fetchSession = async () => {
      try {
        const r = await fetch(`${api}/session/${token}`);
        const data = await r.json();

        setSession(data);
        setLoading(false);

        const analysisDone =
          data.status === "analysis_completed" ||
          data.confidence ||
          data.ai_commentary;

        if (analysisDone) {
          setWaiting(false);
          clearInterval(interval);
          return;
        }

        // ⏱️ 4 dk timeout
        if (Date.now() - startTimeRef.current > 4 * 60 * 1000) {
          setTimeoutReached(true);
          setWaiting(false);
          clearInterval(interval);
          return;
        }

        setWaiting(true);
      } catch (e) {
        // Render sleep vs.
        setWaiting(true);
      }
    };

    fetchSession();
    interval = setInterval(fetchSession, 4000);

    return () => clearInterval(interval);
  }, [token, api]);

  if (loading) {
    return <div className="container" style={{ padding: 24 }}>Rapor hazırlanıyor…</div>;
  }

  if (!session) {
    return <div className="container" style={{ padding: 24 }}>Rapor bulunamadı.</div>;
  }

  if (waiting) {
    return (
      <div className="container" style={{ padding: 24 }}>
        <h2>🔄 Analiz devam ediyor</h2>
        <p>
          Video ve ses verileri inceleniyor.  
          PDF rapor birkaç dakika içinde hazır olacaktır.
        </p>
      </div>
    );
  }

  if (timeoutReached) {
    return (
      <div className="container" style={{ padding: 24 }}>
        <h2>⏳ Analiz uzadı</h2>
        <p>
          Analiz beklenenden uzun sürdü.  
          PDF rapor hazır olmuş olabilir.
        </p>
        <a
          href={`/report/${token}.pdf`}
          target="_blank"
          rel="noreferrer"
          style={{ fontWeight: 800 }}
        >
          📄 PDF Raporu Denetle
        </a>
      </div>
    );
  }

  const score = session.confidence?.confidence_score ?? null;
  const level = session.confidence?.confidence_level ?? "";

  const reportUrl = `${window.location.origin}/report/${token}.pdf`;
  const whatsappText = encodeURIComponent(
    `Merhaba,\n\nAraç için yapılan AI ön analiz raporu:\n\n${reportUrl}\n\nNot: Bu rapor ekspertiz yerine geçmez.`
  );

  return (
    <div>
      {/* NAV */}
      <div className="nav">
        <div className="container nav-inner">
          <div className="brand">Carvix</div>
          <div className="nav-links">
            <a href="/">Ana Sayfa</a>
            <a href={`/report/${token}.pdf`} target="_blank">PDF</a>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: 22, maxWidth: 920, margin: "0 auto" }}>

            <div className="kicker">Rapor Bilgileri</div>
            <p>
              <b>Araç Tipi:</b> {prettyVehicle(session.vehicle_type)} <br />
              <b>Senaryo:</b> {prettyScenario(session.scenario)}
            </p>

            {score !== null && (
              <>
                <div className="hr" />
                <h3>Rapor Güven Skoru</h3>
                <b>{score}/100 – {level.toUpperCase()}</b>
                <ul>
                  {session.confidence?.reasons?.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </>
            )}

            {session.suspicious_images?.length ? (
              <>
                <div className="hr" />
                <h3>Şüpheli Görsel Bulgular</h3>
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
                <div className="hr" />
                <h3>Yapay Zekâ Değerlendirmesi</h3>
                <p style={{ whiteSpace: "pre-line" }}>
                  {session.ai_commentary.text}
                </p>
              </>
            )}

            <div className="hr" />
            <a href={reportUrl} target="_blank" style={{ fontWeight: 800 }}>
              📄 PDF Raporu Aç
            </a>{" "}
            |{" "}
            <a href={`https://wa.me/?text=${whatsappText}`} target="_blank">
              📲 WhatsApp ile Gönder
            </a>

          </div>
        </div>
      </section>
    </div>
  );
}
