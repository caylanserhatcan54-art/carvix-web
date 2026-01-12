"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentPage() {
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
        setErr("Ödeme başlatılamadı. Backend ayarlarını kontrol et.");
        setLoading(false);
        return;
      }

      // 🔥 JSON DEĞİL → HTML
      const html = await res.text();

      // 🔥 Shopier / iyzico formunu DOM'a bas
      const div = document.createElement("div");
      div.innerHTML = html;
      document.body.appendChild(div);

      // 🔥 otomatik submit
      const form = div.querySelector("form") as HTMLFormElement | null;
      if (form) {
        form.submit();
      } else {
        setErr("Ödeme formu oluşturulamadı.");
        setLoading(false);
      }
    } catch (e) {
      setErr("Backend'e bağlanılamadı.");
      setLoading(false);
    }
  };

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
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <section className="section">
        <div className="container">
          <div
            className="card"
            style={{ padding: 22, maxWidth: 860, margin: "0 auto" }}
          >
            <div className="kicker">Ödeme</div>

            <div style={{ fontSize: 28, fontWeight: 900, marginTop: 6 }}>
              Tek seferlik araç ön analiz raporu
            </div>

            <p style={{ marginTop: 10 }}>
              Ödeme sonrası analiz raporunu direkt görüntüleyebilirsin.
            </p>

            <div className="hr" />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              <div className="card" style={{ padding: 16 }}>
                <b>Carvix Premium</b>
                <div>• AI risk skoru</div>
                <div>• Hasar kanıt görselleri</div>
                <div>• Motor sesi analizi</div>
                <div>• İnsansı AI değerlendirme</div>
              </div>

              <div className="card" style={{ padding: 16 }}>
                <b>Ücret</b>
                <div style={{ fontSize: 32, fontWeight: 900 }}>
                  129,90 TL
                </div>
              </div>
            </div>

            {err && <p style={{ color: "red", marginTop: 12 }}>{err}</p>}

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
              {loading ? "Ödeme sayfasına yönlendiriliyor..." : "Ödemeyi Tamamla →"}
            </button>

            {/* 🔹 iyzico için KRİTİK DİJİTAL İÇERİK NOTU */}
            <p style={{ fontSize: 12, opacity: 0.6, marginTop: 8 }}>
              Bu hizmet dijital içerik kapsamındadır. Ödeme sonrası anında teslim edilir.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
