"use client";

import { Mail, MapPin, Phone, MessageCircle, Clock, ShieldCheck } from "lucide-react";

export default function IletisimPage() {
  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', padding: '60px 20px' }}>
      <div style={{ 
        maxWidth: '900px', 
        margin: '0 auto', 
        fontFamily: 'sans-serif',
        color: '#e4e4e7'
      }}>
        
        {/* Başlık Bölümü */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ 
            color: '#ffffff', 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            fontWeight: '900', 
            letterSpacing: '-1.5px',
            marginBottom: '10px'
          }}>
            Bizimle İletişime Geçin
          </h1>
          <p style={{ color: '#71717a', fontSize: '1.1rem' }}>
            Sorularınız, teknik destek talepleriniz veya iş birlikleri için yanınızdayız.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px' 
        }}>
          
          {/* Sol Kolon: İletişim Bilgileri */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ backgroundColor: '#111', padding: '25px', borderRadius: '24px', border: '1px solid #222' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <div style={{ backgroundColor: 'rgba(59,130,246,0.1)', padding: '10px', borderRadius: '12px' }}>
                  <Mail size={24} color="#3b82f6" />
                </div>
                <h3 style={{ color: '#fff', margin: 0 }}>E-Posta</h3>
              </div>
              <p style={{ color: '#a1a1aa', margin: '0 0 5px 0' }}>Resmi destek kanalımız:</p>
              <a href="mailto:info@carvix.site" style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.1rem' }}>
                info@carvix.site
              </a>
            </div>

            <div style={{ backgroundColor: '#111', padding: '25px', borderRadius: '24px', border: '1px solid #222' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <div style={{ backgroundColor: 'rgba(59,130,246,0.1)', padding: '10px', borderRadius: '12px' }}>
                  <MapPin size={24} color="#3b82f6" />
                </div>
                <h3 style={{ color: '#fff', margin: 0 }}>Adres</h3>
              </div>
              <p style={{ color: '#a1a1aa', lineHeight: '1.6', margin: 0 }}>
                Adapazarı Merkez<br />
                Sakarya, Türkiye
              </p>
            </div>

            <div style={{ backgroundColor: '#111', padding: '25px', borderRadius: '24px', border: '1px solid #222' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <div style={{ backgroundColor: 'rgba(59,130,246,0.1)', padding: '10px', borderRadius: '12px' }}>
                  <Phone size={24} color="#3b82f6" />
                </div>
                <h3 style={{ color: '#fff', margin: 0 }}>Telefon & WhatsApp</h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <a href="https://wa.me/905335239954" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.5rem' }}>🟢</span> 
                  <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>0533 523 99 54</span>
                </a>
              </div>
              <p style={{ color: '#52525b', fontSize: '0.8rem', marginTop: '5px' }}>Hızlı destek için WhatsApp üzerinden yazabilirsiniz.</p>
            </div>

          </div>

          {/* Sağ Kolon: Destek Bilgilendirmesi */}
          <div style={{ 
            backgroundColor: 'rgba(59, 130, 246, 0.03)', 
            padding: '40px', 
            borderRadius: '32px', 
            border: '1px solid rgba(59, 130, 246, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <MessageCircle size={48} color="#3b82f6" style={{ margin: '0 auto 20px' }} />
              <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '10px' }}>Hızlı Destek Hattı</h3>
              <p style={{ color: '#a1a1aa' }}>
                Analizlerinizle ilgili teknik bir sorun yaşıyorsanız WhatsApp veya E-posta üzerinden bize ulaşabilirsiniz.
              </p>
            </div>

            <div style={{ borderTop: '1px solid #222', paddingTop: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                <Clock size={18} color="#3b82f6" />
                <span style={{ fontSize: '0.9rem' }}>Ortalama Yanıt Süresi: <strong>2-4 Saat</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ShieldCheck size={18} color="#22c55e" />
                <span style={{ fontSize: '0.9rem' }}>Güvenli ve KVKK Uyumlu İletişim</span>
              </div>
            </div>
          </div>

        </div>

        {/* Alt Bilgi */}
        <footer style={{ 
          marginTop: '80px', 
          paddingTop: '40px', 
          borderTop: '1px solid #18181b', 
          textAlign: 'center',
          color: '#52525b',
          fontSize: '0.9rem'
        }}>
          <p>© 2026 Carvix — Yapay Zeka Analiz Hizmetleri. Tüm hakları saklıdır.</p>
        </footer>

      </div>
    </div>
  );
}