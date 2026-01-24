"use client";

import PhotoGuideCards from "@/components/marketing/PhotoGuideCards";
import CTA from "@/components/marketing/CTA";
import { PHOTO_GUIDE } from "@/lib/marketing";
import { 
  Camera, 
  Lightbulb, 
  CheckCircle2, 
  LayoutGrid, 
  ArrowLeft,
  Scan,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function GuidePage() {
  return (
    <main style={{ backgroundColor: '#050505', minHeight: '100vh', padding: '60px 20px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Geri Dönüş */}
        <Link href="/pricing" style={{ 
          display: "inline-flex", 
          alignItems: "center", 
          gap: "8px", 
          color: "#71717a", 
          textDecoration: "none",
          fontSize: "14px",
          marginBottom: "30px",
          fontWeight: "600"
        }}>
          <ArrowLeft size={16} /> Paketlere Dön
        </Link>

        {/* Başlık Bölümü */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: '#3b82f6', 
            background: 'rgba(59,130,246,0.1)',
            padding: '8px 20px',
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: '800',
            marginBottom: '20px'
          }}>
            <Zap size={14} />
            <span>KULLANICI DOSTU ANALİZ REHBERİ</span>
          </div>
          
          <h1 style={{ 
            color: '#ffffff', 
            fontSize: 'clamp(2rem, 5vw, 3.2rem)', 
            fontWeight: '950', 
            letterSpacing: '-2px',
            lineHeight: '1.1',
            marginBottom: '20px'
          }}>
            Ekspertiz Öncesi <br />
            <span style={{ color: '#3b82f6' }}>Hızlı Hazırlık Rehberi</span>
          </h1>
          
          <p style={{ 
            color: '#a1a1aa', 
            fontSize: '1.1rem', 
            maxWidth: '650px', 
            lineHeight: '1.6',
            fontWeight: '500'
          }}>
            Zorlu teknik detaylarla uğraşmanıza gerek yok. Aracınızın etrafında bir tur atarak doğru analiz sonucunu almanız için bu basit adımları izleyin.
          </p>
        </div>

        {/* Bilgi Kartları Grubu */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '24px',
          marginBottom: '60px'
        }}>
          
          {/* Standart Paket Kartı */}
          <div style={{ 
            backgroundColor: '#0f0f0f', 
            padding: '35px', 
            borderRadius: '32px', 
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            <h3 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <LayoutGrid size={24} color="#3b82f6" /> Standart Analiz Modu
            </h3>
            <p style={{ color: '#71717a', fontSize: '14px', marginBottom: '20px' }}>Sadece aracın dış yüzeyine odaklanın. Kapıları açmanıza gerek yok.</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '12px' }}>
              {["Ön Kaput (Geniş Açı)", "Arka Bagaj ve Tampon", "Sağ Yan (Boydan)", "Sol Yan (Boydan)", "Tavan (Üstten Görünüm)"].map((r) => (
                <li key={r} style={{ display: 'flex', gap: '10px', color: '#d4d4d8', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Detaylı Paket Kartı */}
          <div style={{ 
            background: 'linear-gradient(145deg, #0f0f0f 0%, #0a0a0a 100%)', 
            padding: '35px', 
            borderRadius: '32px', 
            border: '1px solid rgba(59,130,246,0.2)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <h3 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Scan size={24} color="#60a5fa" /> Detaylı (Full) Mod
            </h3>
            <p style={{ color: '#71717a', fontSize: '14px', marginBottom: '20px' }}>Kapıları açarak menteşe ve direklerdeki gizli detayları çekin.</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '12px' }}>
              {["Kapı Menteşe Vidaları (Yakın)", "A-B-C Sütunları (İç Saclar)", "Kapı İç Fitil Altı Puntaları", "Kaput İç Bağlantı Noktaları", "Tavan ve Direk Birleşimleri"].map((r) => (
                <li key={r} style={{ display: 'flex', gap: '10px', color: '#d4d4d8', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Önemli İpucu Kutusu */}
        <div style={{ 
          backgroundColor: 'rgba(234, 179, 8, 0.05)', 
          border: '1px solid rgba(234, 179, 8, 0.2)', 
          padding: '25px', 
          borderRadius: '24px', 
          display: 'flex', 
          gap: '20px', 
          alignItems: 'center',
          marginBottom: '60px'
        }}>
          <div style={{ background: '#eab308', padding: '12px', borderRadius: '12px' }}>
            <Lightbulb size={24} color="#000" />
          </div>
          <div>
            <h4 style={{ color: '#fff', margin: 0, fontWeight: '800' }}>Kritik İpucu: Işığı Doğru Kullanın</h4>
            <p style={{ color: '#a1a1aa', margin: '5px 0 0 0', fontSize: '14px' }}>
              Gölgede veya çok karanlıkta çekim yapmayın. Güneş ışığı veya parlak bir lamba, boyadaki mikron farklarını AI'nın daha iyi yakalamasını sağlar.
            </p>
          </div>
        </div>

        {/* Görsel Referanslar */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
           <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: '900', letterSpacing: '-1px' }}>Örnek Çekim Açıları</h2>
           <p style={{ color: '#71717a' }}>Aşağıdaki örnekler gibi çekim yaparak en net analizi alabilirsiniz.</p>
        </div>

        <div style={{ 
          backgroundColor: 'rgba(255,255,255,0.01)', 
          padding: '20px', 
          borderRadius: '40px', 
          border: '1px solid rgba(255,255,255,0.05)' 
        }}>
          <PhotoGuideCards />
        </div>

        <div style={{ marginTop: '80px' }}>
          <CTA />
        </div>
      </div>
    </main>
  );
}