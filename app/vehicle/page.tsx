"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://ai-arac-analiz-backend.onrender.com";

const VEHICLES = [
  { key: "car", title: "Otomobil", desc: "Binek araçlar" },
  { key: "electric_car", title: "Elektrikli Araç", desc: "Elektrikli binek" },
  { key: "motorcycle", title: "Motosiklet", desc: "Kaporta ve dış aksam" },
  { key: "pickup", title: "Pickup", desc: "Çift kabin / kasa dahil" },
  { key: "van", title: "Van / Kamyonet", desc: "Ticari araçlar" },
  { key: "atv", title: "ATV", desc: "Arazi araçları" },
] as const;

export default function VehicleSelectPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleContinue() {
    if (!selected || loading) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/analysis/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicle_type: selected, scenario: "buy_sell" }),
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      if (!data.token) throw new Error("Token alınamadı");
      router.push(`/upload/${data.token}`);
    } catch (e) {
      setError("Analiz başlatılamadı. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  }

  return (
    <main className="section">
      <div className="container">
        <div className="glass" style={{ padding: 26 }}>
          <h1 className="h2">Analiz edilecek aracı seç</h1>
          <p className="p" style={{ marginTop: 10 }}>
            Seçtiğin araç tipine göre fotoğraf rehberi ve rapor şablonu optimize edilir.
          </p>

          <div
            className="featureGrid"
            style={{ gridTemplateColumns: "repeat(3, 1fr)", marginTop: 18 }}
          >
            {VEHICLES.map((v) => {
              const active = selected === v.key;
              return (
                <button
                  key={v.key}
                  className="card"
                  onClick={() => setSelected(v.key)}
                  disabled={loading}
                  style={{
                    padding: 18,
                    cursor: "pointer",
                    textAlign: "left",
                    borderColor: active ? "rgba(90,162,255,.45)" : "rgba(255,255,255,.10)",
                    background: active ? "rgba(90,162,255,.10)" : "rgba(255,255,255,.06)",
                    boxShadow: active ? "0 22px 70px rgba(90,162,255,.22)" : undefined,
                  }}
                >
                  <div style={{ fontWeight: 900, fontSize: 16 }}>{v.title}</div>
                  <div className="small" style={{ marginTop: 6 }}>
                    {v.desc}
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
            <button className="btn btnPrimary" disabled={!selected || loading} onClick={handleContinue}>
              {loading ? "Başlatılıyor…" : "Devam Et →"}
            </button>
            <a className="btn btnGhost" href="/photo-guide">
              Fotoğraf Rehberi
            </a>
          </div>

          {error && (
            <div style={{ marginTop: 12 }} className="small">
              <span style={{ color: "rgba(239,68,68,.95)", fontWeight: 900 }}>Hata:</span> {error}
            </div>
          )}

          <div className="divider" />

          <div className="small">
            Bu sayfa “başlatma” içindir. Rapor bir ekspertiz değildir; fotoğrafa dayalı ön değerlendirmedir.
          </div>
        </div>
      </div>
    </main>
  );
}

