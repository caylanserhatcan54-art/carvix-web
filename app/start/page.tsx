"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const VEHICLES = [
  { id: "car", label: "🚗 Araba" },
  { id: "motorcycle", label: "🏍️ Motosiklet" },
  { id: "pickup", label: "🛻 Pickup" },
  { id: "van", label: "🚐 Van / Kamyonet" },
  { id: "atv", label: "🛵 ATV" },
];

export default function StartPage() {
  const [vehicle, setVehicle] = useState("car");
  const router = useRouter();
  const api = process.env.NEXT_PUBLIC_API_BASE;

  const start = async () => {
    const r = await fetch(`${api}/session/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vehicle_type: vehicle }),
    });

    const data = await r.json();
    router.push(`/upload/${data.token}`);
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Aracınızı Seçin</h1>

      {VEHICLES.map(v => (
        <label key={v.id} style={{ display: "block", marginTop: 12 }}>
          <input
            type="radio"
            checked={vehicle === v.id}
            onChange={() => setVehicle(v.id)}
          />{" "}
          {v.label}
        </label>
      ))}

      <button
        onClick={start}
        style={{ marginTop: 24, padding: 14, fontSize: 16 }}
      >
        Devam Et →
      </button>
    </main>
  );
}
