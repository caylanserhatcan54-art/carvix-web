// web/components/marketing/CTA.tsx
"use client";

export default function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-white/10 p-8 md:p-12">
        <h3 className="text-2xl font-semibold md:text-3xl">
          Ekspertize gitmeden önce <span className="text-white">riskini filtrele.</span>
        </h3>
        <p className="mt-3 max-w-2xl text-neutral-300">
          Parça bazlı yükle, yapay zekâ raporu anında gör. Gerekirse ekspertize daha sağlam hazırlan.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href="/vehicle"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-base font-semibold text-neutral-950 hover:translate-y-[-1px] transition"
          >
            Analizi Başlat →
          </a>
          <a
            href="/pricing"
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-base font-medium text-white hover:bg-white/10"
          >
            Paketleri Gör
          </a>
        </div>
      </div>
    </section>
  );
}
