"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

// 1. İçeriği ayrı bir bileşene alıyoruz (Vercel hatasını çözen kısım burası)
function SuccessContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
      <div className="text-green-500 text-6xl mb-4">✅</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Ödeme Başarılı!</h1>
      <p className="text-gray-600 mb-6">
        Aracınızın analiz raporu hazırlanmaya başlandı. 
        <br />
        <span className="text-xs text-gray-400 font-mono">Token: {token}</span>
      </p>
      
      {token ? (
        <Link 
          href={`/report/${token}`}
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
        >
          Raporu Görüntüle
        </Link>
      ) : (
        <p className="text-red-500">Token bulunamadı, lütfen bekleyin...</p>
      )}

      <div className="mt-6">
        <Link href="/" className="text-sm text-gray-500 hover:underline">
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}

// 2. Ana sayfa bileşeni içeriği Suspense ile sarmalıyor
export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <Suspense fallback={
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}