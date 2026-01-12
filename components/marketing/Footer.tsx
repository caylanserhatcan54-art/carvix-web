import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24 bg-black text-white/70">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* LINKLER */}
        <nav className="flex flex-col items-center gap-3 text-sm text-center">
          <Link href="/hakkimizda" className="hover:text-white">Hakkımızda</Link>
          <Link href="/gizlilik-politikasi" className="hover:text-white">Gizlilik Politikası</Link>
          <Link href="/mesafeli-satis-sozlesmesi" className="hover:text-white">Mesafeli Satış Sözleşmesi</Link>
          <Link href="/iade-ve-teslimat" className="hover:text-white">İade & Teslimat</Link>
          <Link href="/iletisim" className="hover:text-white">İletişim</Link>
        </nav>

        {/* ÖDEME LOGOLARI */}
        <div className="flex justify-center mt-6">
          <img
            src="/logos/payment-band.png"
            alt="Ödeme Yöntemleri"
            className="h-8 opacity-80"
          />
        </div>

        {/* ALT METİN */}
        <p className="mt-6 text-center text-xs text-white/50 max-w-3xl mx-auto leading-relaxed">
          © 2026 Carvix — Bu rapor yapay zekâ destekli ön değerlendirmedir, resmî ekspertiz yerine geçmez.
        </p>
      </div>
    </footer>
  );
}
