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

/* ✅ BUILD HATASINI ÇÖZEN BADGE EXPORT */
export function Badge({
  tone,
  text,
}: {
  tone: "ok" | "warn" | "bad" | "muted";
  text: string;
}) {
  const styles: Record<string, string> = {
    ok: "background:#16a34a;color:white;",
    warn: "background:#f59e0b;color:black;",
    bad: "background:#dc2626;color:white;",
    muted: "background:#374151;color:white;",
  };

  return (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: 6,
        fontSize: 12,
        whiteSpace: "nowrap",
        ...(tone && { cssText: styles[tone] }),
      }}
    >
      {text}
    </span>
  );
}
