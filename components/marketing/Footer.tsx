import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#000', color: 'rgba(255,255,255,0.7)', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '80px', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* LOGO VE İSİM */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '30px' }}>
          <img src="/carvix-logo.png" alt="Carvix" style={{ height: '20px', width: 'auto' }} />
          <span style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>Carvix</span>
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
              
              {/* Tami Kutusu */}
              <div style={{ border: '1px solid #fff', padding: '2px 5px', borderRadius: '3px' }}>
                <span style={{ fontSize: '9px', fontWeight: '900', color: '#fff', letterSpacing: '1px' }}>TAMİ</span>
              </div>
              
              {/* Visa (Kendi klasöründen) */}
              <img src="/visa-logo.svg" alt="Visa" style={{ height: '10px', width: 'auto' }} />
              
              {/* Mastercard (Kendi klasöründen) */}
              <img src="/mastercard-logo.svg" alt="Mastercard" style={{ height: '16px', width: 'auto' }} />
              
              {/* Masterpass (Kırılmaması için Kodla Çizildi) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EB001B', marginRight: '-4px' }}></div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F79E1B', opacity: 0.9 }}></div>
                </div>
                <span style={{ fontSize: '11px', color: '#fff', fontWeight: '600', fontFamily: 'sans-serif' }}>masterpass</span>
              </div>

            </div>
            
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
              256-bit SSL Güvenli Ödeme Altyapısı
            </p>
          </div>
        </div>

        {/* TELİF */}
        <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>
          © 2026 Carvix — Yapay zeka destekli analiz hizmetidir.
        </div>
      </div>
    </footer>
  );
}