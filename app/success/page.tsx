"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react"; // 1. Suspense'i ekle

// İçeriği ayrı bir bileşene alıyoruz
function SuccessContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
      <div className="text-green-500 text-6xl mb-4">✅</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Ödeme Başarılı!</h1>
      <p className="text-gray-600 mb-6">
        Aracınızın analiz raporu hazırlanmaya başlandı. 
        Token: <span className="font-mono text-sm">{token}</span>
      </p>
      <Link 
        href={`/report/${token}`}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Raporu Görüntüle
      </Link>
    </div>
  );
}

// Ana sayfa bileşeni içeriği Suspense ile sarmalıyor
export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}