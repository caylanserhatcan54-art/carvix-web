// web/components/marketing/Footer.tsx
"use client";

import { BRAND } from "@/lib/marketing";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-neutral-400">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} {BRAND.name}</div>
          <div className="text-neutral-500">{BRAND.disclaimerShort}</div>
        </div>
      </div>
    </footer>
  );
}
