import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const manrope = localFont({
  src: [
    { path: "../../fonts/manrope-wght--regular.ttf", weight: "400", style: "normal" },
    { path: "../../fonts/manrope-wght--medium.ttf", weight: "500", style: "normal" },
    { path: "../../fonts/manrope-wght--semibold.ttf", weight: "600", style: "normal" },
    { path: "../../fonts/manrope-wght--bold.ttf", weight: "700", style: "normal" },
    { path: "../../fonts/manrope-wght--extrabold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3007"),
  title: {
    default: "Niranix Digital · Isi ulang & bayar tagihan instan",
    template: "%s · Niranix",
  },
  description:
    "Pulsa, paket data, token PLN, top up game, e-wallet, dan bayar tagihan. Bayar sekali lewat QRIS, beres.",
  openGraph: {
    title: "Niranix Digital · Isi ulang & bayar tagihan instan",
    description:
      "Pulsa, paket data, token PLN, top up game, e-wallet, dan bayar tagihan. Bayar sekali lewat QRIS, beres.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={manrope.variable}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
