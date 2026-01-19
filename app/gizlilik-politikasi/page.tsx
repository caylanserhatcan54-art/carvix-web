"use client";

export default function GizlilikPolitikasiPage() {
  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', padding: '40px 20px' }}>
      <div className="container" style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        lineHeight: '1.8', 
        color: '#e4e4e7', 
        fontFamily: 'sans-serif' 
      }}>
        <h1 style={{ 
          color: '#ffffff', 
          borderBottom: '1px solid #27272a', 
          paddingBottom: '15px',
          fontSize: '2rem',
          fontWeight: '800'
        }}>
          🔒 Gizlilik Politikası ve KVKK
        </h1>
        
        <p style={{ fontSize: '0.85rem', color: '#71717a', marginBottom: '30px' }}>
          Son Güncelleme: 19 Ocak 2026
        </p>

        <section>
          <p style={{ fontSize: '1.1rem' }}>
            <strong style={{ color: '#fff' }}>Serhat Can Çaylan</strong> ("Veri Sorumlusu") olarak, 
            <span style={{ color: '#3b82f6' }}> www.carvix.site</span> üzerinden sunduğumuz yapay zeka analiz hizmetlerinde 
            verilerinizin güvenliğini en üst düzeyde tutuyoruz.
          </p>
        </section>

        <section style={{ 
          marginTop: '30px', 
          padding: '25px', 
          backgroundColor: '#18181b', 
          borderRadius: '16px', 
          border: '1px solid #27272a' 
        }}>
          <h3 style={{ marginTop: 0, color: '#fff' }}>1. Veri Sorumlusu Bilgileri</h3>
          <p style={{ marginBottom: 0, color: '#a1a1aa' }}>
            <strong style={{ color: '#fff' }}>Ünvan:</strong> Serhat Can Çaylan<br />
            <strong style={{ color: '#fff' }}>Adres:</strong> Çayiçi Mah. Toker Sk. No: 16 İç Kapı No: 1 Sapanca / SAKARYA<br />
            <strong style={{ color: '#fff' }}>E-posta:</strong> info@carvix.site
          </p>
        </section>

        <h3 style={{ color: '#fff', marginTop: '40px' }}>2. İşlenen Veriler</h3>
        <ul style={{ paddingLeft: '20px', color: '#a1a1aa' }}>
          <li style={{ marginBottom: '10px' }}>
            <strong style={{ color: '#fff' }}>Görsel Veriler:</strong> Analiz için yüklediğiniz araç fotoğrafları.
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong style={{ color: '#fff' }}>Ödeme Güvenliği:</strong> Ödemeler doğrudan <strong style={{ color: '#fff' }}>İşyerimpos</strong> altyapısı ile şifreli (SSL) olarak gerçekleşir. Kart bilgileriniz tarafımızca <u>asla</u> kaydedilmez veya saklanmaz.
          </li>
          <li>
            <strong style={{ color: '#fff' }}>İşlem Bilgisi:</strong> IP adresi, tarayıcı bilgileri ve sistem kullanım kayıtları.
          </li>
        </ul>

        <h3 style={{ color: '#fff', marginTop: '40px' }}>3. İşlenme Amacı</h3>
        <p>
          Verileriniz; yapay zeka raporlarının oluşturulması, ödeme işlemlerinin gerçekleştirilmesi, hizmet kalitesinin artırılması ve yasal faturalandırma süreçlerinin takibi amacıyla 6698 sayılı KVKK standartlarında işlenmektedir.
        </p>

        <h3 style={{ color: '#fff', marginTop: '40px' }}>4. Kullanıcı Hakları</h3>
        <p>
          KVKK Madde 11 uyarınca; verilerinizin silinmesini, düzeltilmesini veya işlenip işlenmediğini öğrenmeyi talep edebilirsiniz. Tüm talepleriniz için <span style={{ color: '#3b82f6' }}>info@carvix.site</span> adresi üzerinden bizimle iletişime geçebilirsiniz.
        </p>

        <footer style={{ 
          marginTop: '60px', 
          paddingTop: '30px', 
          borderTop: '1px solid #27272a', 
          fontSize: '0.85rem', 
          color: '#52525b',
          textAlign: 'center'
        }}>
          <p>© 2026 Serhat Can Çaylan. Tüm hakları saklıdır. Bu metin kullanıcıyı şeffaf bilgilendirme amaçlıdır.</p>
        </footer>
      </div>
    </div>
  );
}