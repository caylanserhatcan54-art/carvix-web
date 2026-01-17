"use client";

export default function MesafeliSatisSozlesmesiPage() {
  return (
    <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', lineHeight: '1.6', color: '#333', fontFamily: 'sans-serif' }}>
      <h1 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>📄 Mesafeli Satış Sözleşmesi</h1>
      
      <p style={{ marginTop: '20px' }}>
        İşbu sözleşme, <strong>www.carvix.site</strong> (bundan sonra "WEB SİTESİ" olarak anılacaktır) üzerinden sunulan dijital hizmetlerin satışına ilişkin olarak, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri uyarınca düzenlenmiştir.
      </p>

      <section style={{ marginTop: '25px' }}>
        <h3 style={{ borderLeft: '4px solid #2563eb', paddingLeft: '10px' }}>1. Taraflar</h3>
        <p>
          <strong>SATICI:</strong><br />
          Unvan: Carvix Araç Analiz Teknolojileri<br />
          Adres: Sakarya, Adapazarı Merkez<br />
          E-posta: info@carvix.site<br />
          Telefon: 0533 523 99 54
        </p>
        <p>
          <strong>ALICI (Tüketici):</strong><br />
          WEB SİTESİ üzerinden dijital hizmet satın alan, ödeme sırasında iletişim bilgilerini beyan eden gerçek veya tüzel kişidir.
        </p>
      </section>

      <section>
        <h3 style={{ borderLeft: '4px solid #2563eb', paddingLeft: '10px' }}>2. Sözleşme Konusu Hizmet ve Ödeme</h3>
        <p>
          <strong>Hizmet Tanımı:</strong> Kullanıcı tarafından yüklenen araç verilerinin yapay zeka algoritmaları ile analiz edilerek bir dijital risk raporu oluşturulmasıdır.<br />
          <strong>Hizmet Bedeli:</strong> Ödeme sayfasında belirtilen ve Alıcı tarafından onaylanan tutardır.<br />
          <strong>Ödeme Altyapısı:</strong> Ödemeler, <strong>Tami Ödeme ve Elektronik Para Hizmetleri A.Ş.</strong> güvenli ödeme sistemleri üzerinden tahsil edilir.
        </p>
      </section>

      <section>
        <h3 style={{ borderLeft: '4px solid #2563eb', paddingLeft: '10px' }}>3. İfa ve Teslimat</h3>
        <p>
          Sözleşme konusu hizmet dijital bir içerik olup, ödeme onayı alındığı anda Alıcı'nın erişimine elektronik ortamda anında sunulur. Alıcı, bu aşamadan sonra hizmetin ifa edilmiş olduğunu kabul eder.
        </p>
      </section>

      <section style={{ backgroundColor: '#fff5f5', padding: '20px', borderRadius: '8px', border: '1px solid #fee2e2' }}>
        <h3 style={{ marginTop: 0 }}>4. Cayma Hakkı İstisnası</h3>
        <p>
          Mesafeli Sözleşmeler Yönetmeliği'nin 15/1-ğ maddesi uyarınca; <strong>"Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmelerde"</strong> cayma hakkı kullanılamaz. Alıcı, satın aldığı raporun kendisine sunulmasıyla birlikte cayma hakkını kaybedeceğini peşinen kabul eder.
        </p>
      </section>

      <section>
        <h3 style={{ borderLeft: '4px solid #2563eb', paddingLeft: '10px' }}>5. Genel Şartlar</h3>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Alıcı, sisteme yüklediği görsellerin doğruluğundan sorumludur.</li>
          <li>Sistem kaynaklı teknik hatalarda, Alıcı'nın ödediği tutar Satıcı tarafından 10 iş günü içerisinde iade edilir.</li>
          <li>İşbu sözleşme, Alıcı tarafından elektronik ortamda onaylandığı anda yürürlüğe girer.</li>
        </ul>
      </section>

      <p style={{ marginTop: '40px', fontSize: '13px', opacity: 0.6, textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '10px' }}>
        Son güncelleme: 17 Ocak 2026
      </p>
    </div>
  );
}