"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/marketing/SiteShell";
import { ShieldCheck, Zap, CheckCircle2, Car, Search, Activity } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const handleStartRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/vehicle");
  };

  return (
    <main style={{ backgroundColor: "#050505", color: "#fff" }}>
      {/* HERO SECTION - Üstteki karmaşık yazılar temizlendi */}
      <section className="section" style={{ 
        paddingTop: "120px", // Navbar'ın altında temiz bir boşluk bırakır
        paddingBottom: "80px", 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        
        {/* Arka Plan Dekoratif Işıklar */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }}></div>
        
        <div className="container heroGrid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 60, alignItems: 'center', position: 'relative', zIndex: 1 }}>
          
          {/* Sol Taraf: Ana Mesaj */}
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              <Badge tone="muted" text="Yapay Zeka Destekli" />
              <Badge tone="muted" text="V2.0 Analiz Motoru" />
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20 }}>
              Aracı görmeden <br /> 
              <span style={{ color: '#3b82f6', background: 'linear-gradient(to right, #3b82f6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                riskini analiz et.
              </span>
            </h1>
            
            <p style={{ fontSize: 18, color: "#a1a1aa", lineHeight: 1.6, maxWidth: 580, marginBottom: 35 }}>
              Carvix AI, gelişmiş görüntü işleme teknolojisiyle araç panellerini tarar. 
              Boya farklarını ve mikroskobik işlem izlerini saniyeler içinde raporlar.
            </p>

            <div style={{ display: "flex", gap: 16, marginBottom: 44, flexWrap: "wrap" }}>
              <button 
                className="btn btnPrimary" 
                onClick={handleStartRedirect}
                style={{ padding: '16px 32px', fontSize: 17, fontWeight: 700, borderRadius: 12, boxShadow: '0 10px 20px -5px rgba(37, 99, 235, 0.4)' }}
              >
                AI Analizini Başlat →
              </button>
              <Link className="btn btnGhost" href="/photo-guide" style={{ padding: '16px 32px', fontSize: 17, borderRadius: 12 }}>
                Fotoğraf Rehberi
              </Link>
            </div>

            <div style={{ display: 'flex', gap: 30 }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>%82.5</span>
                <span style={{ fontSize: 12, color: '#71717a', textTransform: 'uppercase' }}>Analiz Tutarlılığı</span>
              </div>
              <div style={{ width: '1px', backgroundColor: '#27272a' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>60 Saniye</span>
                <span style={{ fontSize: 12, color: '#71717a', textTransform: 'uppercase' }}>İşlem Süresi</span>
              </div>
            </div>
          </div>

          {/* Sağ Taraf: Gerçekçi Rapor Görseli */}
          <div style={{ position: 'relative' }}>
            <div className="glass" style={{ 
              padding: '24px', 
              borderRadius: '28px', 
              border: '1px solid rgba(255,255,255,0.08)', 
              background: 'rgba(15, 15, 15, 0.7)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Activity size={18} color="#fff" />
                  </div>
                  <span style={{ fontWeight: 800, fontSize: 14 }}>DİJİTAL EKSPERTİZ</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, color: '#71717a' }}>RAPOR NO: #82910</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#3b82f6' }}>AI ÖN ANALİZ</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { p: "KAPUT", s: "OK", c: "#22c55e", d: "Orijinal Veri Uyumu", g: "%88" },
                  { p: "SAĞ ÖN ÇAMURLUK", s: "DETECTED", c: "#ef4444", d: "Mikron Farkı / Boya", g: "%82" },
                  { p: "SOL ÖN KAPI", s: "SUSPECTED", c: "#f59e0b", d: "Ton Farkı Şüphesi", g: "%76" },
                  { p: "TAVAN", s: "OK", c: "#22c55e", d: "Fabrika Standartı", g: "%91" }
                ].map((item, idx) => (
                  <div key={idx} style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr auto auto', 
                    alignItems: 'center', 
                    gap: 15, 
                    padding: '12px 16px', 
                    background: 'rgba(255,255,255,0.02)', 
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.03)'
                  }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, color: '#fff' }}>{item.p}</div>
                      <div style={{ fontSize: 10, color: '#71717a' }}>{item.d}</div>
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 700, background: `${item.c}15`, color: item.c, padding: '4px 8px', borderRadius: '6px' }}>
                      {item.s}
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#3b82f6' }}>{item.g}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 20, paddingTop: 15, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: '#71717a' }}>Toplam Analiz: 12 Panel</span>
              </div>
            </div>

            <div style={{ 
              position: 'absolute', 
              bottom: '-20px', 
              right: '-10px', 
              background: '#3b82f6', 
              padding: '10px 20px', 
              borderRadius: '12px', 
              boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              zIndex: 2
            }}>
              <CheckCircle2 size={16} color="#fff" />
              <span style={{ fontSize: 12, fontWeight: 700 }}>Analiz Tamamlandı!</span>
            </div>
          </div>
        </div>
      </section>

      {/* ÖZELLİKLER */}
      <section className="section" style={{ backgroundColor: '#080808', padding: '100px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 30 }}>
            <div className="glass" style={{ padding: 40, borderRadius: 24 }}>
              <div style={{ width: 48, height: 48, background: '#1d4ed822', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Search size={24} color="#3b82f6" />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Akıllı Tarama</h3>
              <p style={{ color: '#a1a1aa', fontSize: 15 }}>İnsan gözünün kaçırabileceği ton farklarını ve mikroskobik deformasyonları yakalar.</p>
            </div>

            <div className="glass" style={{ padding: 40, borderRadius: 24 }}>
              <div style={{ width: 48, height: 48, background: '#1d4ed822', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Car size={24} color="#3b82f6" />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>Kapsamlı Veritabanı</h3>
              <p style={{ color: '#a1a1aa', fontSize: 15 }}>Binlerce farklı araç modelinin fabrika çıkış boya standartlarını baz alarak karşılaştırma yapar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section id="pricing" className="section" style={{ paddingBottom: 100 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: 700, margin: '0 auto', background: 'linear-gradient(180deg, #18181b 0%, #09090b 100%)', padding: '60px 40px', borderRadius: 32, border: '1px solid #27272a' }}>
            <h2 style={{ fontSize: 36, fontWeight: 900, marginBottom: 15 }}>Hemen Başlayın</h2>
            <p style={{ color: '#a1a1aa', marginBottom: 35 }}>Ön analizinizi saniyeler içinde cebinize alın.</p>
            
            <div style={{ fontSize: 44, fontWeight: 900, marginBottom: 30, color: '#fff' }}>
              129,90 <span style={{ fontSize: 20, fontWeight: 500, color: '#71717a' }}>₺</span>
            </div>

            <button 
              className="btn btnPrimary" 
              onClick={handleStartRedirect}
              style={{ padding: '18px 48px', fontSize: 18, fontWeight: 700, borderRadius: 14 }}
            >
              AI Analizi Paketini Satın Al →
            </button>

            <div style={{ marginTop: 25, display: 'flex', justifyContent: 'center', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#71717a' }}>
                <ShieldCheck size={14} color="#22c55e" /> Güvenli Ödeme
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#71717a' }}>
                <Zap size={14} color="#3b82f6" /> Anında Dijital Rapor
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}