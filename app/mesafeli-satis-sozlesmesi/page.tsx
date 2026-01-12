export default function MesafeliSatisSozlesmesiPage() {
  return (
    <div className="container">
      <h1>📄 Mesafeli Satış Sözleşmesi</h1>

      <p>
        İşbu sözleşme, www.carvix.site üzerinden sunulan dijital hizmetlerin satışına
        ilişkin olarak düzenlenmiştir.
      </p>

      <h3>Satıcı</h3>
      <p>
        Carvix<br />
        E-posta: info@carvix.site
      </p>

      <h3>Hizmet</h3>
      <p>
        Yapay zekâ destekli araç ön analiz raporu (dijital içerik).
      </p>

      <h3>Teslimat</h3>
      <p>
        Satın alınan hizmet, ödeme tamamlandıktan hemen sonra dijital ortamda
        kullanıcıya sunulur.
      </p>

      <h3>Cayma Hakkı</h3>
      <p>
        Dijital içerik anında teslim edildiğinden, 6502 sayılı Tüketicinin Korunması
        Hakkında Kanun gereği cayma hakkı bulunmamaktadır.
      </p>

      {/* iyzico için küçük ama kritik detay */}
      <p style={{ marginTop: 24, fontSize: 13, opacity: 0.7 }}>
        Son güncelleme: 2026
      </p>
    </div>
  );
}
