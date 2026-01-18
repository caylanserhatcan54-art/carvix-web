"use client";

import { Info, Cpu, Zap, ShieldAlert } from "lucide-react";

export default function HakkimizdaPage() {
  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', padding: '40px 20px' }}>
      <div className="container" style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        lineHeight: '1.8', 
        color: '#e4e4e7', 
        fontFamily: 'sans-serif' 
      }}>
        
        {/* Başlık Bölümü */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ 
            color: '#ffffff', 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            letterSpacing: '-1px',
            marginBottom: '10px'
          }}>
            Hakkımızda
          </h1>
          <div style={{ width: '60px', height: '4px', backgroundColor: '#2563eb', margin: '0 auto', borderRadius: '2px' }}></div>
        </div>
        
        <section style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '1.15rem', color: '#fff', fontWeight: '500' }}>
            <strong style={{ color: '#3b82f6' }}>Carvix</strong>, otomotiv sektöründe dijital dönüşümü yapay zeka teknolojileriyle birleştiren, Türkiye merkezli bir teknoloji platformudur.
          </p>
          <p style={{ marginTop: '15px' }}>
            Temel misyonumuz, araç alım-satım süreçlerinde şeffaflığı artırmak ve kullanıcıların fiziksel ekspertiz öncesinde araçlar hakkında veri odaklı ön bilgi sahibi olmalarını sağlamaktır.
          </p>
        </section>

        {/* Özellikler Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: '#18181b', padding: '25px', borderRadius: '20px', border: '1px solid #27272a' }}>
            <Cpu size={24} color="#3b82f6" style={{ marginBottom: '15px' }} />
            <h3 style={{ color: '#fff', margin: '0 0 10px 0' }}>Yapay Zeka Analizi</h3>
            <p style={{ fontSize: '0.9rem', color: '#a1a1aa', margin: 0 }}>
              Yüksek çözünürlüklü görselleri bilgisayarlı görü (computer vision) algoritmalarıyla işleyerek ton farklarını ve panel uyumsuzluklarını tespit ederiz.
            </p>
          </div>
          
          <div style={{ backgroundColor: '#18181b', padding: '25px', borderRadius: '20px', border: '1px solid #27272a' }}>
            <Zap size={24} color="#3b82f6" style={{ marginBottom: '15px' }} />
            <h3 style={{ color: '#fff', margin: '0 0 10px 0' }}>Anında Teslimat</h3>
            <p style={{ fontSize: '0.9rem', color: '#a1a1aa', margin: 0 }}>
              Hizmetimiz %100 dijitaldir. Ödeme sonrası saniyeler içinde raporunuza erişebilir, zaman ve maliyet tasarrufu sağlarsınız.
            </p>
          </div>
        </div>

        {/* Önemli Bilgilendirme Kutusu */}
        <section style={{ 
          marginTop: '30px', 
          padding: '25px', 
          backgroundColor: 'rgba(37, 99, 235, 0.05)', 
          borderRadius: '16px', 
          borderLeft: '4px solid #2563eb' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <ShieldAlert size={20} color="#3b82f6" />
            <h4 style={{ margin: 0, color: '#fff', fontSize: '1.1rem' }}>Önemli Bilgilendirme</h4>
          </div>
          <p style={{ marginBottom: 0, fontSize: '0.95rem', color: '#a1a1aa' }}>
            Carvix tarafından sunulan raporlar bir <strong>"Yapay Zeka Ön Değerlendirmesi"</strong> niteliğindedir ve yasal bir ekspertiz belgesi yerine geçmez. Amacımız, son karar öncesi kullanıcıyı bilgilendirmektir.
          </p>
        </section>

        {/* İletişim Bölümü */}
        <div style={{ 
          marginTop: '50px', 
          paddingTop: '30px', 
          borderTop: '1px solid #27272a',
          textAlign: 'center'
        }}>
          <p style={{ color: '#71717a', fontSize: '0.9rem' }}>
            Sorularınız veya iş birliği talepleriniz için:<br />
            <a href="mailto:info@carvix.site" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>
              info@carvix.site
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}