// web/components/marketing/PhotoGuideCards.tsx
"use client";

import { PHOTO_GUIDE } from "@/lib/marketing";

export default function PhotoGuideCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {PHOTO_GUIDE.packs.map((p) => (
        <div key={p.title} className="rounded-3xl border border-white/10 bg-neutral-950/40 p-8">
          <h3 className="text-xl font-semibold">{p.title}</h3>
          <ul className="mt-4 space-y-2 text-sm text-neutral-300">
            {p.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-0.5 text-emerald-300">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-neutral-300">
            {p.note}
          </div>
        </div>
      ))}
    </div>
  );
}
