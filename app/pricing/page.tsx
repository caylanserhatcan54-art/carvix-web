// web/app/pricing/page.tsx
"use client";

import PricingCards from "@/components/marketing/PricingCards";
import CTA from "@/components/marketing/CTA";
import { PRICING, BRAND } from "@/lib/marketing";

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
        <h1 className="text-3xl font-semibold md:text-4xl">Fiyatlandırma</h1>
        <p className="mt-3 max-w-2xl text-neutral-300">
          {BRAND.name}, fotoğraflara dayalı ön analiz sunar. Ekspertiz yerine geçmez;
          ekspertize gitmeden önce risk elemesi için tasarlanmıştır.
        </p>

        <div className="mt-10">
          <PricingCards />
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-neutral-950/40 p-6">
          <div className="text-sm text-neutral-300">Önemli not</div>
          <div className="mt-2 text-neutral-200">
            {BRAND.disclaimerShort}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <CTA />
      </div>
    </main>
  );
}
