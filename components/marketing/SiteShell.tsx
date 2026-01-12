"use client";

import Link from "next/link";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="nav">
        <div className="container navInner">
          <Link href="/" className="brand">
            <span className="brandDot" />
            <span>Carvix</span>
          </Link>

          <nav className="navLinks">
            <Link href="/photo-guide">Fotoğraf Rehberi</Link>
            <Link href="/pricing">Fiyatlandırma</Link>
            <Link href="/vehicle">Analizi Başlat</Link>
          </nav>

          <Link className="btn btnPrimary" href="/vehicle">
            Analizi Başlat →
          </Link>
        </div>
      </header>

      {children}
    </>
  );
}
