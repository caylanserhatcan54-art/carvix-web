"use client";

import { useState, useEffect, Suspense } from "react"; // Suspense eklendi
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Car, Zap, Bike, Truck, ShieldCheck, ChevronRight, 
  Info, Layers, Sparkles, CheckCircle2, ArrowLeft 
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

// 1. Mantığı ayrı bir bileşene alıyoruz
function VehicleSelectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState<VehicleKey | null>(null);
  const [pkg, setPkg] = useState<string>("standard");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const planParam = searchParams.get("p");
    if (planParam === "detailed") {
      setPkg("detailed");
    } else {
      setPkg("standard");
    }
  }, [searchParams]);

  function handleContinue() {
    if (!selected || loading) return;
    setLoading(true);
    setError(null);

    try {
      const token = crypto.randomUUID();
      router.push(`/upload?v=${selected}&p=${pkg}`); // Önceki kodda /upload/${token} idi, eğer upload sayfan klasör yapısındaysa öyle bırakabilirsin
    } catch {
      setError("Analiz başlatılamadı. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  }

  return (
    <main style={{ backgroundColor: "#050505", minHeight: "100vh", color: "#fff", padding: "60px 20px" }}>
      <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
        
        <Link href="/pricing" style={{ 
          display: "inline-flex", 
          alignItems: "center", 
          gap: "8px", 
          color: "#71717a", 
          textDecoration: "none",
          fontSize: "14px",
          marginBottom: "30px",
          transition: "color 0.2s"
        }}>
          <ArrowLeft size={16} /> Paket Seçimine Dön
        </Link>

        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, marginBottom: "10px", letterSpacing: "-1px" }}>
            Analiz Edilecek <span style={{ color: "#3b82f6" }}>Aracı Seç</span>
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: "16px" }}>
            Seçtiğiniz pakete göre yapay zeka rehberini hazırlıyoruz. Lütfen araç tipini belirleyin.
          </p>
        </div>

        {/* Paket Özet Kartı */}
        <div style={{
          background: "linear-gradient(90deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.1) 100%)",
          border: "1px solid rgba(59,130,246,0.2)",
          padding: "20px 25px",
          borderRadius: "24px",
          marginBottom: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backdropFilter: "blur(10px)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={{ 
              width: "45px", 
              height: "45px", 
              backgroundColor: pkg === "detailed" ? "#8b5cf6" : "#3b82f6", 
              borderRadius: "12px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(59,130,246,0.3)"
            }}>
              {pkg === "detailed" ? <Layers size={22} color="#fff" /> : <CheckCircle2 size={22} color="#fff" />}
            </div>
            <div>
              <div style={{ fontSize: "12px", color: "#a1a1aa", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Seçili Paket</div>
              <div style={{ fontSize: "18px", fontWeight: 800, color: "#fff" }}>
                {pkg === "detailed" ? "Detaylı Analiz" : "Standart Analiz"}
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "20px", fontWeight: 900, color: "#fff" }}>
              ₺{pkg === "detailed" ? "129,90" : "89,90"}
            </div>
            <div style={{ fontSize: "11px", color: "#3b82f6", fontWeight: 700 }}>KDV DAHİL</div>
          </div>
        </div>

        <div className="glass" style={{ 
          padding: "40px", 
          borderRadius: "32px", 
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(15, 15, 15, 0.6)",
          backdropFilter: "blur(20px)",
          position: "relative",
          overflow: "hidden"
        }}>
          
          <div style={{ marginBottom: "35px" }}>
            <label style={{ fontSize: "14px", fontWeight: 700, color: "#71717a", marginBottom: "20px", display: "block", textTransform: "uppercase", letterSpacing: "1px" }}>
              Araç Tipi Belirleyin
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "15px" }}>
              {VEHICLES.map((v) => {
                const active = selected === v.key;
                return (
                  <button
                    key={v.key}
                    type="button"
                    onClick={() => setSelected(v.key)}
                    disabled={loading}
                    style={{ 
                      padding: "24px", 
                      textAlign: "left", 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "20px",
                      borderRadius: "24px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      border: active ? "2px solid #3b82f6" : "1px solid rgba(255,255,255,0.05)",
                      background: active ? "rgba(59, 130, 246, 0.08)" : "rgba(255,255,255,0.02)",
                      color: "#fff",
                      transform: active ? "translateY(-2px)" : "none",
                    }}
                  >
                    <div style={{ 
                      width: "54px", height: "54px", borderRadius: "16px", 
                      background: active ? "#3b82f6" : "rgba(255,255,255,0.05)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: active ? "#fff" : "#71717a",
                      transition: "all 0.3s ease"
                    }}>
                      {v.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "16px", color: active ? "#fff" : "#e4e4e7" }}>{v.title}</div>
                      <div style={{ fontSize: "13px", color: "#71717a" }}>{v.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <button
                disabled={!selected || loading}
                onClick={handleContinue}
                style={{ 
                    padding: "20px 40px", fontSize: "18px", flex: 2, justifyContent: "center",
                    backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "20px",
                    fontWeight: "900", cursor: selected ? "pointer" : "not-allowed", 
                    opacity: selected ? 1 : 0.5,
                    display: "flex", alignItems: "center",
                    boxShadow: selected ? "0 10px 30px rgba(59,130,246,0.3)" : "none",
                    transition: "all 0.2s ease"
                }}
              >
                {loading ? "Sistem Hazırlanıyor..." : "Fotoğraf Yüklemeye Geç"}
                {!loading && <ChevronRight size={20} style={{ marginLeft: "10px" }} />}
              </button>

              <Link href="/guide" style={{ 
                  padding: "20px 30px", flex: 1, justifyContent: "center", display: "flex", alignItems: "center",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", color: "#fff", textDecoration: "none",
                  fontWeight: "700", fontSize: "15px"
                }}>
                Nasıl Çekilir?
              </Link>
            </div>

            {error && (
              <div style={{ padding: "15px", borderRadius: "16px", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#ef4444", fontSize: "14px", display: "flex", alignItems: "center", gap: "10px" }}>
                <Info size={18} /> {error}
              </div>
            )}
          </div>

          <div style={{ margin: "40px 0 30px 0", height: "1px", background: "rgba(255,255,255,0.05)" }} />

          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", color: "#52525b" }}>
            <ShieldCheck size={20} style={{ marginTop: "2px", flexShrink: 0, color: "#22c55e" }} />
            <p style={{ fontSize: "13px", margin: 0, lineHeight: "1.6" }}>
              <b>Kesintisiz Deneyim:</b> Seçtiğiniz <b>{pkg === "detailed" ? "Detaylı" : "Standart"}</b> paket gereksinimleri yapay zekaya iletildi. Görsel yükleme adımında size rehberlik edeceğiz.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

// 2. Ana export Suspense ile sarmalanır
export default function VehicleSelectPage() {
  return (
    <Suspense fallback={<div style={{ color: "#fff", textAlign: "center", padding: "100px" }}>Yükleniyor...</div>}>
      <VehicleSelectContent />
    </Suspense>
  );
}