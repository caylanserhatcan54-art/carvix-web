// web/app/page.tsx
"use client";

import CTA from "@/components/marketing/CTA";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import HowItWorks from "@/components/marketing/HowItWorks";
import ObjectionBlock from "@/components/marketing/ObjectionBlock";
import SocialProof from "@/components/marketing/SocialProof";
import FAQ from "@/components/marketing/FAQ";
import { BRAND, VALUE_POINTS } from "@/lib/marketing";

export default function HomePage() {
  return (
    <main>
      {/* Premium background */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-600/30 via-cyan-500/20 to-emerald-500/20 blur-3xl" />
          <div className="absolute top-24 left-10 h-56 w-56 rounded-full bg-cyan-500/10 blur-2xl" />
          <div className="absolute top-64 right-10 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-2xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-200">
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-200">
              Yapay zekâ destekli
            </span>
            <span className="text-neutral-300">
              Boya • Sök–tak • Hasar ön analizi
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            <span className="text-white">{BRAND.tagline}</span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-neutral-300 md:text-xl">
            {BRAND.subtagline}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="/vehicle"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-base font-semibold text-neutral-950 shadow-[0_10px_30px_rgba(255,255,255,0.12)] transition hover:translate-y-[-1px]"
            >
              Analizi Başlat →
            </a>
            <a
              href="/guide"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-base font-medium text-white transition hover:bg-white/10"
            >
              Doğru Fotoğraf Rehberi
            </a>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm text-neutral-300">Ne sağlar?</div>
              <div className="mt-2 text-lg font-semibold">Yola çıkmadan önce eleme</div>
              <div className="mt-2 text-sm text-neutral-300">
                Riskli aracı erkenden görür, zaman ve masrafı azaltırsın.
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm text-neutral-300">Ne yapar?</div>
              <div className="mt-2 text-lg font-semibold">Karşılaştırır & ölçer</div>
              <div className="mt-2 text-sm text-neutral-300">
                Ton/parlaklık/yansıma/doku farklarını paneller arasında kıyaslar.
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm text-neutral-300">Ne değildir?</div>
              <div className="mt-2 text-lg font-semibold">Resmî ekspertiz değil</div>
              <div className="mt-2 text-sm text-neutral-300">
                Fotoğrafa dayalı ön rapordur; nihai karar kullanıcı sorumluluğundadır.
              </div>
            </div>
          </div>
        </div>
      </section>

      <SocialProof />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-semibold md:text-3xl">
          Neden <span className="text-white">Carvix</span>?
        </h2>
        <p className="mt-3 max-w-2xl text-neutral-300">
          Fotoğrafa bakmak başka, fotoğrafları karşılaştırarak ölçmek başka.
        </p>
        <div className="mt-8">
          <FeatureGrid items={VALUE_POINTS} />
        </div>
      </section>

      <HowItWorks />

      <ObjectionBlock />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-semibold md:text-3xl">Sık Sorulan Sorular</h2>
        <p className="mt-3 max-w-2xl text-neutral-300">
          Şeffaf ve dürüst: Ne yapar, ne yapmaz, nasıl yorumlar?
        </p>
        <div className="mt-8">
          <FAQ />
        </div>
      </section>

      <CTA />
    </main>
  );
}
