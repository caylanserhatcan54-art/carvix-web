"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";

// Lucide Icons
import { 
  Cpu, ArrowRight, CheckCircle2, Star,
  ShieldCheck, Truck, Car, Camera, Search, Sparkles, RefreshCcw
} from "lucide-react";

export default function CarvixLanding() {
  const router = useRouter();
  const [welcomeData, setWelcomeData] = useState<any>(null);
  const [wavingData, setWavingData] = useState<any>(null);

  // Vercel/Linux sunucularında en güvenli yöntem: useEffect içinde fetch
  useEffect(() => {
    const loadAnimations = async () => {
      try {
        // Promise.all kullanarak her iki dosyayı paralel ve hızlıca çekiyoruz
        const [welcomeRes, wavingRes] = await Promise.all([
          fetch("/welcome.json"),
          fetch("/waving.json")
        ]);

        if (welcomeRes.ok) {
          const welcomeJson = await welcomeRes.json();
          setWelcomeData(welcomeJson);
        }

        if (wavingRes.ok) {
          const wavingJson = await wavingRes.json();
          setWavingData(wavingJson);
        }
      } catch (error) {
        console.error("Animasyonlar yüklenemedi:", error);
      }
    };
    loadAnimations();
  }, []);

  const handleSelectPlan = (plan: "standard" | "detailed") => {
    router.push(`/vehicle?p=${plan}`);
  };

  const reviews = [
    { user: "Mehmet K.****", comment: "Ekspertize gitmeden önce denedim, değişen kapıyı anında bildi.", rating: 5 },
    { user: "Caner T.****", comment: "Sol çamurluktaki lokal boyayı kaçırdı ama hasarı doğru bildi.", rating: 3 },
    { user: "Sinan Y.****", comment: "Boyasız diye gittim, Carvix macunu tespit etti. Harbi başarılı.", rating: 5 },
    { user: "Erdem A.****", comment: "Küçük çizikleri lokal boya sandı ama sök-tak tespiti çok tutarlı.", rating: 4 },
    { user: "Murat T.****", comment: "Hızlı rapor geliyor, PDF tasarımı çok profesyonel.", rating: 5 }
  ];

  return (
    <main style={{ backgroundColor: "#000", color: "#fff", fontFamily: 'Inter, sans-serif', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* --- 1. HERO SECTION --- */}
      <section style={{ padding: "80px 20px 60px", textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: '100%', background: 'radial-gradient(circle at center, rgba(59,130,246,0.12) 0%, transparent 80%)', pointerEvents: 'none' }} />
        
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* ANIMASYONLAR */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ width: '200px', height: '200px' }}>
               {welcomeData && <Lottie animationData={welcomeData} loop={true} style={{ height: '100%' }} />}
            </div>
            <div style={{ width: '100px', height: '100px', marginTop: '-40px' }}>
               {wavingData && <Lottie animationData={wavingData} loop={true} style={{ height: '100%' }} />}
            </div>
          </div>

          <div style={{ display: "inline-flex", alignItems: 'center', gap: 8, marginBottom: 24, background: 'rgba(59,130,246,0.1)', padding: '8px 20px', borderRadius: '100px', border: '1px solid rgba(59,130,246,0.2)' }}>
            <span style={{ display: 'flex' }}><Sparkles size={14} color="#3b82f6" fill="#3b82f6" /></span>
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '1px', color: '#60a5fa' }}>TÜRKİYE'NİN İLK YAPAY ZEKA ARAÇ ÖN ANALİZİ</span>
          </div>
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontWeight: 950, lineHeight: 1, letterSpacing: '-0.06em', marginBottom: 30 }}>
            Ekspertize Gitmeden <br />
            <span style={{ color: '#3b82f6' }}>Riskleri Fotoğraftan Görün.</span>
          </h1>
          
          <div style={{ maxWidth: '850px', margin: '0 auto 45px', textAlign: 'center' }}>
            <p style={{ fontSize: '22px', color: "#f8fafc", fontWeight: 700, marginBottom: '15px' }}>
              Carvix Ne İşe Yarar?
            </p>
            <p style={{ fontSize: '18px', color: "#94a3b8", lineHeight: 1.7 }}>
              Carvix, araç alım-satım sürecindeki <b>en büyük maliyet kalemini</b> ortadan kaldırmak için tasarlandı. 
              Beğendiğiniz bir aracın yanına gitmeden önce fotoğraflarını sistemimize yüklersiniz. 
              Yapay zekamız; panel üzerindeki <b>mikron farklarını, sök-tak izlerini ve boya dalgalanmalarını</b> derin öğrenme ile tarar. 
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '25px' }}>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="#pricing" style={{ backgroundColor: '#fff', color: '#000', padding: '18px 40px', borderRadius: '16px', fontWeight: 900, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '18px' }}>
                  Hemen Analiz Et <ArrowRight size={20} />
              </a>
              <a href="#how-it-works" style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', padding: '18px 40px', borderRadius: '16px', fontWeight: 700, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)', fontSize: '18px' }}>
                  Nasıl Çalışır?
              </a>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(15,23,42,0.6)', padding: '10px 20px', borderRadius: '100px', border: '1px solid #1e293b' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} style={{ 
                            width: '32px', height: '32px', borderRadius: '50%', 
                            border: '2px solid #000', marginLeft: i === 1 ? 0 : '-12px',
                            background: `hsl(${i * 45}, 60%, 45%)`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '12px', fontWeight: 'bold'
                        }}>
                            {String.fromCharCode(64 + i)}
                        </div>
                    ))}
                    <div style={{ 
                        width: '32px', height: '32px', borderRadius: '50%', 
                        border: '2px solid #000', marginLeft: '-12px',
                        background: '#3b82f6', display: 'flex', alignItems: 'center', 
                        justifyContent: 'center', fontSize: '10px', fontWeight: 900
                    }}>+2k</div>
                </div>
                <span style={{ fontSize: '14px', color: '#cbd5e1', fontWeight: 500 }}>
                    <b>2.000+ kullanıcı</b> riskli araçları Carvix ile eledi.
                </span>
            </div>
          </div>
        </div>
      </section>

      {/* --- GELİŞİM BARI --- */}
      <section style={{ background: '#0a0f1d', padding: '16px 20px', borderTop: '1px solid #1e293b', borderBottom: '1px solid #1e293b' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', textAlign: 'center' }}>
              <RefreshCcw size={18} color="#60a5fa" className="animate-spin-slow" />
              <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 500 }}>
                  Sizden gelen geri bildirimler ile algoritmamızı her gün geliştiriyoruz.
              </span>
          </div>
      </section>

      {/* --- 2. ADIM ADIM İŞLEYİŞ --- */}
      <section id="how-it-works" style={{ padding: "100px 20px", borderTop: '1px solid #111' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '80px', alignItems: 'center', marginBottom: '120px' }}>
            <div>
              <div style={{ color: '#3b82f6', fontWeight: 900, marginBottom: '10px', fontSize: '14px' }}>01. ADIM: GİRİŞ</div>
              <h2 style={{ fontSize: '42px', fontWeight: 900, marginBottom: '20px', lineHeight: 1.1 }}>Fotoğrafı Yükle.</h2>
              <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: 1.6 }}>
                Şüphelendiğiniz paneli net bir şekilde çekin. Carvix, aracın yüzeyindeki doku ve form bozukluklarını analiz eder.
              </p>
            </div>
            <div style={{ background: 'linear-gradient(145deg, #0a0a0b 0%, #111 100%)', padding: '60px', borderRadius: '40px', border: '1px solid #18181b', textAlign: 'center' }}>
              <Camera size={100} color="#3b82f6" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '80px', alignItems: 'center', marginBottom: '120px' }}>
            <div style={{ order: 2 }}>
              <div style={{ color: '#3b82f6', fontWeight: 900, marginBottom: '10px', fontSize: '14px' }}>02. ADIM: İŞLEME</div>
              <h2 style={{ fontSize: '42px', fontWeight: 900, marginBottom: '20px', lineHeight: 1.1 }}>YOLOv8 Analizi.</h2>
              <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: 1.6 }}>
                Yüklediğiniz görüntü segmentasyon motoru tarafından işlenir. Fabrikasyon sapmalar saniyeler içinde taranır.
              </p>
            </div>
            <div style={{ order: 1, background: 'linear-gradient(145deg, #0a0a0b 0%, #111 100%)', padding: '60px', borderRadius: '40px', border: '1px solid #18181b', textAlign: 'center' }}>
              <Cpu size={100} color="#3b82f6" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '80px', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#3b82f6', fontWeight: 900, marginBottom: '10px', fontSize: '14px' }}>03. ADIM: SONUÇ</div>
              <h2 style={{ fontSize: '42px', fontWeight: 900, marginBottom: '20px', lineHeight: 1.1 }}>Hızlı Ön Rapor.</h2>
              <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: 1.6 }}>
                Analiz bittiğinde, riskli bölgeler işaretlenmiş olarak sunulur. Bu sayede paranızı ve vaktinizi korumuş olursunuz.
              </p>
            </div>
            <div style={{ 
              background: '#0a0a0b', 
              borderRadius: '24px', 
              border: '1px solid rgba(59,130,246,0.3)', 
              boxShadow: '0 0 40px rgba(59,130,246,0.1)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
                <img 
                  src="/rapor-preview.png" 
                  alt="Carvix Analiz Raporu" 
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} 
                />
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. NEDEN CARVIX SECTION --- */}
      <section style={{ padding: "100px 20px", background: '#030303' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '40px', fontWeight: 900, marginBottom: '60px' }}>Neden Carvix?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            <UsageBox icon={Car} title="Zaman Kazandırır" text="Kötü durumdaki araçları daha ilan aşamasındayken elemenizi sağlar." />
            <UsageBox icon={ShieldCheck} title="Maliyet Düşürür" text="Gereksiz ekspertiz ücreti ödeme devrini kapatır." />
            <UsageBox icon={Search} title="Uzaktan Kontrol" text="Şehir dışındaki bir araç için gitmeden önce ön bilgi sahibi olun." />
            <UsageBox icon={Truck} title="Ticari Güven" text="Filo veya ticari araç alımlarında hızlı yüzey taraması sunar." />
          </div>
        </div>
      </section>

      {/* --- 4. PRICING SECTION --- */}
      <section id="pricing" style={{ padding: '100px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            <div className="price-card" style={{ padding: '50px 40px', borderRadius: '35px', background: '#09090b', border: '1px solid #18181b' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 900 }}>Standart Ön Analiz</h3>
              <div style={{ fontSize: '48px', fontWeight: 950, margin: '20px 0' }}>₺89,90</div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <CheckItem text="Hızlı Yüzey Taraması" />
                <CheckItem text="Boya & Macun Tespiti" />
                <CheckItem text="Bulut Tabanlı Analiz" />
              </ul>
              <button onClick={() => handleSelectPlan('standard')} style={{ width: '100%', padding: '20px', borderRadius: '15px', background: '#fff', color: '#000', fontWeight: 900, cursor: 'pointer' }}>Analizi Başlat</button>
            </div>

            <div className="price-card" style={{ padding: '50px 40px', borderRadius: '35px', background: 'linear-gradient(145deg, #09090b 0%, #020617 100%)', border: '2px solid #3b82f6', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-15px', right: '40px', background: '#3b82f6', color: '#fff', padding: '6px 15px', borderRadius: '10px', fontSize: '12px', fontWeight: 900 }}>EN ÇOK TERCİH EDİLEN</div>
              <h3 style={{ fontSize: '24px', fontWeight: 900 }}>Premium Ön Rapor</h3>
              <div style={{ fontSize: '48px', fontWeight: 950, margin: '20px 0' }}>₺129,90</div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <CheckItem text="İndirilebilir PDF Raporu" bold />
                <CheckItem text="Sök-Tak & Vida Analizi" bold />
                <CheckItem text="Panel Mikron Karşılaştırması" />
                <CheckItem text="Gelişmiş Hata İşaretleme" />
              </ul>
              <button onClick={() => handleSelectPlan('detailed')} style={{ width: '100%', padding: '20px', borderRadius: '15px', background: '#3b82f6', color: '#fff', fontWeight: 900, cursor: 'pointer' }}>Hemen Başlat</button>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. REVIEWS SECTION --- */}
      <section style={{ padding: "100px 0 60px", borderTop: '1px solid #111' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 900 }}>Kullanıcı Deneyimleri</h2>
        </div>
        <div className="marquee">
          <div className="marquee-content">
            {[...reviews, ...reviews].map((item, i) => (
              <div key={i} style={{ flexShrink: 0, background: '#0c0c0e', border: '1px solid #18181b', padding: '25px', borderRadius: '25px', minWidth: '320px', margin: '0 12px' }}>
                <div style={{ display: 'flex', marginBottom: '10px', gap: 2 }}>
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={12} fill={idx < item.rating ? "#fbbf24" : "transparent"} color={idx < item.rating ? "#fbbf24" : "#3f3f46"} />
                  ))}
                </div>
                <p style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '15px' }}>"{item.comment}"</p>
                <span style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 800 }}>{item.user}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ padding: '60px 20px', textAlign: 'center', color: '#3f3f46', borderTop: '1px solid #111' }}>
        <p>© 2026 Carvix AI Tech. Türkiye'nin ilk akıllı araç ön kontrol sistemi.</p>
      </footer>

      {/* --- WHATSAPP SABİT BUTON (EKLEME) --- */}
      <div style={{ 
        position: 'fixed', 
        bottom: '25px', 
        right: '25px', 
        zIndex: 9999, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-end' 
      }}>
        <div style={{ 
          backgroundColor: '#22c55e', 
          color: '#fff', 
          padding: '10px 18px', 
          borderRadius: '20px 20px 0 20px', 
          fontSize: '13px', 
          fontWeight: 800, 
          marginBottom: '10px', 
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          whiteSpace: 'nowrap',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          Destek ve geri dönüşleriniz için 7/24 yazabilirsiniz
        </div>
        
        <a 
          href="https://wa.me/905335239954" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ 
            transition: 'transform 0.3s', 
            display: 'block',
            filter: 'drop-shadow(0 5px 15px rgba(37,211,102,0.4))'
          }} 
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} 
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
            alt="WhatsApp Destek" 
            style={{ width: '60px', height: '60px' }} 
          />
        </a>
      </div>

      <style jsx>{`
        .marquee { display: flex; overflow: hidden; }
        .marquee-content { display: flex; animation: scroll 45s linear infinite; }
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .price-card { transition: all 0.3s ease; }
        .price-card:hover { transform: translateY(-12px); }
        .animate-spin-slow { animation: spin-anim 8s linear infinite; }
        @keyframes spin-anim { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}

// --- ALT BİLEŞENLER ---
function UsageBox({ icon: Icon, title, text }: { icon: any, title: string, text: string }) {
  return (
    <div style={{ padding: '35px', background: '#09090b', borderRadius: '30px', border: '1px solid #18181b' }}>
      <div style={{ color: '#3b82f6', marginBottom: '20px' }}>
        <Icon size={35} />
      </div>
      <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>{title}</h3>
      <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}

function CheckItem({ text, bold = false }: { text: string, bold?: boolean }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', color: bold ? '#fff' : '#94a3b8', fontWeight: bold ? 700 : 400 }}>
      <CheckCircle2 size={20} color="#22c55e" /> {text}
    </li>
  );
}