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
      const r = await fetch(`${api}/jobs/${token}`);
      const d = await r.json();
      if (d.status === "done") setData(d.result);
    };

    fetchResult();
    const i = setInterval(fetchResult, 3000);
    return () => clearInterval(i);
  }, [token]);

  if (!data) {
    return <h2 style={{ textAlign: "center" }}>🔄 Analiz Yapılıyor...</h2>;
  }

  return (
    <main className="section">
      <div className="container">
        <h1>Araç Ön Analiz Sonucu</h1>

        <div className="card">
          <h3>Özet</h3>
          <p>{data.summary}</p>
        </div>

        <div className="card">
          <h3>YOLO Tespitleri</h3>
          <ul>
            {data.detections.map((d: any, i: number) => (
              <li key={i}>
                ⚠️ {d.label} – %{Math.round(d.confidence * 100)}
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3>Görsel Kanıtlar</h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {data.proof_images.map((src: string, i: number) => (
              <img
                key={i}
                src={src}
                style={{ width: 240, borderRadius: 8 }}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
