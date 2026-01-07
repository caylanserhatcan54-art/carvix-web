// web/components/marketing/FeatureGrid.tsx
"use client";

export default function FeatureGrid({
  items,
}: {
  items: { title: string; desc: string }[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((it) => (
        <div
          key={it.title}
          className="rounded-2xl border border-white/10 bg-neutral-950/40 p-6"
        >
          <div className="text-lg font-semibold">{it.title}</div>
          <div className="mt-2 text-sm text-neutral-300">{it.desc}</div>
        </div>
      ))}
    </div>
  );
}
