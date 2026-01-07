"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ReportPage() {
  const { token } = useParams<{ token: string }>();
  const api = "https://ai-arac-analiz-backend.onrender.com";

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!token) return;

    const fetchResult = async () => {
      try {
        const r = await fetch(`${api}/jobs/${token}`);
        if (!r.ok) return;

        const d = await r.json();

        if (d.status === "done") {
          setData(d.result);
        }
      } catch (e) {
        console.error("Report fetch error:", e);
      }
    };

    fetchResult();
    const i = setInterval(fetchResult, 3000);
    return () => clearInterval(i);
  }, [token]);

  /* =============================
     LOADING
  ============================== */
  if (!data) {
    return (
      <main className="container section" style={{ textAlign: "center" }}>
        <h2 className="h2">🔄 Analiz Yapılıyor</h2>
        <p className="p">
          Yapay zekâ GPU üzerinde analizi tamamlıyor…
        </p>
      </main>
    );
  }

  /* =============================
     DATA
  ============================== */
  const detections = Array.isArray(data.detections) ? data.detections : [];
  const summary =
    data.summary ||
    (detections.length
      ? `${detections.length} riskli alan tespit edildi`
      : "Riskli alan tespit edilmedi");

  /* =============================
     UI
  ============================== */
  return (
    <main className="section">
      <div className="container">

        <h1 className="h1">Araç Ön Analiz Sonucu</h1>

        {/* ÖZET */}
        <div className="card" style={{ marginBottom: 24 }}>
          <h3>Özet</h3>
          <p>{summary}</p>
        </div>

        {/* YOLO */}
        <div className="card">
          <h3>🧠 YOLO Tespitleri</h3>

          {detections.length === 0 ? (
            <p>Riskli alan tespit edilmedi.</p>
          ) : (
            <ul>
              {detections.map((d: any, i: number) => (
                <li key={i}>
                  ⚠️ {d.label} — %{Math.round((d.conf || 0) * 100)}
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </main>
  );
}

