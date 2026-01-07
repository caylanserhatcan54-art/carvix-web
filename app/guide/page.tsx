// web/app/guide/page.tsx
"use client";

import PhotoGuideCards from "@/components/marketing/PhotoGuideCards";
import CTA from "@/components/marketing/CTA";
import { PHOTO_GUIDE } from "@/lib/marketing";

export default function GuidePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
        <h1 className="text-3xl font-semibold md:text-4xl">Doğru Fotoğraf Rehberi</h1>
        <p className="mt-3 max-w-2xl text-neutral-300">{PHOTO_GUIDE.intro}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-6">
            <h3 className="text-lg font-semibold">Altın Kurallar</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-300">
              {PHOTO_GUIDE.rules.map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="mt-0.5 text-emerald-300">✓</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-6">
            <h3 className="text-lg font-semibold">Hızlı İpucu</h3>
            <p className="mt-3 text-sm text-neutral-300">
              Boya/lokal boya için <b>en az 2 panel</b> yükleyin ki karşılaştırma yapılabilsin.
              Sök–tak için mutlaka <b>vida/menteşe/direk</b> detaylarını ekleyin.
            </p>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-neutral-300">
              Örnek: SOL_ON_KAPI + SAG_ON_KAPI + KAPI_MENTESE
            </div>
          </div>
        </div>

        <div className="mt-10">
          <PhotoGuideCards />
        </div>
      </div>

      <div className="mt-10">
        <CTA />
      </div>
    </main>
  );
}
