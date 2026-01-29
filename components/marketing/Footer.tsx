import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#000', color: 'rgba(255,255,255,0.7)', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '80px', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* LOGO, İSİM VE SOSYAL MEDYA */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/carvix-logo.png" alt="Carvix" style={{ height: '20px', width: 'auto' }} />
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>Carvix</span>
          </div>

          {/* SOSYAL MEDYA İKONLARI */}
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <a href="https://www.instagram.com/carvix2026/" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.8, transition: '0.3s' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" style={{ height: '20px', width: '20px' }} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61586856612270" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.8, transition: '0.3s' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook" style={{ height: '20px', width: '20px' }} />
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '30px' }}>
          
          {/* LİNKLER */}
          <nav>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 40px', fontSize: '13px' }}>
              <li><Link href="/hakkimizda" style={{ color: 'inherit', textDecoration: 'none' }}>Hakkımızda</Link></li>
              <li><Link href="/gizlilik-politikasi" style={{ color: 'inherit', textDecoration: 'none' }}>Gizlilik Politikası</Link></li>
              <li><Link href="/mesafeli-satis-sozlesmesi" style={{ color: 'inherit', textDecoration: 'none' }}>Mesafeli Satış Sözleşmesi</Link></li>
              <li><Link href="/iade-ve-teslimat" style={{ color: 'inherit', textDecoration: 'none' }}>İade & Teslimat</Link></li>
              <li><Link href="/iletisim" style={{ color: 'inherit', textDecoration: 'none' }}>İletişim</Link></li>
            </ul>
          </nav>

          {/* SAĞ TARAF: ÖDEME BANDI */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              
              {/* SHOPIER ORİJİNAL RENKLİ LOGO */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: '#7000FF', // Shopier Moru
                padding: '4px 10px', 
                borderRadius: '6px',
                boxShadow: '0 0 15px rgba(112, 0, 255, 0.3)'
              }}>
                <span style={{ color: '#fff', fontSize: '11px', fontWeight: '900', fontFamily: 'sans-serif', letterSpacing: '-0.3px' }}>shopier</span>
              </div>

              {/* Güvenlik Sertifikası */}
              <div style={{ border: '1px solid rgba(255,255,255,0.2)', padding: '3px 6px', borderRadius: '4px' }}>
                <span style={{ fontSize: '9px', fontWeight: 'bold', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>PCI-DSS</span>
              </div>
              
              {/* Visa */}
              <img src="/visa-logo.svg" alt="Visa" style={{ height: '10px', opacity: 0.8 }} />
              
              {/* Mastercard */}
              <img src="/mastercard-logo.svg" alt="Mastercard" style={{ height: '16px', opacity: 0.8 }} />
              
              {/* Masterpass */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.8 }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EB001B', marginRight: '-4px' }}></div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F79E1B' }}></div>
                </div>
                <span style={{ fontSize: '10px', color: '#fff', fontWeight: '600' }}>masterpass</span>
              </div>

            </div>
            
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
              Shopier Güvencesiyle 256-bit SSL Koruma
            </p>
          </div>
        </div>

        {/* TELİF */}
        <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
          © 2026 Carvix — Yapay Zeka Analiz Hizmetleri. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}