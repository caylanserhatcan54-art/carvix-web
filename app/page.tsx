export default function HomePage() {
  return (
    <main className="max-w-md mx-auto px-4 pb-24">

      {/* HERO */}
      <section className="pt-12 text-center">
        <h1 className="text-3xl font-extrabold leading-tight">
          Araç Alırken <br /> Görünmeyeni Gör
        </h1>

        <p className="text-gray-600 mt-4 text-sm">
          İkinci el araç ilanındaki fotoğrafları yükleyin.  
          <b> Carvix</b>, boya, hasar ve şüpheli bölgeleri
          yapay zekâ ile analiz etsin.
        </p>

        <div className="mt-6">
          <a href="/start" className="btn-primary inline-block w-full">
            Analizi Başlat – 129,90 TL
          </a>
          <p className="text-xs text-gray-500 mt-2">
            Tek kullanım • Anında sonuç • PDF yok
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mt-12 grid grid-cols-1 gap-4">
        <div className="card">
          📷 <b>Fotoğraf Analizi</b>
          <p className="text-sm text-gray-600 mt-1">
            İlandaki veya satıcıdan aldığınız fotoğrafları yükleyin.
          </p>
        </div>

        <div className="card">
          🤖 <b>Yapay Zekâ Yorum</b>
          <p className="text-sm text-gray-600 mt-1">
            Boya, değişen ve hasar ihtimallerini açıklamalı anlatır.
          </p>
        </div>

        <div className="card">
          ⚠️ <b>Risk Skoru</b>
          <p className="text-sm text-gray-600 mt-1">
            Araç için genel risk seviyesi ve güven puanı.
          </p>
        </div>
      </section>

      {/* WHO */}
      <section className="mt-12">
        <h2 className="section-title">Kimler Kullanabilir?</h2>

        <ul className="space-y-3 text-sm text-gray-700">
          <li>✔️ İkinci el araç alacaklar</li>
          <li>✔️ İlandaki aracı uzaktan analiz etmek isteyenler</li>
          <li>✔️ Muayene öncesi ön kontrol yapmak isteyenler</li>
          <li>✔️ Eş, dost veya aile aracına bakmak isteyenler</li>
        </ul>
      </section>

      {/* DISCLAIMER */}
      <section className="mt-12 text-xs text-gray-500">
        Bu hizmet bir <b>ön analizdir</b>.  
        Kesin teşhis içermez ve ekspertiz yerine geçmez.
      </section>

    </main>
  );
}
