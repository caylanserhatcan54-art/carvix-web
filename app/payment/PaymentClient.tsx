"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentClient() {
  const api = process.env.NEXT_PUBLIC_API_BASE;
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const start = async () => {
    setErr("");
    setLoading(true);

    try {
      const res = await fetch(`${api}/payment/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: jobId,
          amount: 129.9,
          product_name: "Araç Ön Analiz Raporu",
        }),
      });

      if (!res.ok) {
        setErr("Ödeme başlatılamadı.");
        setLoading(false);
        return;
      }

      const html = await res.text();

      const div = document.createElement("div");
      div.innerHTML = html;
      document.body.appendChild(div);

      const form = div.querySelector("form") as HTMLFormElement | null;
      if (form) {
        form.submit();
      } else {
        setErr("Ödeme formu oluşturulamadı.");
        setLoading(false);
      }
    } catch {
      setErr("Backend'e bağlanılamadı.");
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="card" style={{ padding: 22, maxWidth: 860, margin: "0 auto" }}>
          <h1>Ödeme</h1>

          <p>Ödeme sonrası analiz raporu anında sunulur.</p>

          <div style={{ fontSize: 32, fontWeight: 900 }}>129,90 TL</div>

          {/* iyzico için KRİTİK NOT */}
          <p style={{ fontSize: 12, opacity: 0.6, marginTop: 8 }}>
            Bu hizmet dijital içerik kapsamındadır. Ödeme sonrası anında teslim edilir.
          </p>

          {err && <p style={{ color: "red" }}>{err}</p>}

          <button
            onClick={start}
            disabled={loading}
            style={{
              marginTop: 16,
              padding: 16,
              width: "100%",
              fontSize: 18,
              background: "#000",
              color: "#fff",
              borderRadius: 12,
            }}
          >
            {loading ? "iyzico’ya yönlendiriliyor..." : "Ödemeyi Tamamla →"}
          </button>
        </div>
      </div>
    </div>
  );
}
