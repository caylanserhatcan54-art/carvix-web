"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ background: "#f8fafc" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 32 }}>

        {/* HERO */}
        <section style={{ textAlign: "center", padding: "80px 20px" }}>
          <h1 style={{ fontSize: 44, fontWeight: 900, color: "#0f172a" }}>
            Araç Alırken Görünmeyeni Görün
          </h1>

          <p style={{ fontSize: 20, marginTop: 20, lineHeight: 1.7, color: "#334155" }}>
            İkinci el araç ilanındaki fotoğrafları yükleyin.  
            <br />
            <b>Carvix</b>, boya, hasar ve şüpheli bölgeleri
            yapay zekâ ile analiz etsin.
          </p>

          <div style={{ marginTop: 36 }}>
            <Link
              href="/start"
              style={{
                padding: "18px 34px",
                background: "#00c853",
                color: "#fff",
                fontSize: 20,
                fontWeight: 900,
                borderRadius: 999,
                textDecoration: "none",
              }}
            >
              Analizi Başlat – 129,90 TL
            </Link>
          </div>

          <p style={{ marginTop: 16, fontSize: 14, color: "#64748b" }}>
            Kredi kartı ile tek kullanım • Anında sonuç
          </p>
        </section>

        {/* FEATURES */}
        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          {[
            ["📸 Fotoğraf Analizi", "İlandaki veya satıcıdan aldığınız fotoğraflar üzerinden parça bazlı analiz."],
            ["🤖 Yapay Zekâ Yorum", "Boya, hasar ve değişen riski için açıklamalı değerlendirme."],
            ["⚠️ Risk Skoru", "Genel güven skoru ve parça bazlı risk sinyalleri."],
          ].map((x, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                padding: 24,
                borderRadius: 16,
                boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
              }}
            >
              <h3>{x[0]}</h3>
              <p style={{ color: "#475569", lineHeight: 1.6 }}>{x[1]}</p>
            </div>
          ))}
        </section>

        {/* PRICE */}
        <section style={{ textAlign: "center", marginTop: 80 }}>
          <div
            style={{
              display: "inline-block",
              background: "#0f172a",
              color: "#fff",
              padding: "32px 48px",
              borderRadius: 20,
            }}
          >
            <h2>Tek Kullanım</h2>
            <div style={{ fontSize: 40, fontWeight: 900, margin: "12px 0" }}>
              129,90 TL
            </div>
            <p style={{ color: "#cbd5f5" }}>
              Fotoğraf analizi + opsiyonel motor sesi
            </p>
          </div>
        </section>

        {/* DISCLAIMER */}
        <section style={{ marginTop: 80, fontSize: 14, color: "#64748b" }}>
          <b>Yasal Uyarı</b>
          <p>
            Carvix tarafından sunulan analizler, yüklenen görseller üzerinden yapılan
            yapay zekâ destekli <b>ön değerlendirmelerdir</b>.
            Ekspertiz yerine geçmez.
          </p>
        </section>

      </div>
    </main>
  );
}
