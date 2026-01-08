"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const VEHICLES = [
  { key: "car", title: "Otomobil", desc: "Binek araçlar" },
  { key: "electric_car", title: "Elektrikli Araç", desc: "Elektrikli binek" },
  { key: "motorcycle", title: "Motosiklet", desc: "Kaporta ve dış aksam" },
  { key: "pickup", title: "Pickup", desc: "Çift kabin / kasa dahil" },
  { key: "van", title: "Van / Kamyonet", desc: "Ticari araçlar" },
  { key: "atv", title: "ATV", desc: "Arazi araçları" },
] as const;

type VehicleKey = (typeof VEHICLES)[number]["key"];
type PackageKey = "quick" | "detailed";

export default function VehicleSelectPage() {
  const router = useRouter();

  const [selected, setSelected] = useState<VehicleKey | null>(null);
  const [pkg, setPkg] = useState<PackageKey>("quick");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleContinue() {
    if (!selected || loading) return;

    setLoading(true);
    setError(null);

    try {
      // ✅ TOKEN FRONTEND’DE ÜRETİLİR
      const token = crypto.randomUUID();

      // ❌ BACKEND ÇAĞRISI YOK
      router.push(`/upload/${token}?v=${selected}&p=${pkg}`);
    } catch {
      setError("Analiz başlatılamadı. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  }

  return (
    <main className="section">
      <div className="container">
        <div className="glass fadeIn" style={{ padding: 26 }}>
          <h1 className="h2">Analiz edilecek aracı seç</h1>

          <p className="p" style={{ marginTop: 10 }}>
            Seçtiğin araç tipine göre fotoğraf rehberi ve rapor şablonu optimize edilir.
          </p>

          {/* Paket seçimi */}
          <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
            <button
              type="button"
              className={`pill ${pkg === "quick" ? "pillActive" : ""}`}
              onClick={() => setPkg("quick")}
              disabled={loading}
            >
              Hızlı Paket
              <span className="pillSub">Temel risk eleme</span>
            </button>

            <button
              type="button"
              className={`pill ${pkg === "detailed" ? "pillActive" : ""}`}
              onClick={() => setPkg("detailed")}
              disabled={loading}
            >
              Detaylı Paket
              <span className="pillSub">Vida/menteşe/direk güçlü</span>
            </button>
          </div>

          {/* Araç seçimi */}
          <div
            className="featureGrid"
            style={{ gridTemplateColumns: "repeat(3, 1fr)", marginTop: 18 }}
          >
            {VEHICLES.map((v) => {
              const active = selected === v.key;
              return (
                <button
                  key={v.key}
                  type="button"
                  className={`card hoverLift ${active ? "cardActive" : ""}`}
                  onClick={() => setSelected(v.key)}
                  disabled={loading}
                  style={{ padding: 18, textAlign: "left" }}
                >
                  <div style={{ fontWeight: 900, fontSize: 16 }}>{v.title}</div>
                  <div className="small" style={{ marginTop: 6 }}>
                    {v.desc}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Devam */}
          <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
            <button
              className="btn btnPrimary microPulse"
              disabled={!selected || loading}
              onClick={handleContinue}
            >
              {loading ? "Başlatılıyor…" : "Devam Et →"}
            </button>

            <Link href="/photo-guide" className="btn btnGhost">
              Fotoğraf Rehberi
            </Link>
          </div>

          {error && (
            <div style={{ marginTop: 12 }} className="small">
              <span style={{ color: "rgba(239,68,68,.95)", fontWeight: 900 }}>
                Hata:
              </span>{" "}
              {error}
            </div>
          )}

          <div className="divider" />

          <div className="small">
            Carvix, fotoğrafa dayalı yapay zekâ destekli ön değerlendirmedir;
            ekspertiz yerine geçmez.
          </div>
        </div>
      </div>
    </main>
  );
}
