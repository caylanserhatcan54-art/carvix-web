// web/components/marketing/SocialProof.tsx
"use client";

export default function SocialProof() {
  const items = [
    { k: "Parça bazlı", v: "Analiz raporu" },
    { k: "Boya", v: "Karşılaştırmalı şüphe" },
    { k: "Sök–tak", v: "Vida/menteşe kontrolü" },
    { k: "Hasar", v: "Şiddet sınıflandırma" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="rounded-3xl border border-white/10 bg-neutral-950/40 p-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-4">
          {items.map((it) => (
            <div key={it.k} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs uppercase tracking-wide text-neutral-400">{it.k}</div>
              <div className="mt-2 text-lg font-semibold text-white">{it.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
