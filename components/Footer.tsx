import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0f172a",
        color: "#fff",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 20,
          }}
        >
          {/* Marka */}
          <div>
            <h3>Carvix</h3>
            <p style={{ fontSize: 14, opacity: 0.8 }}>
              Yapay zekâ destekli araç ön analiz raporu platformu.
            </p>
          </div>

          {/* Kurumsal */}
          <div>
            <h4>Kurumsal</h4>
            <ul>
              <li>
                <Link href="/hakkimizda">Hakkımızda</Link>
              </li>
              <li>
                <Link href="/iletisim">İletişim</Link>
              </li>
            </ul>
          </div>

          {/* Yasal */}
          <div>
            <h4>Yasal</h4>
            <ul>
              <li>
                <Link href="/gizlilik-politikasi">Gizlilik Politikası</Link>
              </li>
              <li>
                <Link href="/mesafeli-satis-sozlesmesi">
                  Mesafeli Satış Sözleşmesi
                </Link>
              </li>
              <li>
                <Link href="/iade-ve-teslimat">İade ve Teslimat</Link>
              </li>
            </ul>
          </div>

          {/* Ödeme */}
          <div>
            <h4>Ödeme</h4>

            <img
              src="/logos/payment-band.png"
              alt="Visa, MasterCard, American Express, Troy ve iyzico ile Öde"
              style={{
                marginTop: 10,
                maxWidth: 260,
                width: "100%",
                background: "#fff",
                padding: 8,
                borderRadius: 8,
              }}
            />
          </div>
        </div>

        <hr style={{ margin: "30px 0", opacity: 0.2 }} />

        <p style={{ fontSize: 13, opacity: 0.6 }}>
          © {new Date().getFullYear()} Carvix – Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
