"use client";
import Link from "next/link";

export default function FailPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
        <div className="text-red-500 text-6xl mb-4">❌</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Ödeme Başarısız</h1>
        <p className="text-gray-600 mb-6">
          İşlem sırasında bir sorun oluştu veya ödeme iptal edildi. 
          Lütfen tekrar deneyiniz.
        </p>
        <Link 
          href="/"
          className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}