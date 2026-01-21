"use client";

import { 
  ShieldCheck, Zap, Cpu, ScanLine, FileText, Lock, Sparkles, Check, Car, MousePointerClick, BarChart3, Smartphone 
} from "lucide-react";

export default function LandingPage() {
  return (
    <main style={{ backgroundColor: "#050505", color: "#fff", fontFamily: 'Inter, sans-serif', minHeight: '100vh' }}>
      
      {/* HERO SECTION */}
      <section style={{ paddingTop: "clamp(100px, 18vh, 150px)", paddingBottom: "100px", textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '100%', height: '500px', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', zIndex: 0 }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: "inline-flex", alignItems: 'center', gap: 10, marginBottom: 30, backgroundColor: 'rgba(59,130,246,0.08)', padding: '10px 24px', borderRadius: '100px', border: '1px solid rgba(59,130,246,0.2)' }}>
            <Sparkles size={16} color="#60a5fa" />
            <span style={{ fontSize: '13px', fontWeight: 900, color: '#60a5fa', letterSpacing: '0.5px' }}>YOLOv8x-SEGMENTATION TEKNOLOJİSİ</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.8rem)', fontWeight: 950, lineHeight: 0.95, letterSpacing: '-0.05em', marginBottom: 30 }}>
            Aracınızın Kaportasını <br /> <span style={{ color: '#3b82f6' }}>Yapay Zeka</span> Tarasın
          </h1>
          
          <p style={{ fontSize: '20px', color: "#a1a1aa", lineHeight: 1.6, maxWidth: 750, margin: '0 auto 20px' }}>
            Carvix AI, otomobillerin dijital röntgenini çeker. Boyalı parçaları, değişenleri ve sök-tak işlemlerini milimetrik hassasiyetle raporlar.
          </p>

          <p style={{ fontSize: '14px', color: '#3b82f6', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
            Analize Başlamak İçin Yukarıdaki Panelden Giriş Yapın
          </p>
        </div>
      </section>

      {/* İSTATİSTİK BÖLÜMÜ */}
      <section style={{ padding: '40px 8%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '40px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#fff' }}>%86.4</div>
          <div style={{ fontSize: '12px', color: '#71717a', textTransform: 'uppercase' }}>Tespit Doğruluğu</div>
        </div>
        <div style={{ width: '1px', backgroundColor: '#222' }}></div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#fff' }}>0.012s</div>
          <div style={{ fontSize: '12px', color: '#71717a', textTransform: 'uppercase' }}>İşlem Hızı</div>
        </div>
        <div style={{ width: '1px', backgroundColor: '#222' }}></div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#fff' }}>10k+</div>
          <div style={{ fontSize: '12px', color: '#71717a', textTransform: 'uppercase' }}>Analiz Edilen Araç</div>
        </div>
      </section>

      {/* NASIL ÇALIŞIR? */}
      <section style={{ padding: '100px 8%' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 900, marginBottom: '60px' }}>3 Adımda Dijital Ekspertiz</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          {[
            { icon: <Car size={32} color="#3b82f6" />, title: "Araç Türünü Seç", desc: "Sisteme giriş yaptıktan sonra araç türünü belirleyin." },
            { icon: <MousePointerClick size={32} color="#3b82f6" />, title: "Fotoğrafları Yükle", desc: "Aracın dış fotoğraflarını güvenle buluta aktarın." },
            { icon: <Zap size={32} color="#3b82f6" />, title: "AI Analizi Al", desc: "Yapay zeka saniyeler içinde raporunuzu PDF olarak hazırlasın." }
          ].map((f, i) => (
            <div key={i} style={{ padding: '40px', borderRadius: '28px', backgroundColor: '#0c0c0c', border: '1px solid #1a1a1a', position: 'relative' }}>
               <div style={{ position: 'absolute', top: '20px', right: '30px', fontSize: '40px', fontWeight: 900, color: 'rgba(255,255,255,0.03)' }}>0{i+1}</div>
              <div style={{ marginBottom: '25px' }}>{f.icon}</div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>{f.title}</h3>
              <p style={{ color: '#71717a', fontSize: '15px', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEDEN CARVIX? */}
      <section style={{ padding: '100px 8%', backgroundColor: '#080808' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '20px' }}>Neden Geleneksel Yöntemler Yerine Carvix?</h2>
            <p style={{ color: '#a1a1aa', marginBottom: '30px', lineHeight: 1.6 }}>İnsan gözünün kaçırabileceği mikron düzeyindeki boya farklarını yapay zeka saniyeler içinde yakalar.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {[
                "Piksel tabanlı derin öğrenme analizi",
                "Hile yapılamaz dijital raporlama",
                "7/24 kesintisiz hizmet",
                "Uygun fiyatlı profesyonel çözüm"
              ].map((text, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', padding: '4px', borderRadius: '50%' }}>
                    <Check size={14} color="#22c55e" />
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: 600 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ background: 'linear-gradient(45deg, #0c0c0c, #111)', padding: '40px', borderRadius: '30px', border: '1px solid #222' }}>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
              <BarChart3 color="#3b82f6" />
              <span style={{ fontWeight: 800 }}>Sistem Karşılaştırması</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                    <span>İnsan Gözü</span>
                    <span style={{ color: '#a1a1aa' }}>%42 Güven</span>
                  </div>
                  <div style={{ height: '8px', background: '#222', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: '42%', height: '100%', background: '#555' }}></div>
                  </div>
                </div>
                
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                    <span>Carvix AI</span>
                    <span style={{ color: '#3b82f6', fontWeight: 800 }}>%86.4 Güven</span>
                  </div>
                  <div style={{ height: '8px', background: '#222', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: '86.4%', height: '100%', background: '#3b82f6', boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)' }}></div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* FİYATLANDIRMA TABLOSU */}
      <section style={{ padding: '100px 8%' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: 950 }}>Şeffaf Paketler</h2>
          <p style={{ color: '#71717a', marginTop: '10px' }}>Tüm işlemler panel üzerinden güvenli bir şekilde gerçekleştirilir.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ padding: '50px 40px', borderRadius: '40px', backgroundColor: '#0c0c0c', border: '1px solid #222' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#a1a1aa' }}>Standart Paket</h3>
            <div style={{ fontSize: '56px', fontWeight: 950, margin: '20px 0' }}>89.90 <span style={{ fontSize: '20px' }}>TL</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '10px', fontSize: '15px' }}><Check size={18} color="#22c55e" /> Kaporta Analizi</div>
              <div style={{ display: 'flex', gap: '10px', fontSize: '15px' }}><Check size={18} color="#22c55e" /> Dijital Rapor</div>
              <div style={{ display: 'flex', gap: '10px', fontSize: '15px' }}><Check size={18} color="#22c55e" /> PDF İndirme</div>
            </div>
          </div>

          <div style={{ padding: '50px 40px', borderRadius: '40px', backgroundColor: '#0c0c0c', border: '1px solid #3b82f6', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '30px', right: '40px', backgroundColor: '#3b82f6', color: '#fff', padding: '6px 14px', borderRadius: '100px', fontSize: '11px', fontWeight: 900 }}>ÖNERİLEN</div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#3b82f6' }}>Detaylı Paket</h3>
            <div style={{ fontSize: '56px', fontWeight: 950, margin: '20px 0' }}>129.90 <span style={{ fontSize: '20px' }}>TL</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '10px', fontSize: '15px' }}><Check size={18} color="#3b82f6" /> Boya Kalınlık Tahmini</div>
              <div style={{ display: 'flex', gap: '10px', fontSize: '15px' }}><Check size={18} color="#3b82f6" /> Sök-Tak Kontrolü</div>
              <div style={{ display: 'flex', gap: '10px', fontSize: '15px' }}><Check size={18} color="#3b82f6" /> Detaylı AI Görüşü</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '80px 8%', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', color: '#52525b', fontSize: '13px', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldCheck size={18} color="#22c55e" /> Garanti BBVA Altyapısı</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Lock size={18} /> Güvenli Ödeme</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Smartphone size={18} /> Mobil Uyumlu</span>
        </div>
      </footer>
    </main>
  );
}