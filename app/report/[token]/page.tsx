"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const API = "https://ai-arac-analiz-backend.onrender.com";

function Badge({ label }: { label: string }) {
  const color =
    label === "DETECTED"
      ? "#dc2626"
      : label === "SUSPECTED"
      ? "#f59e0b"
      : "#6b7280";

  return (
    <span
      style={{
        background: color,
        color: "#fff",
        padding: "2px 8px",
        borderRadius: 6,
        fontSize: 12,
        marginLeft: 8,
      }}
    >
      {label}
    </span>
  );
}

export default function ReportPage() {
  const { token } = useParams<{ token: string }>();
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    if (!token) return;

    const fetchJob = async () => {
      const r = await fetch(`${API}/jobs/${token}`);
      const d = await r.json();
      if (d.status === "done") setJob(d);
    };

    fetchJob();
    const i = setInterval(fetchJob, 3000);
    return () => clearInterval(i);
  }, [token]);

  if (!job) {
    return <h2 style={{ textAlign: "center" }}>🔄 Analiz Yapılıyor...</h2>;
  }

  const result = job.result;

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 32 }}>
      <h1>Araç AI Ekspertiz Ön Raporu</h1>

      {/* GENEL ÖZET */}
      <section style={{ marginTop: 24 }}>
        <h2>Genel Özet</h2>
        <p>
          Genel Güven Skoru:{" "}
          <strong>%{Math.round(result.overall_confidence * 100)}</strong>
        </p>

        <p>
          Yüklenen Parça Sayısı:{" "}
          <strong>{Object.keys(result.parts || {}).length}</strong>
        </p>

        {result.coverage?.missing_general?.length > 0 && (
          <p style={{ color: "#b45309" }}>
            Eksik genel görseller:{" "}
            {result.coverage.missing_general.join(", ")}
          </p>
        )}
      </section>

      {/* PARÇA BAZLI RAPOR */}
      <section style={{ marginTop: 32 }}>
        <h2>Parça Bazlı Analiz</h2>

        {Object.entries(result.parts || {}).map(
          ([part, info]: [string, any]) => (
            <div
              key={part}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 16,
                marginTop: 16,
              }}
            >
              <h3>{part}</h3>

              {/* BOYA */}
              {info.paint_assessment && (
                <p>
                  🎨 Boya / Lokal Boya:
                  <Badge label={info.paint_assessment.label} />
                  <br />
                  <small>{info.paint_assessment.reason}</small>
                </p>
              )}

              {/* SÖK-TAK */}
              {info.tamper_assessment && (
                <p>
                  🔧 Sök–Tak:
                  <Badge label={info.tamper_assessment.label} />
                  <br />
                  <small>{info.tamper_assessment.reason}</small>
                </p>
              )}

              {/* HASAR */}
              {info.damage && (
                <p>
                  💥 Hasar Seviyesi:{" "}
                  <strong>{info.damage.severity}</strong>
                </p>
              )}

              {/* GÜVEN */}
              {typeof info.confidence === "number" && (
                <p>
                  🔢 Parça Güven Skoru:{" "}
                  <strong>%{Math.round(info.confidence * 100)}</strong>
                </p>
              )}
            </div>
          )
        )}
      </section>

      {/* HUKUKİ UYARI */}
      <section style={{ marginTop: 40 }}>
        <p style={{ fontSize: 13, color: "#6b7280" }}>
          ⚠️ Bu rapor, yalnızca kullanıcı tarafından yüklenen görsel ve ses
          verileri üzerinden yapay zeka destekli olasılıksal analiz sonucudur.
          Kesin ekspertiz raporu veya hukuki bağlayıcılığı olan belge yerine
          geçmez. Eksik veya yetersiz görsel bulunan parçalarda “Kanıt Yetersiz”
          sonucu verilebilir.
        </p>
      </section>
    </main>
  );
}
