// web/app/api/shopier-proxy/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Shopier'den gelen form verilerini alıyoruz
    const formData = await request.formData();
    
    // Render'daki gerçek backend adresin
    const BACKEND_URL = "https://ai-arac-analiz-backend.onrender.com/api/payment/shopier-callback";

    console.log("Shopier verisi alındı, Render'a iletiliyor...");

    // Veriyi Render backend'ine aynen iletiyoruz
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      body: formData,
    });

    const result = await response.text();

    // Shopier "OK" yazısını görmeli, backend'den gelen cevabı döndürüyoruz
    return new NextResponse(result, { status: 200 });
  } catch (error) {
    console.error("Proxy Hatası:", error);
    return new NextResponse("Internal Proxy Error", { status: 500 });
  }
}

// Bazı durumlarda Shopier GET isteği de atabilir, hazırlıklı olalım
export async function GET(request: Request) {
    return new NextResponse("Shopier Proxy Active", { status: 200 });
}