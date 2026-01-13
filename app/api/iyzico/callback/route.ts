import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // İleride burada paymentToken doğrulaması yapacağız
  // Şimdilik sadece başarılı kabul ediyoruz

  return NextResponse.redirect(
    "https://www.carvix.site/payment/success",
    { status: 302 }
  );
}
