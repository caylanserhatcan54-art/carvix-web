import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

// 1. ADIM: Import ekle
import { Analytics } from "@vercel/analytics/react"; 

import { SiteShell } from "@/components/marketing/SiteShell";
import Footer from "@/components/marketing/Footer";
import { BRAND } from "@/lib/marketing";

export const metadata: Metadata = {
  // ... mevcut metadata kodların (aynen kalsın)
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <SiteShell>
          {children}
          <Footer />
        </SiteShell>
        
        {/* 2. ADIM: Analytics bileşenini buraya ekle */}
        <Analytics />

        {/* Lemon Squeezy Pencere Scripti */}
        <Script
          src="https://app.lemonsqueezy.com/js/lemon.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}