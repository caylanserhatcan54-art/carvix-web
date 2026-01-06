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
      <main style={{ padding: 40, textAlign: "center" }}>
        <h2>🔄 Analiz Yapılıyor</h2>
        <p style={{ color: "#64748b" }}>
          Yüklenen fotoğraflar yapay zekâ tarafından inceleniyor…
        </p>
      </main>
    );
  }

  const score = data.confidence?.confidence_score ?? 0;
  const level = data.confidence?.confidence_level ?? "";

  const scoreColor =
    score >= 75 ? "#16a34a" : score >= 55 ? "#f59e0b" : "#dc2626";

  return (
    <main style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: 32 }}>

        {/* HEADER */}
        <section style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: "#0f172a" }}>
            Araç Ön Analiz Raporu
          </h1>
          <p style={{ color: "#475569", marginTop: 6 }}>
            Yapay zekâ destekli görsel inceleme sonucu
          </p>
        </section>

        {/* SCORE CARD */}
        <section
          style={{
            background: "#fff",
            padding: 24,
            borderRadius: 20,
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            marginBottom: 32,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}
        >
          <div>
            <div style={{ fontSize: 14, color: "#64748b" }}>
              Genel Risk Skoru
            </div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: scoreColor,
              }}
            >
              {score}/100
            </div>
            <div style={{ fontWeight: 700 }}>
              Rapor Güveni: {level.toUpperCase()}
            </div>
          </div>

          <div style={{ fontSize: 15, color: "#475569", lineHeight: 1.6 }}>
            Bu skor; yüklenen fotoğrafların netliği, kapsadığı araç bölgeleri
            ve tespit edilen risk sinyallerine göre hesaplanmıştır.
            <br />
            <br />
            <b>Skor düştükçe</b> belirsizlik ve risk ihtimali artar.
          </div>
        </section>

        {/* AI COMMENTARY */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>
            🤖 Yapay Zekâ Değerlendirmesi
          </h2>

          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 16,
              borderLeft: "6px solid #0f172a",
              marginTop: 12,
              boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
            }}
          >
            <p style={{ whiteSpace: "pre-line", lineHeight: 1.8 }}>
              {data.ai_commentary.text}
            </p>
          </div>
        </section>

        {/* SUSPICIOUS IMAGES */}
        {data.suspicious_images?.length > 0 && (
          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800 }}>
              ⚠️ Şüpheli Görülen Bölgeler
            </h2>

            <p style={{ color: "#475569", marginTop: 6 }}>
              Aşağıdaki parçalar, yapay zekâ tarafından risk sinyali
              taşıyan bölgeler olarak işaretlenmiştir.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginTop: 16,
              }}
            >
              {data.suspicious_images.map((img: any, i: number) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    padding: 12,
                    borderRadius: 14,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
                  }}
                >
                  <img
                    src={`${api}${img.image_path}`}
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      marginBottom: 8,
                    }}
                  />
                  <p style={{ fontSize: 14, lineHeight: 1.6 }}>
                    ⚠️ {img.caption}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* DISCLAIMER */}
        <section
          style={{
            background: "#fff7ed",
            border: "1px solid #fed7aa",
            padding: 20,
            borderRadius: 14,
            fontSize: 14,
            color: "#7c2d12",
          }}
        >
          <b>Önemli Bilgilendirme</b>
          <p style={{ marginTop: 8, lineHeight: 1.6 }}>
            Bu rapor, yüklenen fotoğraflar üzerinden yapılan
            <b> yapay zekâ destekli ön analizdir</b>.  
            Kesin teşhis içermez ve <b>ekspertiz yerine geçmez</b>.
            Satın alma öncesinde profesyonel ekspertiz önerilir.
          </p>
        </section>

      </div>
    </main>
  );
}
