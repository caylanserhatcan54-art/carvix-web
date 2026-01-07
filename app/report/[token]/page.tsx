"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type ReportData = {
  status: string;
  confidence?: {
    confidence_score: number;
    confidence_level: string;
  };
  ai_commentary?: {
    text: string;
  };
  suspicious_images?: Array<{
    image_path: string;
    caption?: string;
  }>;
  error?: string;
};

export default function ReportPage() {
  const { token } = useParams();
  const api = process.env.NEXT_PUBLIC_API_BASE;

  const [data, setData] = useState<ReportData | null>(null);
  const [status, setStatus] = useState<string>("loading");

  useEffect(() => {
    if (!token || !api) return;

    const fetchResult = async () => {
      try {
        const r = await fetch(`${api}/analysis/${token}`, {
          cache: "no-store",
        });
        if (!r.ok) return;

        const d: ReportData = await r.json();

        setStatus(d.status || "processing");

        if (d.status === "analysis_completed") {
          setData(d);
        }
      } catch (e) {
        console.error("Report fetch error:", e);
      }
    };

    fetchResult();
    const i = setInterval(fetchResult, 3000);
    return () => clearInterval(i);
  }, [api, token]);

  /* =============================
     LOADING / QUEUED / PROCESSING
  ============================== */
  if (!data) {
    return (
      <main className="container section" style={{ textAlign: "center" }}>
        <h2 className="h2">
          {status === "queued"
            ? "⏳ Sıraya Alındı"
            : status === "processing"
            ? "🔄 Analiz Yapılıyor"
            : "🔄 Hazırlanıyor"}
        </h2>
        <p className="p">
          {status === "queued"
            ? "Analiz kuyruğa alındı, GPU worker bekleniyor…"
            : "Yüklenen fotoğraflar yapay zekâ tarafından inceleniyor…"}
        </p>

        {status === "analysis_completed" && (
          <p className="p muted">Rapor yükleniyor…</p>
        )}
      </main>
    );
  }

  /* =============================
     SAFE VALUES
  ============================== */
  const score = data.confidence?.confidence_score ?? 0;
  const level = data.confidence?.confidence_level ?? "bilinmiyor";

  const scoreClass =
    score >= 75 ? "score-good" : score >= 55 ? "score-mid" : "score-bad";

  /* =============================
     UI
  ============================== */
  return (
    <main className="section">
      <div className="container">

        {/* HEADER */}
        <div style={{ marginBottom: 28 }}>
          <div className="kicker">CARVIX RAPOR</div>
          <h1 className="h1">Araç Ön Analiz Sonucu</h1>
          <p className="p">
            Yapay zekâ destekli görsel inceleme değerlendirmesi
          </p>
        </div>

        {/* SCORE */}
        <div className="card" style={{ padding: 24, marginBottom: 28 }}>
          <div className="score-wrap">
            <div>
              <div className="muted">Genel Risk Skoru</div>
              <div className={`score-big ${scoreClass}`}>
                {score}/100
              </div>
              <div className="score-label">
                Rapor Güveni: <b>{level.toUpperCase()}</b>
              </div>
            </div>

            <div className="score-info">
              Bu skor; fotoğraf kalitesi, kapsanan araç bölgeleri ve
              tespit edilen risk sinyallerine göre hesaplanır.
              <br /><br />
              <b>Skor düştükçe</b> belirsizlik ve risk ihtimali artar.
            </div>
          </div>
        </div>

        {/* AI COMMENTARY */}
        <section style={{ marginBottom: 32 }}>
          <h3 className="h3">🤖 Yapay Zekâ Değerlendirmesi</h3>

          <div className="card commentary">
            {data.ai_commentary?.text ? (
              <p style={{ whiteSpace: "pre-line" }}>
                {data.ai_commentary.text}
              </p>
            ) : (
              <p className="muted">
                Yapay zekâ yorumu üretilemedi.
              </p>
            )}
          </div>
        </section>

        {/* SUSPICIOUS IMAGES */}
        {Array.isArray(data.suspicious_images) &&
          data.suspicious_images.length > 0 && (
            <section style={{ marginBottom: 32 }}>
              <h3 className="h3">⚠️ Şüpheli Görülen Bölgeler</h3>

              <div className="suspicious-grid">
                {data.suspicious_images.map((img, i) => (
                  <div key={i} className="card suspicious-card">
                    <img
                      src={`${api}${img.image_path}`}
                      alt="Şüpheli Bölge"
                    />
                    <p>⚠️ {img.caption || "Şüpheli görünüm"}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

        {/* ERROR */}
        {data.error && (
          <div className="card" style={{ marginTop: 24 }}>
            <b>⚠️ Analiz Uyarısı</b>
            <p>{data.error}</p>
          </div>
        )}

        {/* DISCLAIMER */}
        <div className="disclaimer">
          <b>Önemli Bilgilendirme</b>
          <p>
            Bu rapor, yüklenen fotoğraflar üzerinden yapılan
            <b> yapay zekâ destekli ön analizdir</b>.
            Kesin teşhis içermez ve <b>ekspertiz yerine geçmez</b>.
            Satın alma öncesinde profesyonel ekspertiz önerilir.
          </p>
        </div>

      </div>
    </main>
  );
}
