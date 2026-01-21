"use client";

import { useEffect, useState } from "react";
// ... diğer importlar aynı ...

export default function CheckoutSuccess() {
  const [orderId, setOrderId] = useState("");
  const [isSending, setIsSending] = useState(true);

  useEffect(() => {
    setOrderId("CRV-" + Math.floor(100000 + Math.random() * 900000));
    
    // 1. Yerel depolamadan kullanıcı mailini alalım (SiteShell'e ekleyeceğiz birazdan)
    const userJson = localStorage.getItem("carvix_user");
    const userData = userJson ? JSON.parse(userJson) : null;

    if (userData && userData.email) {
      // 2. Ödeme başarılı olduğu an rapor mailini gönderen API'yi tetikle
      sendReportEmail(userData.email, userData.name);
    }

    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
  }, []);

  const sendReportEmail = async (email: string, name: string) => {
    try {
      await fetch("/api/send-welcome", { // Şimdilik welcome API'sini kullanıyoruz, istersen send-report diye ayrı açabiliriz
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email, 
          firstName: name,
          isReport: true // API'ye bunun bir rapor olduğunu bildiren bir bayrak
        }),
      });
      setIsSending(false);
    } catch (error) {
      console.error("Rapor maili gönderilemedi", error);
    }
  };

  // ... Geri kalan tasarım aynı ...
}