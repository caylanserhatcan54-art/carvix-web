import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

import { SiteShell } from "@/components/marketing/SiteShell";
import Footer from "@/components/marketing/Footer";
import { BRAND } from "@/lib/marketing";

export const metadata: Metadata = {
  title: `${BRAND.name} • ${BRAND.tagline}`,
  description: BRAND.subtagline,

  openGraph: {
    title: BRAND.name,
    description: BRAND.subtagline,
    url: "https://www.carvix.site",
    siteName: BRAND.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        {/* Navbar'ı buradan sildik, SiteShell zaten içinde barındırıyor */}
        <SiteShell>
          {children}
          <Footer />
        </SiteShell>
        
        {/* Lemon Squeezy Pencere Scripti */}
        <Script
          src="https://app.lemonsqueezy.com/js/lemon.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}