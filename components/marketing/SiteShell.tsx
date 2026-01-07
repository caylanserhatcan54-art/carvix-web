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

      <footer className="footer">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>© {new Date().getFullYear()} Carvix</div>
            <div style={{ maxWidth: 760 }}>
              Bu rapor yapay zekâ destekli ön değerlendirmedir; resmî ekspertiz yerine geçmez.
              Çekim kalitesi/ışık/açı ve yüklenen parça kapsamına bağlı olarak yanılabilir.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export function Badge({ tone, text }: { tone: "ok" | "warn" | "bad" | "muted"; text: string }) {
  const cls =
    tone === "ok" ? "badge badgeOk" : tone === "warn" ? "badge badgeWarn" : tone === "bad" ? "badge badgeBad" : "badge";
  return (
    <span className={cls}>
      <span className="badgeDot" />
      {text}
    </span>
  );
}
