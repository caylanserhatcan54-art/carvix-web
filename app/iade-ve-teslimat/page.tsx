"use client";

import { PackageCheck, RotateCcw, AlertTriangle, MessageSquare, CreditCard, ShieldCheck } from "lucide-react";

export default function IadeVeTeslimatPage() {
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
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#ef4444', marginBottom: '15px' }}>
            <RotateCcw size={20} />
            <span style={{ fontWeight: '700', letterSpacing: '1px', fontSize: '13px' }}>POLİTİKALARIMIZ</span>
          </div>
          <h1 style={{ 
            color: '#ffffff', 
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', 
            fontWeight: '900', 
            letterSpacing: '-1px',
            margin: 0
          }}>
            İptal, İade ve Teslimat
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#71717a', marginTop: '10px' }}>
            Son Güncelleme: 19 Ocak 2026
          </p>
        </div>

        {/* Giriş Notu */}
        <section style={{ marginBottom: '40px', padding: '20px', backgroundColor: '#111', borderRadius: '16px', border: '1px solid #222' }}>
          <p style={{ margin: 0, fontSize: '0.95rem' }}>
            <strong style={{ color: '#fff' }}>Serhat Can Çaylan (Carvix)</strong> üzerinden satın alınan dijital hizmetler, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği kapsamında aşağıdaki şartlara tabidir.
          </p>
        </section>

        {/* 1. Teslimat */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ padding: '10px', backgroundColor: 'rgba(59,130,246,0.1)', borderRadius: '12px' }}>
              <PackageCheck size={24} color="#3b82f6" />
            </div>
            <h3 style={{ color: '#fff', margin: 0, fontSize: '1.4rem' }}>1. Dijital Teslimat Koşulları</h3>
          </div>
          <p style={{ color: '#a1a1aa' }}>
            Carvix tarafından sunulan hizmetler tamamen <strong>gayrimaddi (dijital)</strong> niteliktedir. 
            Ödeme işlemi başarılı olduğu anda sistemimiz fotoğraf analiz sürecini başlatır. 
            Oluşturulan rapor, web arayüzümüz üzerinden <strong>anında</strong> erişime açılır. 
            Herhangi bir fiziksel kargo veya kurye gönderimi söz konusu değildir.
          </p>
        </div>

        {/* 2. İptal ve İade - Kritik Bölüm */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ padding: '10px', backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '12px' }}>
              <RotateCcw size={24} color="#ef4444" />
            </div>
            <h3 style={{ color: '#fff', margin: 0, fontSize: '1.4rem' }}>2. İptal ve İade Politikası</h3>
          </div>
          <p style={{ marginBottom: '20px' }}>
            Mesafeli Sözleşmeler Yönetmeliği’nin 15. maddesi 1. fıkrası (ğ) bendi uyarınca: 
            <em> "Elektronik ortamda anında ifa edilen hizmetler ve tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmeler"</em> 
            kapsamında <strong>cayma hakkı kullanılamaz.</strong>
          </p>
          
          <div style={{ 
            backgroundColor: 'rgba(239, 68, 68, 0.03)', 
            padding: '25px', 
            borderRadius: '24px', 
            border: '1px solid rgba(239, 68, 68, 0.1)' 
          }}>
            <h4 style={{ color: '#ef4444', marginTop: 0, fontSize: '1rem' }}>Önemli Notlar:</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#d1d1d6', fontSize: '0.95rem' }}>
              <li style={{ marginBottom: '10px' }}>Rapor üretimi anlık olarak başladığından, ödeme sonrası işlem iptali yapılamaz.</li>
              <li>Hatalı paket seçimi veya yanlış fotoğraf yüklenmesi durumunda sorumluluk kullanıcıya aittir.</li>
              <li>Ödeme sayfasında "Dijital teslimat şartlarını kabul ediyorum" onayı alınarak işlem tamamlanır.</li>
            </ul>
          </div>
        </div>

        {/* 3. Teknik Aksaklıklar ve İade Süreci */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ padding: '10px', backgroundColor: 'rgba(245,158,11,0.1)', borderRadius: '12px' }}>
              <AlertTriangle size={24} color="#f59e0b" />
            </div>
            <h3 style={{ color: '#fff', margin: 0, fontSize: '1.4rem' }}>3. Teknik Telafi ve Geri Ödeme</h3>
          </div>
          <p style={{ color: '#a1a1aa' }}>
            Sistemimizden kaynaklı teknik bir hata sebebiyle raporun oluşturulamaması durumunda:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div style={{ padding: '20px', background: '#111', borderRadius: '16px', border: '1px solid #222' }}>
              <h5 style={{ color: '#fff', margin: '0 0 10px 0' }}>Telafi Hizmeti</h5>
              <p style={{ fontSize: '0.85rem', color: '#71717a', margin: 0 }}>Raporun manuel olarak hazırlanıp tarafınıza e-posta ile iletilmesi önceliğimizdir.</p>
            </div>
            <div style={{ padding: '20px', background: '#111', borderRadius: '16px', border: '1px solid #222' }}>
              <h5 style={{ color: '#fff', margin: '0 0 10px 0' }}>Ücret İadesi</h5>
              <p style={{ fontSize: '0.85rem', color: '#71717a', margin: 0 }}>Telafinin mümkün olmadığı durumlarda <strong>İşyerimpos</strong> üzerinden kartınıza tam iade sağlanır.</p>
            </div>
          </div>
        </div>

        {/* Alt Destek Kartı */}
        <div style={{ 
          marginTop: '60px', 
          padding: '40px', 
          backgroundColor: '#fff', 
          borderRadius: '32px', 
          textAlign: 'center',
          color: '#000'
        }}>
          <MessageSquare size={32} color="#3b82f6" style={{ marginBottom: '20px', margin: '0 auto 15px' }} />
          <h3 style={{ margin: '0 0 10px 0', fontSize: '1.5rem', fontWeight: '800' }}>Destek Hattı</h3>
          <p style={{ fontSize: '1rem', marginBottom: '20px', opacity: 0.8 }}>
            İade talepleri veya teknik sorunlar için 7/24 bize ulaşabilirsiniz.
          </p>
          <a href="mailto:info@carvix.site" style={{ 
            color: '#3b82f6', 
            textDecoration: 'none', 
            fontWeight: '900', 
            fontSize: '1.2rem',
            borderBottom: '2px solid #3b82f6'
          }}>
            info@carvix.site
          </a>
          <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', gap: '20px', opacity: 0.6 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}><CreditCard size={14}/> Güvenli İade Altyapısı</div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}><ShieldCheck size={14}/> 256-bit SSL</div>
          </div>
        </div>

        <footer style={{ 
          marginTop: '60px', 
          paddingTop: '30px', 
          borderTop: '1px solid #18181b', 
          fontSize: '0.8rem', 
          color: '#52525b',
          textAlign: 'center'
        }}>
          <p>© 2026 Serhat Can Çaylan - Tüm Hakları Saklıdır.</p>
          <p>Çayiçi Mah. Toker Sk. No: 16 Sapanca / SAKARYA</p>
        </footer>
      </div>
    </div>
  );
}