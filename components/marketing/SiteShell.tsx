"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <header className="nav" style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 100, 
        background: 'rgba(5, 5, 5, 0.9)', 
        backdropFilter: 'blur(15px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div className="container navInner" style={{ 
          height: '72px', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between' 
        }}>
          
          {/* LOGO ALANI - Sadece Logo ve Marka İsmi */}
          <Link href="/" className="brand" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <img 
              src="/logo.png" 
              alt="Carvix Logo" 
              style={{ height: '36px', width: 'auto' }} 
            />
            <span style={{ fontSize: '20px', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>
              CAR<span style={{ color: '#3b82f6' }}>VIX</span>
            </span>
          </Link>

          {/* NAVİGASYON - Gereksiz tekrarlar silindi */}
          <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link 
              href="/photo-guide" 
              style={{ 
                color: pathname === "/photo-guide" ? "#fff" : "#a1a1aa", 
                fontWeight: 600, 
                fontSize: '14px',
                textDecoration: 'none' 
              }}
            >
              Fotoğraf Rehberi
            </Link>
            
            <Link 
              href="/#pricing" 
              style={{ color: "#a1a1aa", fontWeight: 600, fontSize: '14px', textDecoration: 'none' }}
            >
              Fiyatlandırma
            </Link>

            <Link 
              className="btn btnPrimary" 
              href="/vehicle" 
              style={{ padding: '10px 20px', fontSize: '14px', fontWeight: 700, borderRadius: '10px' }}
            >
              Analizi Başlat →
            </Link>
          </nav>

        </div>
      </header>

      {/* Sayfa İçeriği */}
      {children}
    </>
  );
}

/* Badge bileşeni HomePage'de hata vermemesi için export edilmeli */
export function Badge({ tone, text }: { tone: "ok" | "warn" | "bad" | "muted"; text: string; }) {
  const styles: Record<string, { bg: string, color: string }> = {
    ok: { bg: "rgba(34, 197, 94, 0.15)", color: "#4ade80" },
    warn: { bg: "rgba(245, 158, 11, 0.15)", color: "#fbbf24" },
    bad: { bg: "rgba(239, 68, 68, 0.15)", color: "#f87171" },
    muted: { bg: "rgba(255, 255, 255, 0.05)", color: "#a1a1aa" },
  };
  const currentStyle = styles[tone] || styles.muted;
  return (
    <span style={{
        padding: "4px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 700,
        backgroundColor: currentStyle.bg, color: currentStyle.color, border: `1px solid ${currentStyle.bg}`,
      }}>
      {text}
    </span>
  );
}