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
        paddingTop: "120px", 
        paddingBottom: "80px", 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        
        {/* Dekoratif Arka Plan Işığı */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }}></div>
        
        <div className="container heroGrid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 60, alignItems: 'center', position: 'relative', zIndex: 1 }}>
          
          {/* Sol Taraf: Teknik Mesaj */}
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              <Badge tone="ok" text="YOLOv8 Motoru" />
              <Badge tone="muted" text="v8.0.x Segmentasyon" />
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20 }}>
              YOLOv8 Mimari ile <br /> 
              <span style={{ color: '#3b82f6', background: 'linear-gradient(to right, #3b82f6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Derin Panel Analizi.
              </span>
            </h1>
            
            <p style={{ fontSize: 18, color: "#a1a1aa", lineHeight: 1.6, maxWidth: 580, marginBottom: 35 }}>
              Yapay zeka tabanlı YOLOv8 segmentasyon motoru, araç gövdesini milimetrik olarak tarar. 
              Gözle görülmeyen ton farklarını ve sök-tak işlemlerini anında raporlar.
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
                Teknik Rehber
              </Link>
            </div>

            <div style={{ display: 'flex', gap: 30 }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>0.012 sn</span>
                <span style={{ fontSize: 12, color: '#71717a', textTransform: 'uppercase' }}>Analiz Hızı</span>
              </div>
              <div style={{ width: '1px', backgroundColor: '#27272a' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>%86.4</span>
                <span style={{ fontSize: 12, color: '#71717a', textTransform: 'uppercase' }}>Tespit Hassasiyeti</span>
              </div>
            </div>
          </div>

          {/* Sağ Taraf: Canlı YOLO Rapor Görseli */}
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
                    <Cpu size={18} color="#fff" />
                  </div>
                  <span style={{ fontWeight: 800, fontSize: 14 }}>YOLOv8x-SEG ÇIKTISI</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, color: '#71717a' }}>EĞİTİM: 300 EPOCH</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#3b82f6' }}>KARARLI SÜRÜM</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { p: "ÖN ÇAMURLUK", s: "ORİJİNAL", c: "#22c55e", d: "Doku Uyumu: 0.99", g: "%88" },
                  { p: "ARKA KAPI (SAĞ)", s: "BOYALI", c: "#ef4444", d: "Renk Sapması Tespit Edildi", g: "%84" },
                  { p: "KAPUT", s: "SÖK-TAK", c: "#f59e0b", d: "Civata Deformasyonu", g: "%81" }
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
            </div>
          </div>
        </div>
      </section>

      {/* ÖZELLİKLER SECTION (YOLOv8 Detaylı) */}
      <section className="section" style={{ backgroundColor: '#080808', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Badge tone="ok" text="Teknik Altyapı" />
            <h2 style={{ fontSize: '32px', fontWeight: 900, marginTop: '15px' }}>YOLOv8 ile Gelişmiş Tespit Süreci</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            
            {/* Kart 1 */}
            <div className="glass hoverLift" style={{ padding: 32, borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ width: 48, height: 48, background: 'rgba(59, 130, 246, 0.1)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <ScanLine size={24} color="#3b82f6" />
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 800, marginBottom: 12 }}>Nesne Segmentasyonu</h3>
              <p style={{ color: '#a1a1aa', fontSize: 14, lineHeight: 1.6 }}>YOLOv8-SEG mimarisi sayesinde aracı bir bütün olarak değil, her paneli piksel düzeyinde bağımsız maskelerle analiz ediyoruz.</p>
              <ul style={{ padding: 0, marginTop: 15, listStyle: 'none', fontSize: 13, color: '#3b82f6', fontWeight: 600 }}>
                <li>• Piksel-Kusursuz Maskeleme</li>
                <li>• Panel Kenar Tespiti</li>
              </ul>
            </div>

            {/* Kart 2 */}
            <div className="glass hoverLift" style={{ padding: 32, borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ width: 48, height: 48, background: 'rgba(59, 130, 246, 0.1)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Cpu size={24} color="#3b82f6" />
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 800, marginBottom: 12 }}>CSPDarknet53 Omurgası</h3>
              <p style={{ color: '#a1a1aa', fontSize: 14, lineHeight: 1.6 }}>Derin sinir ağımız, fabrika boya dokusunu analiz eder. Işık kırılmalarındaki mikroskobik sapmaları anında tespit eder.</p>
              <ul style={{ padding: 0, marginTop: 15, listStyle: 'none', fontSize: 13, color: '#3b82f6', fontWeight: 600 }}>
                <li>• Öznitelik Çıkarımı</li>
                <li>• Doku Tutarlılık Kontrolü</li>
              </ul>
            </div>

            {/* Kart 3 */}
            <div className="glass hoverLift" style={{ padding: 32, borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ width: 48, height: 48, background: 'rgba(34, 197, 94, 0.1)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Crosshair size={24} color="#22c55e" />
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 800, marginBottom: 12 }}>Vida Başı Analizi</h3>
              <p style={{ color: '#a1a1aa', fontSize: 14, lineHeight: 1.6 }}>Menteşe ve bağlantı noktalarındaki anahtar izlerini nesne tanıma ile saptar. Parça değişim riskini yüksek doğrulukla hesaplar.</p>
              <ul style={{ padding: 0, marginTop: 15, listStyle: 'none', fontSize: 13, color: '#22c55e', fontWeight: 600 }}>
                <li>• Civata Tanımlama</li>
                <li>• Aşınma Modeli Eşleştirme</li>
              </ul>
            </div>

            {/* Kart 4 */}
            <div className="glass hoverLift" style={{ padding: 32, borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ width: 48, height: 48, background: 'rgba(245, 158, 11, 0.1)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Zap size={24} color="#f59e0b" />
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 800, marginBottom: 12 }}>Dinamik Web Raporu</h3>
              <p style={{ color: '#a1a1aa', fontSize: 14, lineHeight: 1.6 }}>PDF gibi statik dosyalarla uğraşmayın. Analiz sonuçlarınız interaktif ve her cihazdan erişilebilir bir panelde sunulur.</p>
              <ul style={{ padding: 0, marginTop: 15, listStyle: 'none', fontSize: 13, color: '#f59e0b', fontWeight: 600 }}>
                <li>• Gerçek Zamanlı Panel</li>
                <li>• Çoklu Cihaz Desteği</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section id="pricing" className="section" style={{ paddingBottom: 100, paddingTop: 100 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: 700, margin: '0 auto', background: 'linear-gradient(180deg, #18181b 0%, #09090b 100%)', padding: '60px 40px', borderRadius: 32, border: '1px solid #27272a' }}>
            <h2 style={{ fontSize: 36, fontWeight: 900, marginBottom: 15 }}>Analizi Başlat</h2>
            <p style={{ color: '#a1a1aa', marginBottom: 35 }}>YOLOv8 tabanlı profesyonel araç raporuna saniyeler içinde ulaşın.</p>
            <div style={{ fontSize: 44, fontWeight: 900, marginBottom: 30, color: '#fff' }}>
              129,90 <span style={{ fontSize: 20, fontWeight: 500, color: '#71717a' }}>₺</span>
            </div>
            <button className="btn btnPrimary" onClick={handleStartRedirect} style={{ padding: '18px 48px', fontSize: 18, fontWeight: 700, borderRadius: 14 }}>
              Paketi Satın Al →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}