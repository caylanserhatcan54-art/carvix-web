// web/components/marketing/Navbar.tsx
"use client";

import { BRAND } from "@/lib/marketing";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-white/10 ring-1 ring-white/10" />
          <div className="font-semibold tracking-tight">{BRAND.name}</div>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-neutral-300 md:flex">
          <a className="hover:text-white" href="/guide">Fotoğraf Rehberi</a>
          <a className="hover:text-white" href="/pricing">Fiyatlandırma</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/pricing"
            className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 md:inline-flex"
          >
            129,90₺
          </a>
          <a
            href="/vehicle"
            className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-950 hover:translate-y-[-1px] transition"
          >
            Analizi Başlat →
          </a>
        </div>
      </div>
    </header>
  );
}
