import type { Metadata } from "next";
import { Suspense } from "react";
import { CekTransaksiClient } from "@/components/CekTransaksiClient";

export const metadata: Metadata = {
  title: "Cek Transaksi",
  description: "Lacak status pesanan Niranix dengan kode transaksi atau nomor HP.",
};

export default function CekTransaksiPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
      <CekTransaksiClient />
    </Suspense>
  );
}
