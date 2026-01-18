"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/marketing/SiteShell";
import { 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Car, 
  Search, 
  Activity, 
  Cpu, 
  ScanLine,
  Crosshair 
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const handleStartRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/vehicle");
  };

  return (
    <main style={{ backgroundColor: "#050505", color: "#fff" }}>
      {/* HERO SECTION */}
      <section className="section" style={{ 
        paddingTop: "clamp(80px, 15vh, 120px)", 
        paddingBottom: "80px", 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }}></div>
        
        <div className="container" style={{ 
          display: 'flex', 
          flexDirection: 'column', // Mobilde alt alta
          gap: 40, 
          position: 'relative', 
          zIndex: 1 
        }}>
          
          {/* Masaüstü için yan yana düzeni sağlayan wrapper (Global CSS'deki heroGrid'e alternatif) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr', // Varsayılan mobil
            gap: '40px',
            alignItems: 'center'
          }} className="responsiveHeroGrid"> 
            
            {/* Sol Taraf: Teknik Mesaj */}
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                <Badge tone="ok" text="YOLOv8 Motoru" />
                <Badge tone="muted" text="v8.0.x Segmentasyon" />
              </div>

              <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20 }}>
                YOLOv8 Mimari ile <br /> 
                <span style={{ color: '#3b82f6', background: 'linear-gradient(to right, #3b82f6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Derin Panel Analizi.
                </span>
              </h1>
              
              <p style={{ fontSize: 'clamp(16px, 4vw, 18px)', color: "#a1a1aa", lineHeight: 1.6, maxWidth: 580, marginBottom: 35 }}>
                Yapay zeka tabanlı YOLOv8 segmentasyon motoru, araç gövdesini milimetrik olarak tarar. 
                Gözle görülmeyen ton farklarını ve sök-tak işlemlerini anında raporlar.
              </p>

              <div style={{ display: "flex", gap: 12, marginBottom: 44, flexWrap: "wrap" }}>
                <button 
                  className="btn btnPrimary" 
                  onClick={handleStartRedirect}
                  style={{ padding: '14px 28px', fontSize: 16, fontWeight: 700, borderRadius: 12, flex: '1 1 auto', minWidth: '200px' }}
                >
                  AI Analizini Başlat →
                </button>
                <Link className="btn btnGhost" href="/photo-guide" style={{ padding: '14px 28px', fontSize: 16, borderRadius: 12, flex: '1 1 auto', minWidth: '200px', textAlign: 'center' }}>
                  Teknik Rehber
                </Link>
              </div>

              <div style={{ display: 'flex', gap: 24 }}>
                <div>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>0.012 sn</span>
                  <div style={{ fontSize: 11, color: '#71717a', textTransform: 'uppercase' }}>Analiz Hızı</div>
                </div>
                <div style={{ width: '1px', backgroundColor: '#27272a' }}></div>
                <div>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>%86.4</span>
                  <div style={{ fontSize: 11, color: '#71717a', textTransform: 'uppercase' }}>Tespit Hassasiyeti</div>
                </div>
              </div>
            </div>

            {/* Sağ Taraf: Canlı YOLO Rapor Görseli (Mobilde sığması için optimize edildi) */}
            <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
              <div className="glass" style={{ 
                padding: 'clamp(16px, 4vw, 24px)', 
                borderRadius: '24px', 
                border: '1px solid rgba(255,255,255,0.08)', 
                background: 'rgba(15, 15, 15, 0.7)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Cpu size={16} color="#fff" />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: 12 }}>YOLOv8x-SEG ÇIKTISI</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 9, color: '#71717a' }}>300 EPOCH</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6' }}>KARARLI</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { p: "ÖN ÇAMURLUK", s: "ORİJİNAL", c: "#22c55e", d: "Doku: 0.99", g: "%88" },
                    { p: "ARKA KAPI (R)", s: "BOYALI", c: "#ef4444", d: "Renk Sapması", g: "%84" },
                    { p: "KAPUT", s: "SÖK-TAK", c: "#f59e0b", d: "Civata Def.", g: "%81" }
                  ].map((item, idx) => (
                    <div key={idx} style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '1.2fr 1fr 0.5fr', 
                      alignItems: 'center', 
                      gap: 10, 
                      padding: '10px 14px', 
                      background: 'rgba(255,255,255,0.02)', 
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.03)'
                    }}>
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontSize: 10, fontWeight: 800, color: '#fff', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.p}</div>
                        <div style={{ fontSize: 9, color: '#71717a' }}>{item.d}</div>
                      </div>
                      <div style={{ fontSize: 9, fontWeight: 700, background: `${item.c}15`, color: item.c, padding: '3px 6px', borderRadius: '5px', textAlign: 'center' }}>
                        {item.s}
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#3b82f6', textAlign: 'right' }}>{item.g}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Ekstra CSS eklemeye gerek kalmadan responsive yapı için stil etiketi */}
      <style jsx>{`
        @media (min-width: 992px) {
          .responsiveHeroGrid {
            grid-template-columns: 1.1fr 0.9fr !important;
            gap: 60px !important;
          }
        }
      `}</style>

      {/* ÖZELLİKLER SECTION (YOLOv8 Detaylı) */}
      <section className="section" style={{ backgroundColor: '#080808', padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Badge tone="ok" text="Teknik Altyapı" />
            <h2 style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 900, marginTop: '15px' }}>YOLOv8 ile Gelişmiş Tespit</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {/* Kartlar buraya gelecek (Yukarıdakiyle aynı, sadece padding mobilde biraz azaldı) */}
            {[
              { icon: <ScanLine size={24} color="#3b82f6" />, title: "Nesne Segmentasyonu", text: "YOLOv8-SEG ile her paneli piksel düzeyinde bağımsız maskelerle analiz ediyoruz.", color: "#3b82f6" },
              { icon: <Cpu size={24} color="#3b82f6" />, title: "Darknet53 Omurgası", text: "Derin sinir ağımız, fabrika boya dokusunu analiz eder ve mikroskopik sapmaları yakalar.", color: "#3b82f6" },
              { icon: <Crosshair size={24} color="#22c55e" />, title: "Vida Başı Analizi", text: "Menteşe noktalarındaki anahtar izlerini nesne tanıma ile saptar ve değişim riskini hesaplar.", color: "#22c55e" },
              { icon: <Zap size={24} color="#f59e0b" />, title: "Dinamik Web Raporu", text: "Analiz sonuçlarınız interaktif ve her cihazdan erişilebilir bir panelde sunulur.", color: "#f59e0b" }
            ].map((feature, i) => (
              <div key={i} className="glass" style={{ padding: 24, borderRadius: 20, border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ width: 44, height: 44, background: `${feature.color}15`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>{feature.title}</h3>
                <p style={{ color: '#a1a1aa', fontSize: 14, lineHeight: 1.5 }}>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section id="pricing" className="section" style={{ padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: 700, margin: '0 auto', background: 'linear-gradient(180deg, #18181b 0%, #09090b 100%)', padding: 'clamp(30px, 8vw, 60px) 20px', borderRadius: 32, border: '1px solid #27272a' }}>
            <h2 style={{ fontSize: 'clamp(28px, 6vw, 36px)', fontWeight: 900, marginBottom: 15 }}>Analizi Başlat</h2>
            <p style={{ color: '#a1a1aa', marginBottom: 35, fontSize: 15 }}>YOLOv8 tabanlı profesyonel araç raporuna anında ulaşın.</p>
            <div style={{ fontSize: 'clamp(36px, 10vw, 44px)', fontWeight: 900, marginBottom: 30, color: '#fff' }}>
              129,90 <span style={{ fontSize: 20, fontWeight: 500, color: '#71717a' }}>₺</span>
            </div>
            <button className="btn btnPrimary" onClick={handleStartRedirect} style={{ padding: '16px 40px', fontSize: 17, fontWeight: 700, borderRadius: 14, width: '100%', maxWidth: '300px' }}>
              Paketi Satın Al →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}