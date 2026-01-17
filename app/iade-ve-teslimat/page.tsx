"use client";

export default function IadeVeTeslimatPage() {
  return (
    <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', lineHeight: '1.7', color: '#333', fontFamily: 'sans-serif' }}>
      <h1 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>📦 İptal, İade ve Teslimat Koşulları</h1>
      
      <p style={{ marginTop: '20px' }}>
        Carvix üzerinden satın alınan dijital hizmetlerin (AI Araç Analiz Raporu) teslimat ve iade süreçleri, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümlerine tabidir.
      </p>

      <h3>1. Teslimat Koşulları</h3>
      <p>
        Carvix tarafından sunulan hizmetler tamamen dijitaldir. Kullanıcı, gerekli araç görsellerini yükleyip ödeme işlemini Tami Sanal POS altyapısı üzerinden başarıyla tamamladığı anda, analiz süreci başlar. Oluşturulan rapor, kullanıcıya web sitesi üzerinden <strong>anında (elektronik ortamda)</strong> sunulur. Fiziksel bir kargo gönderimi söz konusu değildir.
      </p>

      <h3>2. İptal ve İade Politikası (Cayma Hakkı İstisnası)</h3>
      <p>
        Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesinin (ğ) bendi uyarınca; <strong>"Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmelerde"</strong> tüketicinin cayma hakkı bulunmamaktadır.
      </p>
      <ul style={{ backgroundColor: '#fff5f5', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #f87171' }}>
        <li>Satın alınan analiz raporu kişiye özel olarak anında oluşturulduğu ve sunulduğu için, ödeme onayından sonra işlemin iptali veya ücret iadesi mümkün değildir.</li>
        <li>Kullanıcı, ödeme yapmadan önce bu koşulu kabul etmiş sayılır.</li>
      </ul>

      <h3>3. Teknik Aksaklıklar ve Hatalı İşlemler</h3>
      <p>
        Sistem kaynaklı bir teknik hata nedeniyle raporun oluşturulamaması veya görsellerin işlenememesi durumunda, kullanıcının hakkı saklıdır. Bu gibi durumlarda:
      </p>
      <ul>
        <li>Hata incelenir ve mümkünse hizmetin yeniden ifası sağlanır.</li>
        <li>Hizmetin teknik olarak sunulamadığı kesinleşirse, ödenen tutar Tami aracılığıyla kullanıcının kartına iade edilir. İadenin karta yansıma süresi bankalara göre 2-7 iş günü arasında değişebilir.</li>
      </ul>

      <h3>4. Uyuşmazlıkların Çözümü</h3>
      <p>
        Her türlü şikayet ve destek talebiniz için öncelikle <strong>info@carvix.site</strong> adresi üzerinden bizimle iletişime geçmeniz rica olunur. Talepleriniz 24 saat içerisinde titizlikle incelenerek tarafınıza geri dönüş sağlanacaktır.
      </p>

      <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee', fontSize: '0.85rem', color: '#666' }}>
        <p>Tüketiciler, şikayet ve itirazları konusundaki başvurularını T.C. Ticaret Bakanlığı bünyesindeki Tüketici Hakem Heyetlerine veya Tüketici Mahkemelerine yapabilirler.</p>
      </div>
    </div>
  );
}