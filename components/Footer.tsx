import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">

        {/* Sol */}
        <p>
          © {new Date().getFullYear()} Carvix. Tüm hakları saklıdır.
        </p>

        {/* Orta – Bilgilendirme Linkleri */}
        <nav className="flex flex-wrap gap-4 justify-center">
          <Link href="/hakkimizda">Hakkımızda</Link>
          <Link href="/gizlilik">Gizlilik Politikası</Link>
          <Link href="/mesafeli-satis-sozlesmesi">Mesafeli Satış Sözleşmesi</Link>
          <Link href="/iade-ve-teslimat">İade & Teslimat</Link>
          <Link href="/iletisim">İletişim</Link>
        </nav>

        {/* Sağ – Ödeme Logoları */}
        <div className="opacity-80">
          <img
            src="/logos/payment-band.png"
            alt="Ödeme Yöntemleri - iyzico, Visa, Mastercard"
            className="h-8"
          />
        </div>

      </div>
    </footer>
  );
}
