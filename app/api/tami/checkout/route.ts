// app/api/payments/tami/init/route.ts (veya dosya yolun her neyse)
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Canlıda Render URL'ini, localde ise 8000 portunu kullanır:
    const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000"; 

    console.log("İstek Gönderiliyor:", `${BACKEND_URL}/payments/tami/init`);

    const response = await fetch(`${BACKEND_URL}/payments/tami/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // Bazı durumlarda backend boş dönebileceği için güvenli JSON okuma:
    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      data = { error: "Backend'den geçersiz JSON yanıtı geldi", raw: text };
    }

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    // Backend'den paymentUrl gelirse kullanıcıyı oraya yönlendireceğiz
    return NextResponse.json({ url: data.paymentUrl || data.url });

  } catch (error) {
    console.error("Next.js Köprü Hatası:", error);
    return NextResponse.json({ error: "Sunucuya ulaşılamadı" }, { status: 500 });
  }
}