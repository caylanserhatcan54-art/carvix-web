"use client";

export default function PhotoGuidePage() {
  const DO = [
    { title: "Gün ışığı / sabit ışık", desc: "Gölgeli ama aydınlık alan. Flaş kapalı." },
    { title: "Paneli doldur", desc: "Kapı/çamurluk/kaput kadrajın çoğunu kaplasın." },
    { title: "45° açı + düz açı", desc: "Yansıma ve doku için 2 açı çok güçlendirir." },
    { title: "Vida/menteşe yakın plan", desc: "Sök–tak şüphesi için kritik." },
  ];

  const DONT = [
    { title: "Gece / flaş patlatma", desc: "Parlaklık sahte fark üretir, yanılma artar." },
    { title: "Uzak / geniş kadraj", desc: "Panel detayı kaybolur, rapor zayıflar." },
    { title: "Aşırı yansıma", desc: "Direkt güneş / spot ışık kanıtı bozar." },
    { title: "Bulanık / hareket", desc: "Keskinlik kaybı yanlış pozitif yapar." },
  ];

  return (
    <main className="section">
      <div className="container">
        <div className="glass fadeIn" style={{ padding: 26 }}>
          <h1 className="h2">Fotoğraf Rehberi</h1>
          <p className="p" style={{ marginTop: 10 }}>
            Carvix en iyi sonucu <b>parça bazlı, net ve karşılaştırılabilir</b> fotoğraflarla verir.
            Aşağıdaki kurallara uyarsan rapor güveni gözle görülür biçimde artar.
          </p>

          <div className="guideGrid">
            <div className="guideCol">
              <div className="guideTitle">Doğru</div>
              {DO.map((x) => (
                <div key={x.title} className="guideCard ok hoverLift">
                  <div className="guideCardTitle">{x.title}</div>
                  <div className="small">{x.desc}</div>
                </div>
              ))}
            </div>

            <div className="guideCol">
              <div className="guideTitle">Yanlış</div>
              {DONT.map((x) => (
                <div key={x.title} className="guideCard bad hoverLift">
                  <div className="guideCardTitle">{x.title}</div>
                  <div className="small">{x.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="divider" />

          <div className="glass" style={{ padding: 18 }}>
            <div style={{ fontWeight: 900, fontSize: 16 }}>
              Önerilen Minimum Set
            </div>
            <div className="small" style={{ marginTop: 8 }}>
              Kaput • Bagaj • Sol/sağ ön kapı • Sol/sağ arka kapı <br />
              + (mümkünse) menteşe / vida / direk yakın plan.  
              <b>Detaylı pakette bu yakın planlar fark yaratır.</b>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
