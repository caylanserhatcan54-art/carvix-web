"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Car, 
  Zap, 
  Bike, 
  Truck, 
  ShieldCheck, 
  ChevronRight, 
  Info,
  Layers,
  Sparkles
} from "lucide-react";

const VEHICLES = [
  { key: "car", title: "Otomobil", desc: "Binek araçlar", icon: <Car size={24} /> },
  { key: "electric_car", title: "Elektrikli Araç", desc: "Elektrikli binek", icon: <Zap size={24} /> },
  { key: "motorcycle", title: "Motosiklet", desc: "Kaporta ve dış aksam", icon: <Bike size={24} /> },
  { key: "pickup", title: "Pickup", desc: "Çift kabin / kasa dahil", icon: <Truck size={24} /> },
  { key: "van", title: "Van / Kamyonet", desc: "Ticari araçlar", icon: <Truck size={24} /> },
  { key: "atv", title: "ATV", desc: "Arazi araçları", icon: <Sparkles size={24} /> },
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
      const token = crypto.randomUUID();
      router.push(`/upload/${token}?v=${selected}&p=${pkg}`);
    } catch {
      setError("Analiz başlatılamadı. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  }

  return (
    <main style={{ backgroundColor: "#050505", minHeight: "100vh", color: "#fff", padding: "60px 20px" }}>
      <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
        
        {/* Başlık Bölümü */}
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, marginBottom: "10px", letterSpacing: "-1px" }}>
            Analiz Edilecek <span style={{ color: "#3b82f6" }}>Aracı Seç</span>
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: "16px" }}>
            Seçtiğiniz araç tipine göre yapay zeka algoritmalarımız fotoğraf rehberini optimize eder.
          </p>
        </div>

        <div className="glass" style={{ 
          padding: "30px", 
          borderRadius: "32px", 
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(15, 15, 15, 0.6)",
          backdropFilter: "blur(20px)"
        }}>
          
          {/* Paket Seçimi - Daha Modern Pill Tasarımı */}
          <div style={{ marginBottom: "35px" }}>
            <label style={{ fontSize: "14px", fontWeight: 700, color: "#71717a", marginBottom: "12px", display: "block", textTransform: "uppercase" }}>
              Analiz Derinliği
            </label>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                type="button"
                className={`pill ${pkg === "quick" ? "pillActive" : ""}`}
                onClick={() => setPkg("quick")}
                disabled={loading}
                style={{ flex: 1, minWidth: "200px", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "15px 20px", borderRadius: "16px" }}
              >
                <span style={{ fontWeight: 800, fontSize: "16px" }}>Hızlı Paket</span>
                <span style={{ fontSize: "12px", opacity: 0.7 }}>Temel risk ve ton analizi</span>
              </button>

              <button
                type="button"
                className={`pill ${pkg === "detailed" ? "pillActive" : ""}`}
                onClick={() => setPkg("detailed")}
                disabled={loading}
                style={{ flex: 1, minWidth: "200px", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "15px 20px", borderRadius: "16px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                   <span style={{ fontWeight: 800, fontSize: "16px" }}>Detaylı Paket</span>
                   <Layers size={14} color="#3b82f6" />
                </div>
                <span style={{ fontSize: "12px", opacity: 0.7 }}>Vida, menteşe ve derin tarama</span>
              </button>
            </div>
          </div>

          {/* Araç Seçimi - Grid Tasarımı */}
          <div style={{ marginBottom: "35px" }}>
            <label style={{ fontSize: "14px", fontWeight: 700, color: "#71717a", marginBottom: "12px", display: "block", textTransform: "uppercase" }}>
              Araç Tipi
            </label>
            <div
              style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
                gap: "15px" 
              }}
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
                    style={{ 
                      padding: "20px", 
                      textAlign: "left", 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "15px",
                      borderRadius: "20px",
                      border: active ? "2px solid #3b82f6" : "1px solid rgba(255,255,255,0.05)",
                      background: active ? "rgba(59, 130, 246, 0.05)" : "rgba(255,255,255,0.02)"
                    }}
                  >
                    <div style={{ 
                      width: "48px", 
                      height: "48px", 
                      borderRadius: "12px", 
                      background: active ? "#3b82f6" : "rgba(255,255,255,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: active ? "#fff" : "#71717a",
                      transition: "0.2s"
                    }}>
                      {v.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "15px", color: active ? "#fff" : "#e4e4e7" }}>{v.title}</div>
                      <div style={{ fontSize: "12px", color: "#71717a" }}>{v.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Alt Aksiyonlar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                className="btn btnPrimary"
                disabled={!selected || loading}
                onClick={handleContinue}
                style={{ padding: "16px 40px", fontSize: "16px", flex: 2, justifyContent: "center" }}
              >
                {loading ? "Sistem Hazırlanıyor..." : "Analize Başla"}
                {!loading && <ChevronRight size={18} style={{ marginLeft: "8px" }} />}
              </button>

              <Link href="/photo-guide" className="btn btnGhost" style={{ padding: "16px 24px", flex: 1, justifyContent: "center" }}>
                Fotoğraf Rehberi
              </Link>
            </div>

            {error && (
              <div style={{ 
                padding: "12px", 
                borderRadius: "12px", 
                background: "rgba(239, 68, 68, 0.1)", 
                border: "1px solid rgba(239, 68, 68, 0.2)",
                color: "#ef4444",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <Info size={16} /> {error}
              </div>
            )}
          </div>

          <div style={{ margin: "30px 0", height: "1px", background: "rgba(255,255,255,0.05)" }} />

          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", color: "#52525b" }}>
            <ShieldCheck size={18} style={{ marginTop: "2px", flexShrink: 0 }} />
            <p style={{ fontSize: "12px", margin: 0, lineHeight: "1.5" }}>
              <b>Önemli Uyarı:</b> Carvix, derin öğrenme temelli bir ön analiz aracıdır. Elde edilen raporlar profesyonel bir ekspertiz yerine geçmez, fiziksel inceleme öncesi riskleri filtrelemenize yardımcı olur.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}