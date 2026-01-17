"use client";

export default function HakkimizdaPage() {
  return (
    <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', lineHeight: '1.7', color: '#333', fontFamily: 'sans-serif' }}>
      <h1 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>🧾 Hakkımızda</h1>
      
      <section style={{ marginTop: '20px' }}>
        <p>
          <strong>Carvix</strong>, otomotiv sektöründe dijital dönüşümü yapay zeka teknolojileriyle birleştiren, Türkiye merkezli bir teknoloji platformudur. Temel misyonumuz, araç alım-satım süreçlerinde şeffaflığı artırmak ve kullanıcıların fiziksel ekspertiz öncesinde araçlar hakkında veri odaklı ön bilgi sahibi olmalarını sağlamaktır.
        </p>
      </section>

      <h3>Yapay Zeka Destekli Analiz Teknolojisi</h3>
      <p>
        Carvix, kullanıcılar tarafından yüklenen yüksek çözünürlüklü araç görsellerini ve teknik verileri gelişmiş bilgisayarlı görü (computer vision) algoritmalarıyla işler. Bu süreç sonucunda; parça bazlı ton farkları, panel uyumsuzlukları ve olası işlem izleri analiz edilerek kullanıcıya kapsamlı bir <strong>Dijital Ön Analiz Raporu</strong> sunulur.
      </p>

      <h3>Dijital Hizmet ve Hızlı Teslimat</h3>
      <p>
        Carvix bünyesinde sunulan tüm hizmetler <strong>%100 dijitaldir.</strong> Kullanıcılarımız, fiziksel bir sevkiyat beklemeden, ödeme işlemlerini takiben saniyeler içerisinde raporlarına web sitemiz üzerinden erişebilirler. Bu sayede zaman ve maliyet tasarrufu sağlayarak, riskli araçları yola çıkmadan filtreleme imkanına sahip olurlar.
      </p>

      <section style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
        <h4 style={{ marginTop: 0 }}>Önemli Bilgilendirme</h4>
        <p style={{ marginBottom: 0, fontSize: '0.95rem' }}>
          Carvix tarafından sunulan raporlar bir "Yapay Zeka Ön Değerlendirmesi" niteliğindedir ve yasal bir ekspertiz belgesi yerine geçmez. Hizmetimiz, son karar öncesi kullanıcıyı bilgilendirme ve risk analizi yapma amacını taşımaktadır.
        </p>
      </section>

      <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
        <p>
          <strong>Müşteri Desteği:</strong> <br />
          Sorularınız, iş birliği talepleriniz veya teknik destek için bize her zaman ulaşabilirsiniz:<br />
          📧 <strong>info@carvix.site</strong>
        </p>
      </div>
    </div>
  );
}