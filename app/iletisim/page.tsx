"use client";

export default function MesafeliSatisSozlesmesiPage() {
  return (
    <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', lineHeight: '1.6', color: '#333', fontFamily: 'sans-serif' }}>
      <h1 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>📄 Mesafeli Satış Sözleşmesi</h1>
      <p style={{ fontSize: '0.85rem', color: '#666' }}>Son Güncelleme: 17 Ocak 2026</p>

      <section style={{ marginTop: '20px' }}>
        <h3>1. Taraflar</h3>
        <p>
          <strong>SATICI:</strong><br />
          Unvan: Carvix Araç Analiz Teknolojileri<br />
          Adres: Sakarya, Adapazarı Merkez<br />
          E-posta: info@carvix.site<br />
          Telefon: 0533 523 99 54
        </p>
        <p>
          <strong>ALICI:</strong><br />
          www.carvix.site web sitesinden hizmet satın alan, ödeme formunda bilgileri yer alan kullanıcıdır.
        </p>
      </section>

      <section>
        <h3>2. Sözleşmenin Konusu</h3>
        <p>
          İşbu sözleşmenin konusu, Alıcı'nın Satıcı'ya ait web sitesi üzerinden elektronik ortamda siparişini verdiği "Yapay Zeka Destekli Araç Ön Analiz Raporu" hizmetinin satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri uyarınca tarafların hak ve yükümlülüklerinin belirlenmesidir.
        </p>
      </section>

      <section>
        <h3>3. Hizmet Bilgileri ve Ödeme</h3>
        <p>
          Hizmet Adı: AI Araç Analiz Paketi (Dijital Rapor)<br />
          Hizmet Bedeli: 129,90 TL (KDV Dahil)<br />
          Ödeme Yöntemi: Tami Sanal POS (Kredi Kartı / Banka Kartı)
        </p>
      </section>

      <section>
        <h3>4. Hizmetin Teslimi</h3>
        <p>
          Sözleşme konusu hizmet, dijital içerik niteliğindedir. Alıcı ödemeyi tamamladığı anda analiz süreci başlar ve rapor Alıcı'nın web tarayıcısı üzerinden anında erişimine sunulur. Fiziksel bir teslimat yapılmaz.
        </p>
      </section>

      <section style={{ backgroundColor: '#fef2f2', padding: '15px', borderRadius: '8px', border: '1px solid #fee2e2' }}>
        <h3>5. Cayma Hakkı ve İstisnalar</h3>
        <p>
          Mesafeli Sözleşmeler Yönetmeliği’nin 15. maddesi (ğ) bendi uyarınca; <strong>"Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmelerde"</strong> tüketicinin cayma hakkı bulunmamaktadır. Hizmet (analiz raporu) anında ifa edildiği için iade yapılamaz.
        </p>
      </section>

      <section>
        <h3>6. Genel Hükümler</h3>
        <ul>
          <li>Alıcı, hizmetin temel nitelikleri ve ödeme koşulları hakkında tüm ön bilgilendirmeleri okuduğunu ve onayladığını kabul eder.</li>
          <li>Satıcı, teknik aksaklıklar nedeniyle hizmetin sunulamaması durumunda alınan bedeli iade etmekle yükümlüdür.</li>
          <li>Sisteme yüklenen görsellerin kalitesinden ve doğruluğundan Alıcı sorumludur; düşük kaliteli görseller nedeniyle raporun doğruluğunun azalması Satıcı'nın sorumluluğunda değildir.</li>
        </ul>
      </section>

      <section>
        <h3>7. Yetkili Mahkeme</h3>
        <p>
          İşbu sözleşmeden doğan uyuşmazlıklarda, T.C. Ticaret Bakanlığı tarafından ilan edilen değere kadar Tüketici Hakem Heyetleri, bu değeri aşan durumlarda ise Satıcı'nın yerleşim yerindeki Tüketici Mahkemeleri yetkilidir.
        </p>
      </section>

      <p style={{ marginTop: '30px', fontWeight: 'bold', textAlign: 'center' }}>
        Ödeme işlemini tamamlayan her Alıcı, işbu sözleşme maddelerini kabul etmiş sayılır.
      </p>
    </div>
  );
}