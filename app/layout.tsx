// web/app/layout.tsx
import "./globals.css";
import { SiteShell } from "@/components/marketing/SiteShell";
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
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
