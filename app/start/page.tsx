"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StartPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  const token = params?.token;

  // 🔴 TOKEN YOKSA AKIŞI BOZMA
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  if (!token) {
    return <div style={{ padding: 24 }}>Yönlendiriliyor…</div>;
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
      <h1>Analize Başlamadan Önce</h1>

      <div
        style={{
          background: "#f5f7fa",
          padding: 20,
          borderRadius: 10,
          marginTop: 16,
        }}
      >
        <ul>
          <li>Araç temiz olmalıdır (çamur, yoğun toz analiz doğruluğunu düşürür).</li>
          <li>Video gündüz ve iyi ışık koşullarında çekilmelidir.</li>
          <li>Gece, karanlık otopark veya yoğun yağmurda çekim önerilmez.</li>
          <li>Araç 360° yavaş ve sabit şekilde görüntülenmelidir.</li>
          <li>
            Motor sesi analizi için araç çalışır haldeyken kaput açık olmalı ve
            ses yakından, net biçimde kaydedilmelidir.
          </li>
        </ul>

        <p style={{ marginTop: 16, fontSize: 14, color: "#555" }}>
          <b>Önemli:</b> Bu sistem bir ekspertiz hizmeti değildir. Yapay zekâ;
          kullanıcı tarafından sağlanan video ve ses kayıtları üzerinden{" "}
          <b>ön bilgilendirme amaçlı risk ve olasılık değerlendirmesi</b> yapar.
          Satın alma veya teknik kararlar öncesinde profesyonel ekspertiz
          yaptırılması önerilir.
        </p>
      </div>

      <label style={{ display: "block", marginTop: 20 }}>
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />{" "}
        Yukarıdaki bilgilendirmeyi okudum, anladım ve kabul ediyorum
      </label>

      {!accepted && (
        <p style={{ marginTop: 8, fontSize: 13, color: "#666" }}>
          Devam edebilmek için bilgilendirmeyi kabul etmelisiniz.
        </p>
      )}

      <button
        disabled={!accepted}
        onClick={() => router.push(`/capture/${token}`)}
        style={{
          marginTop: 20,
          padding: "12px 24px",
          fontSize: 16,
          cursor: accepted ? "pointer" : "not-allowed",
          background: accepted ? "#2563eb" : "#999",
          color: "#fff",
          border: "none",
          borderRadius: 6,
        }}
      >
        Analize Başla
      </button>
    </div>
  );
}
