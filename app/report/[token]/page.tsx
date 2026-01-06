"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ReportPage() {
  const { token } = useParams();
  const api = process.env.NEXT_PUBLIC_API_BASE;
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const r = await fetch(`${api}/analysis/${token}`);
        const d = await r.json();
        if (d.status === "analysis_completed") {
          setData(d);
        }
      } catch {}
    };

    fetchResult();
    const i = setInterval(fetchResult, 3000);
    return () => clearInterval(i);
  }, [api, token]);

  if (!data) {
    return (
      <main className="container section" style={{ textAlign: "center" }}>
        <h2 className="h2">🔄 Analiz Yapılıyor</h2>
        <p className="p">
          Yüklenen fotoğraflar yapay zekâ tarafından inceleniyor…
        </p>
      </main>
    );
  }

  const score = data.confidence?.confidence_score ?? 0;
  const level = data.confidence?.confidence_level ?? "";

  const scoreClass =
    score >= 75 ? "score-good" : score >= 55 ? "score-mid" : "score-bad";

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
            <p style={{ whiteSpace: "pre-line" }}>
              {data.ai_commentary.text}
            </p>
          </div>
        </section>

        {/* SUSPICIOUS IMAGES */}
        {data.suspicious_images?.length > 0 && (
          <section style={{ marginBottom: 32 }}>
            <h3 className="h3">⚠️ Şüpheli Görülen Bölgeler</h3>
            <p className="p">
              Aşağıdaki parçalar, yapay zekâ tarafından
              risk sinyali taşıyan bölgeler olarak işaretlenmiştir.
            </p>

            <div className="suspicious-grid">
              {data.suspicious_images.map((img: any, i: number) => (
                <div key={i} className="card suspicious-card">
                  <img src={`${api}${img.image_path}`} />
                  <p>⚠️ {img.caption}</p>
                </div>
              ))}
            </div>
          </section>
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
