import Link from "next/link";

export default function AracAnaliziPage() {
  return (
    <main style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
      <h1>AI Destekli Araç Ön Analiz Raporu</h1>

      <p>
        Bu hizmet kapsamında kullanıcılar araçlarının fotoğraf ve videolarını yükleyerek,  
        yapay zekâ destekli sistemimiz aracılığıyla hasar, kaporta, motor sesi ve genel durum analizi içeren  
        dijital bir ön rapor alırlar.
      </p>

      <ul>
        <li>Kaporta ve dış hasar tespiti</li>
        <li>Motor sesi analizi</li>
        <li>Görsel kalite ve risk değerlendirmesi</li>
        <li>Dijital rapor teslimi</li>
      </ul>

      <h2>Fiyat</h2>
      <p><strong>129,90 TL</strong></p>

      <p>
        Hizmet dijitaldir, fiziksel ürün gönderimi yapılmaz.
      </p>

      <button disabled style={{ padding: "10px 20px", marginTop: 20 }}>
        Ödeme Yakında Aktif
      </button>

      <p style={{ marginTop: 30, fontSize: 14, color: "#999" }}>
        © 2026 Carvix — Bu rapor yapay zekâ destekli ön değerlendirmedir, resmî ekspertiz yerine geçmez.
      </p>
    </main>
  );
}
