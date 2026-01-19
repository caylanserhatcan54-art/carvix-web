"use client";

export default function MesafeliSatisSozlesmesiPage() {
  return (
    <div className="container" style={{ 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '40px 20px', 
      lineHeight: '1.6', 
      color: '#e4e4e7', // Diğer sayfalarınla uyumlu olması için koyu tema rengine çektim
      backgroundColor: '#050505',
      fontFamily: 'sans-serif',
      minHeight: '100vh'
    }}>
      <h1 style={{ borderBottom: '2px solid #27272a', paddingBottom: '10px', color: '#fff' }}>📄 Mesafeli Satış Sözleşmesi</h1>
      <p style={{ fontSize: '0.85rem', color: '#71717a' }}>Son Güncelleme: 19 Ocak 2026</p>

      <section style={{ marginTop: '20px' }}>
        <h3 style={{ color: '#fff' }}>1. Taraflar</h3>
        <p>
          <strong style={{ color: '#fff' }}>SATICI:</strong><br />
          Unvan: Serhat Can Çaylan<br />
          Adres: Çayiçi Mah. Toker Sk. No: 16 İç Kapı No: 1 Sapanca / SAKARYA<br />
          E-posta: info@carvix.site<br />
          Telefon: 0533 523 99 54
        </p>
        <p>
          <strong style={{ color: '#fff' }}>ALICI:</strong><br />
          www.carvix.site web sitesinden hizmet satın alan, ödeme formunda bilgileri yer alan kullanıcıdır.
        </p>
      </section>

      <section>
        <h3 style={{ color: '#fff' }}>2. Sözleşmenin Konusu</h3>
        <p>
          İşbu sözleşmenin konusu, Alıcı'nın Satıcı'ya ait web sitesi üzerinden elektronik ortamda siparişini verdiği "Yapay Zeka Destekli Araç Analiz Raporu" hizmetinin satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri uyarınca tarafların hak ve yükümlülüklerinin belirlenmesidir.
        </p>
      </section>

      <section>
        <h3 style={{ color: '#fff' }}>3. Hizmet Bilgileri ve Ödeme</h3>
        <p>
          <strong style={{ color: '#fff' }}>Hizmet Adı:</strong> AI Araç Analiz Paketi (Dijital Rapor)<br />
          <strong style={{ color: '#fff' }}>Ödeme Yöntemi:</strong> İşyerimpos Güvenli Ödeme Sistemi (Kredi Kartı / Banka Kartı)
        </p>
      </section>

      <section>
        <h3 style={{ color: '#fff' }}>4. Hizmetin Teslimi</h3>
        <p>
          Sözleşme konusu hizmet, dijital içerik niteliğindedir. Alıcı ödemeyi tamamladığı anda analiz süreci başlar ve rapor Alıcı'nın web tarayıcısı üzerinden anında erişimine sunulur. Hizmetin doğası gereği fiziksel bir kargo teslimatı yapılmaz.
        </p>
      </section>

      <section style={{ backgroundColor: '#18181b', padding: '20px', borderRadius: '12px', border: '1px solid #27272a', marginTop: '20px' }}>
        <h3 style={{ color: '#ef4444' }}>5. Cayma Hakkı ve İstisnalar</h3>
        <p>
          Mesafeli Sözleşmeler Yönetmeliği’nin 15. maddesi (ğ) bendi uyarınca; <strong>"Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmelerde"</strong> tüketicinin cayma hakkı bulunmamaktadır. Raporun oluşturulup sunulmasıyla hizmet anında ifa edilmiş sayıldığından ücret iadesi yapılamaz.
        </p>
      </section>

      <section style={{ marginTop: '20px' }}>
        <h3 style={{ color: '#fff' }}>6. Genel Hükümler</h3>
        <ul style={{ color: '#a1a1aa' }}>
          <li style={{ marginBottom: '8px' }}>Alıcı, hizmetin temel nitelikleri ve ödeme koşulları hakkında tüm ön bilgilendirmeleri okuduğunu ve onayladığını kabul eder.</li>
          <li style={{ marginBottom: '8px' }}>Satıcı, sistem kaynaklı teknik aksaklıklar nedeniyle hizmetin sunulamaması durumunda alınan bedeli İşyerimpos aracılığıyla iade etmekle yükümlüdür.</li>
          <li>Sisteme yüklenen görsellerin netliği ve doğruluğundan Alıcı sorumludur.</li>
        </ul>
      </section>

      <section>
        <h3 style={{ color: '#fff' }}>7. Yetkili Mahkeme</h3>
        <p>
          İşbu sözleşmeden doğan uyuşmazlıklarda, T.C. Ticaret Bakanlığı tarafından ilan edilen değere kadar Tüketici Hakem Heyetleri, bu değeri aşan durumlarda ise Sakarya Tüketici Mahkemeleri yetkilidir.
        </p>
      </section>

      <p style={{ marginTop: '40px', fontWeight: 'bold', textAlign: 'center', color: '#3b82f6', borderTop: '1px solid #27272a', paddingTop: '20px' }}>
        Ödeme işlemini tamamlayan her Alıcı, işbu sözleşme maddelerini kabul etmiş sayılır.
      </p>
    </div>
  );
}