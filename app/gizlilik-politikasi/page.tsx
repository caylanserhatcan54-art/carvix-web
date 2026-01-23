"use client";

import { ShieldCheck, Lock, EyeOff, FileText, UserCheck } from "lucide-react";

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
            Yürürlük Tarihi: 23 Ocak 2026
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
              <small style={{ color: '#52525b', display: 'block', textTransform: 'uppercase' }}>Kurumsal Ünvan</small>
              <strong style={{ color: '#fff' }}>Carvix — Yapay Zeka Analiz Hizmetleri</strong>
            </div>
            <div>
              <small style={{ color: '#52525b', display: 'block', textTransform: 'uppercase' }}>İletişim</small>
              <strong style={{ color: '#fff' }}>info@carvix.site</strong>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <small style={{ color: '#52525b', display: 'block', textTransform: 'uppercase' }}>Adres</small>
              <strong style={{ color: '#fff' }}>Adapazarı Merkez, Sakarya, Türkiye</strong>
            </div>
          </div>
        </section>

        {/* Ana Metin Bölümleri */}
        <div style={{ display: 'grid', gap: '40px' }}>
          
          <section>
            <h3 style={{ color: '#fff' }}>2. Hangi Verileri İşliyoruz?</h3>
            <p>Hizmetimizi kullanırken ve analiz yaptırırken sağladığınız şu veriler işlenmektedir:</p>
            <ul style={{ color: '#a1a1aa' }}>
              <li><strong>İletişim Bilgileri:</strong> Raporun gönderilmesi için paylaştığınız e-posta adresi.</li>
              <li><strong>Görsel Veriler:</strong> Analiz edilmek üzere sisteme yüklenen araç fotoğrafları.</li>
              <li><strong>İşlem Geçmişi:</strong> Satın aldığınız paket türü ve rapor sonuçlarınız.</li>
              <li><strong>Teknik Veriler:</strong> Güvenlik amacıyla IP adresi ve temel tarayıcı bilgileri.</li>
            </ul>
          </section>

          <section style={{ padding: '25px', borderLeft: '4px solid #3b82f6', backgroundColor: 'rgba(59,130,246,0.05)' }}>
            <h3 style={{ color: '#fff', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lock size={20} color="#3b82f6" /> 3. Ödeme Güvenliği
            </h3>
            <p style={{ marginBottom: '15px' }}>
              Ödeme işlemleriniz yüksek güvenlikli <strong>Shopier</strong> altyapısı üzerinden gerçekleştirilir. 
              <strong> Kart bilgileriniz Carvix sunucularında asla tutulmaz, işlenmez ve saklanmaz.</strong>
            </p>
            <p style={{ margin: 0 }}>
              Tüm ödeme süreci Shopier'ın 256-bit SSL korumalı ve PCI-DSS uyumlu güvenli sayfalarında tamamlanmaktadır.
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff' }}>4. Verilerin Üçüncü Şahıslarla Paylaşımı</h3>
            <p>
              Kişisel verileriniz, yasal zorunluluklar haricinde asla üçüncü şahıslara satılmaz veya ticari amaçla paylaşılmaz. 
              Verileriniz sadece analiz işleminin gerçekleştirilmesi (AI Worker sistemleri) ve ödemenin doğrulanması amacıyla ilgili iş ortaklarımızla sınırlı olarak paylaşılmaktadır.
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff' }}>5. Haklarınız (KVKK Madde 11)</h3>
            <p>
              Dilediğiniz zaman <strong>info@carvix.site</strong> adresine yazarak; verilerinizin sistemlerimizden silinmesini, 
              verilerinizin işlenip işlenmediğini öğrenmeyi veya hatalı verilerin düzeltilmesini talep etme hakkına sahipsiniz.
            </p>
          </section>

          <section style={{ backgroundColor: '#111', padding: '20px', borderRadius: '16px' }}>
            <h3 style={{ color: '#fff', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px' }}>
              <UserCheck size={18} color="#3b82f6" /> Veri Saklama Politikası
            </h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#a1a1aa' }}>
              Yüklediğiniz fotoğraflar analiz işlemi tamamlanıp rapor üretildikten sonra, kullanıcı talebi üzerine veya periyodik temizlik süreçlerinde sistemlerimizden kalıcı olarak silinmektedir. Yasal faturalandırma ve işlem kayıtları mevzuatın öngördüğü süre boyunca saklanır.
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
          <p>© 2026 Carvix — Yapay Zeka Analiz Hizmetleri. Tüm Hakları Saklıdır.</p>
        </footer>
      </div>
    </div>
  );
}