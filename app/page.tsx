export default function HomePage() {
  return (
    <>
      {/* NAV */}
      <div className="nav">
        <div className="container nav-inner">
          <div className="brand">Carvix</div>
          <a href="/start" className="btn btn-primary">
            Analizi Başlat →
          </a>
        </div>
      </div>

      {/* HERO */}
      <section className="section">
        <div className="container card" style={{ padding: 60 }}>
          <h1>Araç Alırken<br />Görünmeyeni Gör</h1>
          <p>
            İkinci el araç ilanındaki fotoğrafları yükleyin.  
            <b> Carvix</b>, boya, hasar ve şüpheli bölgeleri yapay zekâ ile analiz etsin.
          </p>

          <div style={{ marginTop: 30 }}>
            <a href="/start" className="btn btn-primary">
              Analizi Başlat – 129,90 TL
            </a>
          </div>
        </div>
      </section>

      {/* NASIL ÇALIŞIR */}
      <section className="section">
        <div className="container">
          <h2>Nasıl Çalışır?</h2>

          <div className="vehicle-grid">
            <div className="card" style={{ padding: 26 }}>
              <h3>1. Fotoğrafları Yükle</h3>
              <p>İlandaki veya satıcıdan aldığınız araç fotoğrafları</p>
            </div>
            <div className="card" style={{ padding: 26 }}>
              <h3>2. Yapay Zekâ Analizi</h3>
              <p>Boya, hasar ve değişen parça riskleri hesaplanır</p>
            </div>
            <div className="card" style={{ padding: 26 }}>
              <h3>3. Sonucu Gör</h3>
              <p>Risk skoru ve görsel işaretlemeler</p>
            </div>
          </div>
        </div>
      </section>

      {/* KİMLER */}
      <section className="section">
        <div className="container card" style={{ padding: 40 }}>
          <h2>Kimler İçin?</h2>
          <ul>
            <li>İkinci el araç alacaklar</li>
            <li>Aracı uzaktan incelemek isteyenler</li>
            <li>Muayene öncesi ön kontrol yapmak isteyenler</li>
            <li>Eş, dost veya aile aracı için</li>
          </ul>
        </div>
      </section>

      {/* SSS */}
      <section className="section">
        <div className="container card" style={{ padding: 40 }}>
          <h2>Sıkça Sorulan Sorular</h2>
          <p><b>Ekspertiz yerine geçer mi?</b> Hayır, ön analizdir.</p>
          <p><b>PDF alabilir miyim?</b> Hayır, anlık sonuç sunulur.</p>
          <p><b>Fotoğraf sayısı önemli mi?</b> Evet, ne kadar çok o kadar net.</p>
        </div>
      </section>
    </>
  );
}
