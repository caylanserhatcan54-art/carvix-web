// web/components/marketing/HowItWorks.tsx
"use client";

export default function HowItWorks() {
  const steps = [
    {
      n: "1",
      title: "Aracını seç",
      desc: "Otomobil, elektrikli araç, motosiklet, pickup/van/ATV seçeneklerinden seç.",
    },
    {
      n: "2",
      title: "Parça bazlı fotoğraf yükle",
      desc: "Kapı/çamurluk/kaput/bagaj + menteşe/vida/direk detayları önerilir.",
    },
    {
      n: "3",
      title: "Raporu gör",
      desc: "OK / SUSPECTED / DETECTED + güven skoru ve kısa açıklamalarla rapor hazır.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <h2 className="text-2xl font-semibold md:text-3xl">Nasıl Çalışır?</h2>
      <p className="mt-3 max-w-2xl text-neutral-300">
        3 adımda hızlı ön rapor. Detay fotoğraf = daha güçlü sonuç.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 text-white">
              {s.n}
            </div>
            <div className="mt-4 text-lg font-semibold">{s.title}</div>
            <div className="mt-2 text-sm text-neutral-300">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
