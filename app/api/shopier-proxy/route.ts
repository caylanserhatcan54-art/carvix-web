// web/app/api/shopier-proxy/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 1. Shopier'den gelen veriyi al
    const formData = await request.formData();
    
    // 2. Render backend adresin
    const BACKEND_URL = "https://ai-arac-analiz-backend.onrender.com/api/payment/shopier-callback";

    console.log("Shopier verisi iletiliyor...");

    // 3. Veriyi URLSearchParams formatına çevirerek gönder (Backend'in daha rahat okuması için)
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      params.append(key, value.toString());
    });

    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const result = await response.text();
    console.log("Backend cevabı:", result);

    // Shopier "OK" yazısını görmeli
    return new NextResponse(result, { status: 200 });
  } catch (error) {
    console.error("Proxy Hatası:", error);
    return new NextResponse("FAILED", { status: 500 });
  }
}

export async function GET() {
    return new NextResponse("Shopier Proxy Active", { status: 200 });
}