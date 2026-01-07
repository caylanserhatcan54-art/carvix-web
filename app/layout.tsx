// web/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { BRAND } from "@/lib/marketing";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const metadata: Metadata = {
  title: `${BRAND.name} • ${BRAND.tagline}`,
  description: BRAND.subtagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        <div className="relative">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
