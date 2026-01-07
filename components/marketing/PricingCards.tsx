// web/components/marketing/PricingCards.tsx
"use client";

import { PRICING } from "@/lib/marketing";

export default function PricingCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-3xl border border-white/10 bg-neutral-950/40 p-8">
        <div className="text-sm text-neutral-300">{PRICING.planName}</div>
        <div className="mt-3 flex items-end gap-2">
          <div className="text-5xl font-semibold text-white">
            {PRICING.amount.toFixed(2).replace(".", ",")}
          </div>
          <div className="pb-1 text-xl text-neutral-300">{PRICING.currency}</div>
        </div>
        <div className="mt-3 text-sm text-neutral-300">{PRICING.planNote}</div>

        <ul className="mt-6 space-y-2 text-sm text-neutral-300">
          {PRICING.bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-0.5 text-emerald-300">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex gap-3">
          <a
            href="/vehicle"
            className="inline-flex flex-1 items-center justify-center rounded-2xl bg-white px-5 py-3 text-base font-semibold text-neutral-950 hover:translate-y-[-1px] transition"
          >
            Analizi Başlat →
          </a>
          <a
            href="/guide"
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-base font-medium text-white hover:bg-white/10"
          >
            Fotoğraf Rehberi
          </a>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h3 className="text-xl font-semibold">Kimler için ideal?</h3>
        <p className="mt-3 text-sm text-neutral-300">
          Aracı görmeye gitmeden önce risk görmek isteyenler, şehir dışına çıkacak olanlar,
          satıcıya güvenmeden önce hızlı eleme yapmak isteyenler.
        </p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-neutral-950/40 p-6">
          <div className="text-sm text-neutral-300">Örnek kullanım</div>
          <div className="mt-2 text-sm text-neutral-200">
            “Kaput vidasında sök–tak şüphesi çıktı → gitmeden önce satıcıyla konuşup netleştirdim.”
          </div>
        </div>

        <div className="mt-6 text-sm text-neutral-300">
          <b>Not:</b> En iyi sonuç için panel + vida/menteşe detaylarını yükleyin.
        </div>
      </div>
    </div>
  );
}
