"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StartPage() {
  const router = useRouter();
  const api = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    async function start() {
      const res = await fetch(`${api}/analysis/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicle_type: "car" }),
      });

      const data = await res.json();
      router.push(`/upload/${data.token}`);
    }

    start();
  }, []);

  return <p style={{ padding: 40 }}>Oturum başlatılıyor…</p>;
}
