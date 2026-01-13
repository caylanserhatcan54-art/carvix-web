"use client";

import { useState } from "react";

export default function AracAnaliziPage() {
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    try {
      setLoading(true);

      const res = await fetch(
  "https://carvix-payment-server.onrender.com/create-payment",
  {
    method: "POST",
  }
);

      if (!res.ok) {
        throw new Error("Payment server hata verdi");
      }

      const data = await res.json();

      if (data?.paymentPageUrl) {
        window.location.href = data.paymentPageUrl;
      } else {
        throw new Error("paymentPageUrl yok");
      }
    } catch (err) {
      console.error(err);
      alert("Ödeme başlatılamadı");
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
      <h1>AI Destekli Araç Ön Analiz Paketi</h1>

      <p>
        <b>AI Destekli Araç Ön Analiz Paketi</b>, kullanıcıların araçlarına ait
        fotoğraf ve videoları yükleyerek tek seferlik ödeme karşılığında
        yapay zekâ destekli dijital bir ön analiz raporu satın almasını sağlar.
      </p>

      <p>
        Satın alınan bu hizmet paketi kapsamında aşağıdaki analizler gerçekleştirilir:
      </p>

      <ul>
        <li>Kaporta ve dış hasar ön analizi</li>
        <li>Motor sesi risk değerlendirmesi</li>
        <li>Görsel kalite ve şüphe tespiti</li>
        <li>Dijital analiz raporu teslimi</li>
      </ul>

      <h2>Hizmet Bedeli</h2>
      <p>
        <strong>129,90 TL</strong> — <b>Tek seferlik ödeme</b>
      </p>

      <p>
        Bu hizmet dijitaldir. Satın alma işlemi sonrası fiziksel ürün gönderimi
        yapılmaz.
      </p>

      <button
        onClick={startPayment}
        disabled={loading}
        style={{
          padding: "12px 24px",
          marginTop: 20,
          cursor: "pointer",
          background: "#000",
          color: "#fff",
          border: "none",
        }}
      >
        {loading ? "Ödeme Sayfasına Yönlendiriliyor..." : "Satın Al"}
      </button>

      <p style={{ marginTop: 30, fontSize: 14, color: "#999" }}>
        © 2026 Carvix — Bu hizmet, yapay zekâ destekli bir ön değerlendirme
        paketidir ve resmî ekspertiz yerine geçmez.
      </p>
    </main>
  );
}
