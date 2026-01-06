"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AnalysisFlowPage() {
  const { token } = useParams();
  const router = useRouter();
  const api = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    if (!token) return;

    async function runAnalysis() {
      // 1️⃣ Analizi başlat
      await fetch(`${api}/analysis/${token}/run`, {
        method: "POST",
      });

      // 2️⃣ Sonucu bekle (polling)
      const interval = setInterval(async () => {
        const res = await fetch(`${api}/analysis/${token}`);
        const data = await res.json();

        if (data.status === "analysis_completed") {
          clearInterval(interval);
          router.push(`/report/${token}`);
        }
      }, 2000);
    }

    runAnalysis();
  }, [token]);

  return (
    <main className="analysis-loading">
      <h2>🔍 Analiz Yapılıyor</h2>
      <p>Yüklenen fotoğraflar yapay zekâ tarafından inceleniyor…</p>
      <div className="spinner" />
    </main>
  );
}
