"use client";

import { useEffect, useState } from "react";

type SuspiciousImage = {
  image_path: string; // artık /media/... url
  caption?: string;
};

type Session = {
  token: string;
  scenario: string;
  vehicle_type: string;
  status: string;
  error?: string | null;

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

  useEffect(() => {
    const run = async () => {
      try {
        const r = await fetch(`${api}/session/${token}`, { cache: "no-store" });
        const data = await r.json();
        setSession(data);
      } catch (e) {
        setSession(null);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [token, api]);

  if (loading) {
    return <div className="container" style={{ padding: 24 }}>Rapor hazırlanıyor…</div>;
  }

  if (!session) {
    return <div className="container" style={{ padding: 24 }}>Rapor bulunamadı.</div>;
  }

  // ✅ Senkron modelde genelde buraya status=analysis_completed gelmeli.
  // Ama yine de güvenli fallback:
  const hasResult = !!(session.confidence || session.ai_commentary || session.suspicious_images?.length);
  if (!hasResult) {
    return (
      <div className="container" style={{ padding: 24 }}>
        <h2>⚠️ Sonuç yok</h2>
        <p>Analiz sonucu bulunamadı. Lütfen geri dönüp videoyu tekrar yükleyin.</p>
        {session.error ? (
          <pre style={{ marginTop: 10, whiteSpace: "pre-wrap" }}>{session.error}</pre>
        ) : null}
      </div>
    );
  }

  const score = session.confidence?.confidence_score ?? null;
  const level = session.confidence?.confidence_level ?? "";

  const whatsappText = encodeURIComponent(
    `Merhaba,\n\nAraç için yapılan AI ön analiz sonucu aşağıdadır.\n\n` +
      `Güven Skoru: ${score ?? "-"} / 100 (${(level || "").toUpperCase()})\n\n` +
      `Not: Bu rapor ekspertiz yerine geçmez, ön bilgilendirme amaçlıdır.`
  );

  return (
    <div>
      <div className="nav">
        <div className="container nav-inner">
          <div className="brand">Carvix</div>
          <div className="nav-links">
            <a href="/">Ana Sayfa</a>
            <a href="/#nasil">Nasıl çalışır?</a>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: 22, maxWidth: 920, margin: "0 auto" }}>
            <div className="kicker">Rapor Bilgileri</div>
            <p className="p">
              <b>Araç Tipi:</b> {prettyVehicle(session.vehicle_type)} <br />
              <b>Senaryo:</b> {prettyScenario(session.scenario)}
            </p>

            {session.error ? (
              <div className="card" style={{ padding: 14, marginTop: 12, borderLeft: "6px solid #ef4444" }}>
                <b>⚠️ Analiz Hatası</b>
                <div style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>{session.error}</div>
                <div style={{ marginTop: 10, fontSize: 13, color: "#475569" }}>
                  Yine de mevcut çıkarımlar gösteriliyor (varsa).
                </div>
              </div>
            ) : null}

            {score !== null ? (
              <>
                <div className="hr" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div className="card" style={{ padding: 16 }}>
                    <div className="kicker">Rapor Güven Skoru</div>
                    <div style={{ fontWeight: 900, fontSize: 22, marginTop: 6 }}>
                      {score}/100 – {(level || "").toUpperCase()}
                    </div>
                    {session.confidence?.reasons?.length ? (
                      <ul style={{ marginTop: 10, paddingLeft: 18 }}>
                        {session.confidence.reasons.slice(0, 8).map((r, i) => (
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
            ) : null}

            {session.suspicious_images?.length ? (
              <>
                <div className="hr" />
                <div className="kicker">Şüpheli Görsel Bulgular</div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 10 }}>
                  {session.suspicious_images.slice(0, 4).map((img, i) => (
                    <div key={i} className="card" style={{ padding: 8 }}>
                      <img
                        src={`${api}${img.image_path}`}
                        alt="Şüpheli kare"
                        style={{ width: "100%", borderRadius: 6 }}
                      />
                      <p style={{ fontSize: 13, marginTop: 6 }}>
                        {img.caption || "Görsel risk sinyali"}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {session.ai_commentary ? (
              <>
                <div className="hr" />
                <div className="kicker">Yapay Zekâ Genel Değerlendirmesi</div>
                <div className="card" style={{ padding: 16, marginTop: 10 }}>
                  <p style={{ whiteSpace: "pre-line", lineHeight: 1.7, margin: 0 }}>
                    {session.ai_commentary.text}
                  </p>
                  <div style={{ marginTop: 12, fontSize: 13, color: "#475569" }}>
                    Not: Bu rapor ekspertiz yerine geçmez; ön bilgilendirme amaçlıdır.
                  </div>
                </div>
              </>
            ) : null}

            <div className="hr" />
            <div className="kicker">Paylaş</div>
            <a
              href={`https://wa.me/?text=${whatsappText}`}
              target="_blank"
              rel="noreferrer"
              style={{ fontWeight: 800 }}
            >
              📲 WhatsApp ile Gönder
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
