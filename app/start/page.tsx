"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StartPage() {
  const router = useRouter();

  useEffect(() => {
    // Misafir token'ı frontend'de üret
    const token = crypto.randomUUID();
    router.replace(`/upload/${token}`);
  }, [router]);

  return <p style={{ padding: 40 }}>Oturum başlatılıyor…</p>;
}
