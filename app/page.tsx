"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Kullanıcı ana sayfaya girdiği an onu /dashboard'a yolla
    router.replace("/dashboard");
  }, [router]);

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#3b82f6', fontWeight: 'bold' }}>Yönlendiriliyorsunuz...</p>
    </div>
  );
}