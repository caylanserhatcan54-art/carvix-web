"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const TYPES = [
  { id: "car", label: "🚗 Araba" },
  { id: "motorcycle", label: "🏍️ Motosiklet" },
  { id: "pickup", label: "🛻 Pickup" },
  { id: "van", label: "🚐 Van / Kamyonet" },
  { id: "atv", label: "🛵 ATV" },
];

export default function StartPage() {
  const router = useRouter();
  const [type, setType] = useState("car");

  return (
    <main className="max-w-md mx-auto px-4 pt-10">
      <h2 className="section-title">Aracınızı Seçin</h2>

      <div className="space-y-3 mt-4">
        {TYPES.map(t => (
          <button
            key={t.id}
            onClick={() => setType(t.id)}
            className={`card w-full text-left ${
              type === t.id ? "border-2 border-green-500" : ""
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => router.push(`/upload?type=${type}`)}
        className="btn-primary w-full mt-6"
      >
        Devam Et →
      </button>
    </main>
  );
}
