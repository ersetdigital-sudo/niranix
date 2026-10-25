import type { Metadata } from "next";
import { Suspense } from "react";
import { LayananClient } from "@/components/LayananClient";
import "@/app/logos.css";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Pilih layanan Niranix: pulsa, paket data, token PLN, e-wallet, game, dan tagihan bulanan.",
};

export default function LayananPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
      <LayananClient />
    </Suspense>
  );
}
