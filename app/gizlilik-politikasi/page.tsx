"use client";

import { ShieldCheck, Lock, EyeOff, FileText } from "lucide-react";

export default function GizlilikPolitikasiPage() {
  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', padding: '60px 20px' }}>
      <div style={{ 
        maxWidth: '850px', 
        margin: '0 auto', 
        lineHeight: '1.8', 
        color: '#e4e4e7', 
        fontFamily: 'sans-serif' 
      }}>
        
        {/* Başlık Bölümü */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#3b82f6', marginBottom: '15px' }}>
            <ShieldCheck size={24} />
            <span style={{ fontWeight: '700', letterSpacing: '1px', fontSize: '14px' }}>GÜVENLİ ALTYAPI</span>
          </div>
          <h1 style={{ 
            color: '#ffffff', 
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
            fontWeight: '900',
            margin: 0
          }}>
            Gizlilik Politikası ve KVKK
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#71717a', marginTop: '10px' }}>
            Yürürlük Tarihi: 19 Ocak 2026
          </p>
        </div>

        {/* Veri Sorumlusu Kartı */}
        <section style={{ 
          marginBottom: '40px', 
          padding: '30px', 
          backgroundColor: '#111', 
          borderRadius: '24px', 
          border: '1px solid #222' 
        }}>
          <h3 style={{ marginTop: 0, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={20} color="#3b82f6" /> 1. Veri Sorumlusu Bilgileri
          </h3>
          <p style={{ color: '#a1a1aa', fontSize: '15px' }}>
            6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, veri sorumlusu sıfatıyla bilgilerimiz aşağıdadır:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div>
              <small style={{ color: '#52525b', display: 'block', textTransform: 'uppercase' }}>Yasal Ünvan</small>
              <strong style={{ color: '#fff' }}>Serhat Can Çaylan</strong>
            </div>
            <div>
              <small style={{ color: '#52525b', display: 'block', textTransform: 'uppercase' }}>İletişim</small>
              <strong style={{ color: '#fff' }}>info@carvix.site</strong>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <small style={{ color: '#52525b', display: 'block', textTransform: 'uppercase' }}>Adres</small>
              <strong style={{ color: '#fff' }}>Çayiçi Mah. Toker Sk. No: 16 Sapanca / SAKARYA</strong>
            </div>
          </div>
        </section>

        {/* Ana Metin Bölümleri */}
        <div style={{ display: 'grid', gap: '40px' }}>
          
          <section>
            <h3 style={{ color: '#fff' }}>2. Hangi Verileri İşliyoruz?</h3>
            <p>Hizmetimizi kullanırken sağladığınız şu veriler işlenmektedir:</p>
            <ul style={{ color: '#a1a1aa' }}>
              <li><strong>Görsel Veriler:</strong> Analiz edilmek üzere sisteme yüklenen araç fotoğrafları.</li>
              <li><strong>İletişim Verileri:</strong> Raporun gönderilmesi için kullanılan e-posta adresi.</li>
              <li><strong>Teknik Veriler:</strong> IP adresi, çerezler (cookies) ve kullanım istatistikleri.</li>
            </ul>
          </section>

          <section style={{ padding: '25px', borderLeft: '4px solid #3b82f6', backgroundColor: 'rgba(59,130,246,0.05)' }}>
            <h3 style={{ color: '#fff', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lock size={20} color="#3b82f6" /> 3. Ödeme Güvenliği Hakkında
            </h3>
            <p style={{ margin: 0 }}>
              Ödeme işlemleriniz yüksek güvenlikli <strong>İşyerimpos / Garanti BBVA</strong> altyapısı üzerinden gerçekleştirilir. 
              Kredi kartı veya banka kartı bilgileriniz 256-bit SSL sertifikası ile doğrudan ödeme kuruluşuna iletilir. 
              <strong> Kart bilgileriniz Carvix sunucularında asla tutulmaz ve işlenmez.</strong>
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff' }}>4. Verilerin Üçüncü Şahıslarla Paylaşımı</h3>
            <p>
              Kişisel verileriniz, yasal zorunluluklar haricinde asla üçüncü şahıslara satılmaz veya ticari amaçla paylaşılmaz. 
              Sadece hizmetin ifası için gerekli olan (Örn: Ödeme kuruluşu, faturalandırma sistemleri) iş ortaklarımızla sınırlı olarak paylaşılmaktadır.
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff' }}>5. Haklarınız (KVKK Madde 11)</h3>
            <p>
              Dilediğiniz zaman <strong>info@carvix.site</strong> adresine yazarak; verilerinizin işlenip işlenmediğini öğrenme, 
              eksik/yanlış verilerin düzeltilmesini isteme ve verilerinizin silinmesini talep etme hakkına sahipsiniz.
            </p>
          </section>

        </div>

        {/* Alt Bilgi */}
        <footer style={{ 
          marginTop: '80px', 
          paddingTop: '40px', 
          borderTop: '1px solid #27272a', 
          fontSize: '0.85rem', 
          color: '#52525b',
          textAlign: 'center'
        }}>
          <p>Bu politika, www.carvix.site kullanıcılarının şeffaf bir şekilde bilgilendirilmesi amacıyla hazırlanmıştır.</p>
          <p>© 2026 Carvix - Serhat Can Çaylan. Tüm Hakları Saklıdır.</p>
        </footer>
      </div>
    </div>
  );
}