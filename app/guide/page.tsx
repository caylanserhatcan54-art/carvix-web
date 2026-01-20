"use client";

import PhotoGuideCards from "@/components/marketing/PhotoGuideCards";
import CTA from "@/components/marketing/CTA";
import { PHOTO_GUIDE } from "@/lib/marketing";
import { 
  Camera, 
  Lightbulb, 
  CheckCircle2, 
  AlertCircle, 
  LayoutGrid, 
  ArrowLeft 
} from "lucide-react";
import Link from "next/link";

export default function GuidePage() {
  return (
    <main style={{ backgroundColor: '#050505', minHeight: '100vh', padding: '60px 20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Geri Dönüş ve Üst Navigasyon */}
        <Link href="/pricing" style={{ 
          display: "inline-flex", 
          alignItems: "center", 
          gap: "8px", 
          color: "#71717a", 
          textDecoration: "none",
          fontSize: "14px",
          marginBottom: "30px",
          fontWeight: "500"
        }}>
          <ArrowLeft size={16} /> Geri Dön
        </Link>

        {/* Başlık Bölümü */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: '#3b82f6', 
            background: 'rgba(59,130,246,0.08)',
            padding: '8px 20px',
            borderRadius: '100px',
            border: '1px solid rgba(59,130,246,0.2)',
            fontSize: '13px',
            fontWeight: '700',
            marginBottom: '20px'
          }}>
            <Camera size={14} />
            <span>AI FOTOĞRAF REHBERİ</span>
          </div>
          
          <h1 style={{ 
            color: '#ffffff', 
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', 
            fontWeight: '900', 
            letterSpacing: '-2px',
            lineHeight: '1.1',
            marginBottom: '20px'
          }}>
            Kusursuz Analiz İçin <br />
            <span style={{ color: '#3b82f6' }}>Doğru Fotoğraflama</span>
          </h1>
          
          <p style={{ 
            color: '#a1a1aa', 
            fontSize: '1.1rem', 
            maxWidth: '600px', 
            lineHeight: '1.6'
          }}>
            {PHOTO_GUIDE.intro} Yapay zekamızın en doğru sonucu vermesi için aşağıdaki kuralları takip edin.
          </p>
        </div>

        {/* Bilgi Kartları Grubu */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '24px',
          marginBottom: '60px'
        }}>
          
          {/* Altın Kurallar Kartı */}
          <div style={{ 
            backgroundColor: '#0f0f0f', 
            padding: '35px', 
            borderRadius: '32px', 
            border: '1px solid #1a1a1a',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, padding: '20px', opacity: 0.05 }}>
              <CheckCircle2 size={100} color="#fff" />
            </div>
            
            <h3 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: '800', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={24} color="#22c55e" /> Altın Kurallar
            </h3>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '16px' }}>
              {PHOTO_GUIDE.rules.map((r) => (
                <li key={r} style={{ display: 'flex', gap: '12px', color: '#d4d4d8', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  <span style={{ color: '#22c55e', fontWeight: 'bold' }}>•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hızlı İpuçları Kartı */}
          <div style={{ 
            background: 'linear-gradient(145deg, #0f0f0f 0%, #0a0a0a 100%)', 
            padding: '35px', 
            borderRadius: '32px', 
            border: '1px solid #1a1a1a'
          }}>
            <h3 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: '800', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lightbulb size={24} color="#eab308" /> Profesyonel İpucu
            </h3>
            
            <div style={{ color: '#d4d4d8', fontSize: '0.95rem', lineHeight: '1.7' }}>
              <p style={{ marginBottom: '20px' }}>
                Boya analizi için <strong>en az 2 paneli</strong> aynı karede çekin. Bu, yapay zekanın doku ve ton farkını kıyaslamasını sağlar.
              </p>
              
              <div style={{ 
                backgroundColor: 'rgba(59,130,246,0.05)', 
                padding: '20px', 
                borderRadius: '20px', 
                border: '1px dashed rgba(59,130,246,0.2)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <span style={{ fontSize: '12px', color: '#3b82f6', fontWeight: '700', letterSpacing: '1px' }}>ÖRNEK YÜKLEME</span>
                <code style={{ color: '#fff', fontSize: '13px', fontFamily: 'monospace' }}>
                  SOL_ON_KAPI + SAG_ON_KAPI + MENTESE
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Örnek Kartlar Başlığı */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
           <h2 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: '800', marginBottom: '10px' }}>Görsel Referanslar</h2>
           <p style={{ color: '#71717a' }}>Sisteme yüklemeniz gereken ideal açılar aşağıda belirtilmiştir.</p>
        </div>

        {/* PhotoGuideCards Bileşeni */}
        <div style={{ 
          backgroundColor: 'rgba(255,255,255,0.02)', 
          padding: '40px', 
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