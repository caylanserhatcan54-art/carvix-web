"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    let interval: any;

    const fetchSession = () => {
      fetch(`${api}/session/${token}`)
        .then((r) => r.json())
        .then((data) => {
          setSession(data);
          setLoading(false);

          if (data.status !== "analysis_completed") {
            setWaiting(true);
          } else {
            setWaiting(false);
            clearInterval(interval);
          }
        })
        .catch(() => setLoading(false));
    };

    fetchSession();
    interval = setInterval(fetchSession, 3000);

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
        <p>Video ve ses verileri inceleniyor. PDF rapor birkaç dakika içinde hazır olacaktır.</p>
      </div>
    );
  }

  const score = session.confidence?.confidence_score ?? null;
  const level = session.confidence?.confidence_level ?? "";

  const reportUrl = `${window.location.origin}/report/${token}.pdf`;

  const whatsappText = encodeURIComponent(
    `Merhaba,\n\nAraç için yapılan AI ön analiz raporunu aşağıdaki linkten inceleyebilir misiniz?\n\n` +
    `${reportUrl}\n\n` +
    `Not: Bu rapor ekspertiz yerine geçmez, ön bilgilendirme amaçlıdır.`
  );

  return (
    <div>
      {/* NAV */}
      <div className="nav">
        <div className="container nav-inner">
          <div className="brand">
            <span className="brand-badge" />
            Carvix
          </div>
          <div className="nav-links">
            <a href="/">Ana Sayfa</a>
            <a href="/#nasil">Nasıl çalışır?</a>
            <a href={`/report/${token}.pdf`} target="_blank" rel="noreferrer">
              PDF
            </a>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: 22, maxWidth: 920, margin: "0 auto" }}>

            {/* GENEL BİLGİ */}
            <div className="kicker">Rapor Bilgileri</div>
            <p className="p">
              <b>Araç Tipi:</b> {prettyVehicle(session.vehicle_type)} <br />
              <b>Senaryo:</b> {prettyScenario(session.scenario)}
            </p>

            {/* GÜVEN */}
            {score !== null && (
              <>
                <div className="hr" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div className="card" style={{ padding: 16 }}>
                    <div className="kicker">Rapor Güven Skoru</div>
                    <div style={{ fontWeight: 900, fontSize: 22, marginTop: 6 }}>
                      {score}/100 – {level.toUpperCase()}
                    </div>

                    {session.confidence?.reasons?.length ? (
                      <ul style={{ marginTop: 10, paddingLeft: 18 }}>
                        {session.confidence.reasons.map((r, i) => (
                          <li key={i} style={{ fontSize: 14 }}>{r}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  <div className="card" style={{ padding: 16 }}>
                    <div className="kicker">Özet</div>
                    <p className="p" style={{ marginTop: 10 }}>
                      Bu skor; video kalitesi, kapsama oranı ve analiz tutarlılığına göre hesaplanmıştır.
                      Nihai karar öncesi profesyonel ekspertiz önerilir.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* 🔍 ŞÜPHELİ GÖRSELLER */}
            {session.suspicious_images && session.suspicious_images.length > 0 && (
              <>
                <div className="hr" />
                <div className="kicker">Şüpheli Görsel Bulgular</div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    marginTop: 10,
                  }}
                >
                  {session.suspicious_images.slice(0, 4).map((img, i) => (
                    <div key={i} className="card" style={{ padding: 8 }}>
                      <img
                        src={`${api}${img.image_path}`}
                        alt="Şüpheli görsel"
                        style={{ width: "100%", borderRadius: 6 }}
                      />
                      <p style={{ fontSize: 13, marginTop: 6 }}>
                        {img.caption || "Görsel risk sinyali"}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* AI YORUM */}
            {session.ai_commentary && (
              <>
                <div className="hr" />
                <div className="kicker">Yapay Zekâ Genel Değerlendirmesi</div>
                <div className="card" style={{ padding: 16, marginTop: 10 }}>
                  <p style={{ whiteSpace: "pre-line", lineHeight: 1.7 }}>
                    {session.ai_commentary.text}
                  </p>
                </div>
              </>
            )}

            {/* PAYLAŞ */}
            <div className="hr" />
            <div className="kicker">Raporu Paylaş</div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={reportUrl} target="_blank" rel="noreferrer" style={{ fontWeight: 800 }}>
                📄 PDF Raporu Aç
              </a>

              <a
                href={`https://wa.me/?text=${whatsappText}`}
                target="_blank"
                rel="noreferrer"
                style={{ fontWeight: 800 }}
              >
                📲 WhatsApp ile Satıcıya Gönder
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
