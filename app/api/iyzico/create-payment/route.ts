export const runtime = "nodejs";

import { NextResponse } from "next/server";
// @ts-ignore
import Iyzipay from "iyzipay";

export async function POST(): Promise<NextResponse> {
  const iyzipay = new Iyzipay({
    apiKey: process.env.IYZICO_API_KEY as string,
    secretKey: process.env.IYZICO_SECRET_KEY as string,
    uri: "https://sandbox-api.iyzipay.com",
  });

  const request = {
    locale: "tr",
    conversationId: "carvix-arac-analizi",
    price: "129.90",
    paidPrice: "129.90",
    currency: "TRY",
    basketId: "AI_ARAC_ANALIZI",
    paymentGroup: "PRODUCT",
    callbackUrl: "https://www.carvix.site/payment/success",
    enabledInstallments: [1],

    buyer: {
      id: "BY789",
      name: "Carvix",
      surname: "User",
      gsmNumber: "+905555555555",
      email: "info@carvix.site",
      identityNumber: "11111111111",
      registrationAddress: "Türkiye",
      ip: "85.34.78.112",
      city: "Istanbul",
      country: "Turkey",
    },

    shippingAddress: {
      contactName: "Carvix",
      city: "Istanbul",
      country: "Turkey",
      address: "Dijital Hizmet",
    },

    billingAddress: {
      contactName: "Carvix",
      city: "Istanbul",
      country: "Turkey",
      address: "Dijital Hizmet",
    },

    basketItems: [
      {
        id: "AI_ARAC_ANALIZI",
        name: "AI Destekli Araç Ön Analiz Raporu",
        category1: "Dijital Hizmet",
        itemType: "VIRTUAL",
        price: "129.90",
      },
    ],
  };

  return await new Promise((resolve) => {
    iyzipay.checkoutFormInitialize.create(request, (err: any, result: any) => {
      if (err || !result?.paymentPageUrl) {
        resolve(
          NextResponse.json(
            { error: "İyzico ödeme başlatılamadı" },
            { status: 500 }
          )
        );
      } else {
        resolve(
          NextResponse.json({
            paymentPageUrl: result.paymentPageUrl,
          })
        );
      }
    });
  });
}
