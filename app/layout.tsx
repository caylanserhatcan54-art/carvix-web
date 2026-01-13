import "./globals.css";
import type { Metadata } from "next";

import { SiteShell } from "@/components/marketing/SiteShell";
import Navbar from "@/components/marketing/Navbar";
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
        <SiteShell>
          <Navbar />
          {children}
          <Footer />
        </SiteShell>
      </body>
    </html>
  );
}
