// web/components/marketing/FAQ.tsx
"use client";

import { FAQS } from "@/lib/marketing";
import { useState } from "react";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {FAQS.map((f, idx) => {
        const isOpen = open === idx;
        return (
          <div key={f.q} className="rounded-2xl border border-white/10 bg-neutral-950/40">
            <button
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
              onClick={() => setOpen(isOpen ? null : idx)}
            >
              <span className="font-semibold">{f.q}</span>
              <span className="text-neutral-400">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm text-neutral-300">{f.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
