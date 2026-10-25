import type { Metadata } from "next";
import { BantuanClient } from "@/components/BantuanClient";

export const metadata: Metadata = {
  title: "Bantuan",
  description:
    "Pusat bantuan Niranix Digital — pembayaran QRIS, status transaksi, refund, dan kontak admin.",
};

export default function BantuanPage() {
  return <BantuanClient />;
}
