// web/components/marketing/ObjectionBlock.tsx
"use client";

export default function ObjectionBlock() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-neutral-950/40 p-8">
          <h3 className="text-xl font-semibold">“Fotoğrafa ben de bakarım.”</h3>
          <p className="mt-3 text-sm text-neutral-300">
            Fotoğrafa bakmak başka, panelleri karşılaştırarak ölçmek başka.
            Carvix; ton/parlaklık/yansıma/doku farklarını kıyaslar, kritik bölgeleri sınıflandırır.
          </p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-neutral-300">
            <b>Carvix senin göremediğini değil, emin olamadığını ölçer.</b>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-neutral-950/40 p-8">
          <h3 className="text-xl font-semibold">“Bu ekspertiz değilse neden?”</h3>
          <p className="mt-3 text-sm text-neutral-300">
            Carvix, yola çıkmadan önce risk elemesi yapar. Ekspertize gitmeye değip değmeyeceğini,
            hangi parçalarda şüphe olabileceğini hızlıca gösterir.
          </p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-neutral-300">
            129,90₺ ile yol/ekspertiz masrafından önce <b>filtre</b> yaparsın.
          </div>
        </div>
      </div>
    </section>
  );
}
