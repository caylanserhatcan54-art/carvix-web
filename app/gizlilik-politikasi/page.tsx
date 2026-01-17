"use client";

export default function GizlilikPolitikasiPage() {
  return (
    <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', lineHeight: '1.7', color: '#333', fontFamily: 'sans-serif' }}>
      <h1 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>🔒 Gizlilik Politikası ve KVKK Aydınlatma Metni</h1>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '30px' }}>Son Güncelleme: 17 Ocak 2026</p>

      <section>
        <p>
          <strong>Carvix</strong> ("Şirket" veya "Veri Sorumlusu") olarak, <strong>www.carvix.site</strong> adresi üzerinden sunduğumuz yapay zeka tabanlı araç analiz hizmetleri kapsamında kullanıcılarımızın kişisel verilerinin korunmasına ve güvenliğine en üst düzeyde önem veriyoruz. 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca kişisel verilerinizi aşağıda açıklanan kapsamda ve yasal çerçevede işliyoruz.
        </p>
      </section>

      <section style={{ marginTop: '25px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>1. Veri Sorumlusu Bilgileri</h3>
        <p style={{ marginBottom: 0 }}>
          <strong>Ünvan / Ad Soyad:</strong> Carvix Araç Analiz Sistemleri<br />
          <strong>Adres:</strong> Sakarya / Adapazarı / Merkez<br />
          <strong>E-posta:</strong> info@carvix.site<br />
          <strong>Web:</strong> www.carvix.site
        </p>
      </section>

      <h3>2. İşlenen Kişisel Verileriniz</h3>
      <p>Hizmetlerimizden yararlanırken aşağıdaki verileriniz işlenmektedir:</p>
      <ul>
        <li><strong>Kimlik ve İletişim:</strong> E-posta adresi ve ödeme doğrulaması (Masterpass) için telefon numarası.</li>
        <li><strong>Görsel Veriler:</strong> Analiz edilmek üzere sisteme yüklediğiniz araç fotoğrafları ve video kayıtları.</li>
        <li><strong>İşlem Güvenliği:</strong> IP adresi bilgileri, internet sitesi giriş-çıkış kayıtları ve cihaz bilgileri.</li>
        <li><strong>Ödeme Verileri:</strong> Ödeme işlemleri doğrudan <strong>Tami Sanal POS</strong> altyapısı üzerinden şifrelenmiş olarak gerçekleşir; kart bilgileriniz sunucularımızda asla tutulmaz ve saklanmaz.</li>
      </ul>

      <h3>3. Verilerin İşlenme Amacı</h3>
      <p>
        Kişisel verileriniz; hizmetin kusursuz sunulması, yapay zeka algoritmalarımız ile araç analiz raporlarının oluşturulması, faturalandırma süreçlerinin yönetilmesi ve 5651 sayılı kanun kapsamındaki yasal yükümlülüklerin yerine getirilmesi amacıyla işlenmektedir.
      </p>

      <h3>4. Verilerin Aktarılması ve Saklanması</h3>
      <p>
        Kişisel verileriniz, yalnızca hizmetin ifası için zorunlu olan iş ortaklarımıza (Ödeme kuruluşu Tami gibi) ve yasal zorunluluk hallerinde yetkili kamu kurumlarına (talep halinde) aktarılabilir. Verileriniz, yasal süreler ve hizmet gereklilikleri sona erene kadar güvenli sunucularımızda şifrelenmiş olarak muhafaza edilir.
      </p>

      <h3>5. Kullanıcı Hakları (KVKK Madde 11)</h3>
      <p>
        KVKK uyarınca herkes, veri sorumlusuna başvurarak kendisiyle ilgili; verilerinin işlenip işlenmediğini öğrenme, yanlış işlenmişse düzeltilmesini isteme, verilerin silinmesini veya yok edilmesini talep etme haklarına sahiptir. Bu taleplerinizi <strong>info@carvix.site</strong> adresine yazılı olarak iletebilirsiniz.
      </p>

      <footer style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee', fontSize: '0.9rem', color: '#888' }}>
        <p>Bu politika metni, Carvix kullanıcılarını şeffaf bir şekilde bilgilendirmek amacıyla hazırlanmıştır.</p>
      </footer>
    </div>
  );
}