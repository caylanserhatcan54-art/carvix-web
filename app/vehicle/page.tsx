"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const VEHICLES = [
  { key: "car", label: "🚗 Otomobil", desc: "Binek araçlar" },
  { key: "electric_car", label: "🔋 Elektrikli Araç", desc: "Elektrikli binek araçlar" },
  { key: "motorcycle", label: "🏍️ Motosiklet", desc: "Kaporta ve dış aksam" },
  { key: "pickup", label: "🚙 Pickup", desc: "Çift kabin / kasa dahil" },
  { key: "van", label: "🚐 Van / Kamyonet", desc: "Ticari araçlar" },
  { key: "atv", label: "🛻 ATV", desc: "Arazi araçları" },
];

export default function VehicleSelectPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleContinue() {
    if (!selected || loading) return;

    setLoading(true);

    // ✅ TOKEN FRONTEND'DE ÜRETİLİR
    const token = crypto.randomUUID();

    // İstersen ileride vehicle_type'ı
    // query param olarak da taşıyabilirsin
    router.push(`/upload/${token}?vehicle=${selected}`);
  }

  return (
    <main className="page-center">
      <div className="card large">
        <h1 className="h2">Analiz Edilecek Aracı Seçin</h1>
        <p className="p">
          Fotoğraf bazlı analiz, seçilen araç tipine göre optimize edilir.
        </p>

        <div className="vehicle-grid">
          {VEHICLES.map((v) => (
            <button
              key={v.key}
              className={`vehicle-card ${
                selected === v.key ? "active" : ""
              }`}
              onClick={() => setSelected(v.key)}
              disabled={loading}
            >
              <div className="vehicle-title">{v.label}</div>
              <div className="vehicle-desc">{v.desc}</div>
            </button>
          ))}
        </div>

        <button
          className="btn-primary"
          disabled={!selected || loading}
          onClick={handleContinue}
          style={{ marginTop: 24 }}
        >
          {loading ? "Başlatılıyor…" : "Devam Et →"}
        </button>

        <p className="muted" style={{ marginTop: 24 }}>
          Fotoğraf bazlı analiz yapay zekâ destekli bir ön kontroldür.
          Ekspertiz yerine geçmez.
        </p>
      </div>
    </main>
  );
}
