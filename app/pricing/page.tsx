"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Yönlendirme için eklendi
import { 
  ShieldCheck, Zap, Cpu, ScanLine, FileText, Lock, Sparkles, 
  ArrowRight, Eye, Star, CheckCircle2, FileDown, CreditCard, Car, 
  BadgeCheck, Clock
} from "lucide-react";

export default function DashboardPricing() {
  const router = useRouter();

  // Pakete tıklandığında vehicle sayfasına yönlendiren fonksiyon
  const handleSelectPackage = (planType: string) => {
    // Seçilen paketi vehicle sayfasına parametre olarak gönderiyoruz
    router.push(`/vehicle?plan=${planType}`);
  };

  const reviews = [
    { user: "Mehmet K.****", comment: "Ekspertize gitmeden önce denedim, değişen kapıyı bildi.", rating: 5 },
    { user: "Sinan Y.****", comment: "Boyasız diye gittim, Carvix boyalı dedi. Harbi boyalıymış.", rating: 5 },
    { user: "Murat T.****", comment: "Hızlı rapor geliyor, PDF tasarımı çok profesyonel.", rating: 5 }
  ];

  return (
    <main style={{ backgroundColor: "#020203", color: "#fff", fontFamily: 'Inter, sans-serif', minHeight: '100vh' }}>
      
      {/* 1. ÜST BAŞLIK (ADIM 1) */}
      <section style={{ padding: "80px 20px 40px", textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: '300px', background: 'radial-gradient(circle at center, rgba(59,130,246,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <div style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: "inline-flex", alignItems: 'center', gap: 8, marginBottom: 20, background: 'rgba(59,130,246,0.08)', padding: '10px 24px', borderRadius: '100px', border: '1px solid rgba(59,130,246,0.2)' }}>
            <Zap size={16} color="#3b82f6" fill="#3b82f6" />
            <span style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.5px', color: '#60a5fa' }}>ADIM 1: PAKETİNİZİ SEÇİN</span>
          </div>
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontWeight: 900, letterSpacing: '-3px', lineHeight: '1', marginBottom: '25px' }}>
            Analiz <span style={{ color: '#3b82f6' }}>Raporları</span>
          </h1>
          <p style={{ color: '#a1a1aa', fontSize: '1.2rem', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' }}>
            İhtiyacınıza uygun paketi seçin, bir sonraki adımda <span style={{ color: '#fff' }}> aracınızı belirleyip </span> analizi anında başlatın.
          </p>
        </div>
      </section>

      {/* 2. MODERN PAKET KARTLARI */}
      <section style={{ padding: "20px 20px 60px", position: 'relative' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', position: 'relative', zIndex: 1 }}>
          
          {/* Standart Paket */}
          <div className="card-hover" style={{ padding: '50px 40px', borderRadius: '40px', backgroundColor: '#0c0c0c', border: '1px solid #1a1a1c', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#a1a1aa', marginBottom: '10px' }}>Standart Paket</h3>
            <div style={{ fontSize: '56px', fontWeight: 950, margin: '10px 0 30px' }}>₺89<span style={{ fontSize: '20px', color: '#52525b' }}>.90</span></div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '40px', flex: 1 }}>
              <div style={{ display: 'flex', gap: 12, fontSize: '15px' }}><CheckCircle2 size={20} color="#22c55e" /> Kaporta Boya Analizi</div>
              <div style={{ display: 'flex', gap: 12, fontSize: '15px' }}><CheckCircle2 size={20} color="#22c55e" /> Değişen Parça Tespiti</div>
              <div style={{ display: 'flex', gap: 12, fontSize: '15px' }}><CheckCircle2 size={20} color="#22c55e" /> Dijital Rapor Çıktısı</div>
              <div style={{ display: 'flex', gap: 12, fontSize: '15px', color: '#52525b' }}><Clock size={20} /> 0.12 Saniye İşlem Hızı</div>
            </div>

            <button onClick={() => handleSelectPackage('standart')} style={{ width: '100%', padding: '20px', borderRadius: '16px', backgroundColor: '#1a1a1c', color: '#fff', border: '1px solid #333', fontWeight: 800, fontSize: '16px', cursor: 'pointer', transition: '0.2s' }}>
              Seç ve İlerle
            </button>
          </div>

          {/* Detaylı Paket (Öne Çıkan) */}
          <div className="card-hover pro-card" style={{ padding: '50px 40px', borderRadius: '40px', backgroundColor: '#0c0c0c', border: '1px solid #3b82f6', position: 'relative', transform: 'scale(1.05)', boxShadow: '0 20px 50px -15px rgba(59, 130, 246, 0.3)' }}>
            <div style={{ position: 'absolute', top: '25px', right: '40px', backgroundColor: '#3b82f6', color: '#fff', padding: '6px 14px', borderRadius: '100px', fontSize: '11px', fontWeight: 900 }}>EN ÇOK TERCİH EDİLEN</div>
            
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#3b82f6', marginBottom: '10px' }}>Detaylı Paket</h3>
            <div style={{ fontSize: '56px', fontWeight: 950, margin: '10px 0 30px' }}>₺129<span style={{ fontSize: '20px', color: '#52525b' }}>.90</span></div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '40px', flex: 1 }}>
              <div style={{ display: 'flex', gap: 12, fontSize: '15px' }}><BadgeCheck size={20} color="#3b82f6" /> Boya Mikron Tahmini</div>
              <div style={{ display: 'flex', gap: 12, fontSize: '15px' }}><BadgeCheck size={20} color="#3b82f6" /> Sök-Tak Cıvata Analizi</div>
              <div style={{ display: 'flex', gap: 12, fontSize: '15px' }}><BadgeCheck size={20} color="#3b82f6" /> Detaylı Yapay Zeka Görüşü</div>
              <div style={{ display: 'flex', gap: 12, fontSize: '15px' }}><BadgeCheck size={20} color="#3b82f6" /> Öncelikli Sunucu Desteği</div>
            </div>

            <button onClick={() => handleSelectPackage('detayli')} style={{ width: '100%', padding: '20px', borderRadius: '16px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', fontWeight: 800, fontSize: '16px', cursor: 'pointer', boxShadow: '0 10px 20px -5px rgba(59, 130, 246, 0.4)' }}>
              Hemen Analiz Başlat
            </button>
          </div>
        </div>

        {/* İndirim Kodu Alt Bilgi */}
        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 24px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <span style={{ color: '#94a3b8', fontSize: '14px' }}>🎟️ İlk analizine özel %20 indirim:</span>
            <span style={{ color: '#fff', fontWeight: 900, letterSpacing: '1px' }}>Carvix20</span>
          </div>
        </div>
      </section>

      {/* 3. ALTYAPI & GÜVEN KARTLARI */}
      <section style={{ padding: '60px 20px', maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <div style={{ backgroundColor: '#0c0c0c', padding: '32px', borderRadius: '28px', border: '1px solid #1a1a1a', display: 'flex', gap: '20px' }}>
          <div style={{ padding: '12px', backgroundColor: 'rgba(59,130,246,0.1)', borderRadius: '14px', height: 'fit-content' }}>
            <FileDown size={28} color="#3b82f6" />
          </div>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>Dijital PDF Teslimatı</h4>
            <p style={{ color: '#71717a', fontSize: '14px', lineHeight: '1.6' }}>Analiz bittiği an raporunuzu PDF olarak indirebilirsiniz. Dosyanız kalıcıdır.</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#0c0c0c', padding: '32px', borderRadius: '28px', border: '1px solid #1a1a1a', display: 'flex', gap: '20px' }}>
          <div style={{ padding: '12px', backgroundColor: 'rgba(34,197,94,0.1)', borderRadius: '14px', height: 'fit-content' }}>
            <ShieldCheck size={28} color="#22c55e" />
          </div>
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>Güvenli Ödeme</h4>
            <p style={{ color: '#71717a', fontSize: '14px', lineHeight: '1.6' }}>Shopier & Garanti BBVA altyapısı ile 256-bit SSL korumalı ödeme.</p>
          </div>
        </div>
      </section>

      {/* 4. ALT YASAL BİLGİ */}
      <footer style={{ padding: '40px 20px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', marginBottom: '20px' }}>
           <span style={{ color: '#52525b', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}><CreditCard size={14} /> Tüm Kartlar Geçerlidir</span>
           <span style={{ color: '#52525b', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}><Lock size={14} /> 3D Secure</span>
        </div>
        <p style={{ color: '#3f3f46', fontSize: '12px', maxWidth: '800px', margin: '0 auto' }}>
          Bu hizmet dijital bir analiz raporudur. Satın alım sonrası hazırlanan raporlar anında teslim edildiği için iade kapsamı dışındadır. 
          Tüm süreç KVKK uyumlu ve şifrelenmiş altyapı üzerinden yürütülmektedir.
        </p>
      </footer>

      <style jsx>{`
        .card-hover { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .card-hover:hover { transform: translateY(-10px); border-color: #333 !important; }
        .pro-card:hover { transform: scale(1.07) translateY(-10px) !important; }
      `}</style>
    </main>
  );
}