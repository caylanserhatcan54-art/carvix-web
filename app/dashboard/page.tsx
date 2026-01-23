"use client";

import Link from "next/link";
import { Badge } from "@/components/marketing/SiteShell";
import { 
  ShieldCheck, 
  Zap, 
  Car, 
  Cpu, 
  ScanLine,
  Crosshair,
  Lock,
  ArrowRight,
  FileText
} from "lucide-react";

export default function HomePage() {
  return (
    <main style={{ backgroundColor: "#050505", color: "#fff" }}>
      {/* HERO SECTION */}
      <section style={{ 
        paddingTop: "clamp(80px, 15vh, 120px)", 
        paddingBottom: "80px", 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        
        {/* Arka Plan Işığı */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr', 
            gap: '40px',
            alignItems: 'center'
          }} className="responsiveHeroGrid"> 
            
            {/* Sol Taraf: Mesaj ve Yeni Butonlar */}
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                <Badge tone="ok" text="YOLOv8 Motoru" />
                <Badge tone="muted" text="Yeni: PDF Rapor Desteği" />
              </div>

              <h1 style={{ fontSize: 'clamp(2.2rem, 8vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20 }}>
                YOLOv8 Mimari ile <br /> 
                <span style={{ color: '#3b82f6', background: 'linear-gradient(to right, #3b82f6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Derin Panel Analizi.
                </span>
              </h1>
              
              <p style={{ fontSize: 'clamp(16px, 4vw, 18px)', color: "#a1a1aa", lineHeight: 1.6, maxWidth: 580, marginBottom: 35 }}>
                Yapay zeka tabanlı segmentasyon motoru, araç gövdesini milimetrik olarak tarar. 
                Hemen bir paket seçin ve saniyeler içinde <span style={{ color: '#fff' }}>detaylı PDF raporunuzu</span> alın.
              </p>

              {/* GÜNCELLENEN BUTON ALANI */}
              <div style={{ display: "flex", flexDirection: 'column', gap: 16, marginBottom: 44 }}>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link 
                    href="/pricing" 
                    style={{ 
                      padding: '16px 32px', 
                      fontSize: 17, 
                      fontWeight: 800, 
                      borderRadius: 14, 
                      backgroundColor: '#3b82f6',
                      color: '#fff',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: '0 10px 20px -5px rgba(59, 130, 246, 0.4)'
                    }}
                  >
                    Paketleri İncele <ArrowRight size={20} />
                  </Link>
                </div>
                
                {/* Buton Altı Küçük Bilgi Yazısı */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#71717a', fontSize: '13px', marginLeft: '4px' }}>
                  <FileText size={14} />
                  <span>Tüm analizler indirilebilir PDF formatında sunulur.</span>
                </div>
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

            {/* Sağ Taraf: Rapor Görseli (Aynı Kaldı) */}
            <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
              <div style={{ 
                padding: '24px', 
                borderRadius: '24px', 
                border: '1px solid rgba(255,255,255,0.08)', 
                background: 'rgba(15, 15, 15, 0.7)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Cpu size={16} color="#fff" />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: 12 }}>YOLOv8x-SEG SİSTEMİ</span>
                  </div>
                  <Badge tone="ok" text="AKTİF" />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { p: "ÖN ÇAMURLUK", s: "ORİJİNAL", c: "#22c55e", g: "%99" },
                    { p: "ARKA KAPI (R)", s: "BOYALI", c: "#ef4444", g: "%84" },
                    { p: "KAPUT", s: "SÖK-TAK", c: "#f59e0b", g: "%81" }
                  ].map((item, idx) => (
                    <div key={idx} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center', 
                      padding: '12px 16px', 
                      background: 'rgba(255,255,255,0.02)', 
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.03)'
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700 }}>{item.p}</div>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <div style={{ fontSize: 9, fontWeight: 800, color: item.c }}>{item.s}</div>
                        <div style={{ fontSize: 10, color: '#3b82f6' }}>{item.g}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style jsx>{`
        @media (min-width: 992px) {
          .responsiveHeroGrid {
            grid-template-columns: 1.1fr 0.9fr !important;
            gap: 60px !important;
          }
        }
      `}</style>

      {/* ÖZELLİKLER SECTION (Kısa Tutuldu) */}
      <section style={{ backgroundColor: '#080808', padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              { icon: <ScanLine size={24} color="#3b82f6" />, title: "Hassas Tarama", text: "YOLOv8-SEG ile her paneli piksel düzeyinde analiz ediyoruz." },
              { icon: <FileText size={24} color="#3b82f6" />, title: "PDF Rapor", text: "Analiz sonuçlarını profesyonel bir PDF dosyası olarak indirin." },
              { icon: <ShieldCheck size={24} color="#22c55e" />, title: "Güvenli Ödeme", text: "Ödemeleriniz Shopier güvencesi ile 256-bit SSL şifrelemelidir." }
            ].map((feature, i) => (
              <div key={i} style={{ padding: 24, borderRadius: 20, border: '1px solid rgba(255,255,255,0.05)', backgroundColor: '#0c0c0c' }}>
                <div style={{ marginBottom: 16 }}>{feature.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 8 }}>{feature.title}</h3>
                <p style={{ color: '#71717a', fontSize: 14, lineHeight: 1.5 }}>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALT CTA - PAKETLERE YÖNLENDİRME */}
      <section style={{ padding: '100px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', background: '#111', padding: '60px 20px', borderRadius: '40px', border: '1px solid #222' }}>
            <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 900, marginBottom: 20 }}>Hazırsanız Başlayalım</h2>
            <p style={{ color: '#a1a1aa', marginBottom: 40, fontSize: 16 }}>Aracınızın geçmişini saniyeler içinde şeffaf bir raporla öğrenin.</p>
            
            <Link 
              href="/pricing" 
              style={{ 
                padding: '18px 48px', 
                fontSize: 18, 
                fontWeight: 800, 
                borderRadius: '16px', 
                backgroundColor: '#fff', 
                color: '#000',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              Paket Seç ve Analizi Başlat <ArrowRight size={20} />
            </Link>

            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: 20, opacity: 0.5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                <ShieldCheck size={16} color="#22c55e" /> Shopier Altyapı Güvencesi
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                <Lock size={14} /> 256-bit SSL Koruma
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}