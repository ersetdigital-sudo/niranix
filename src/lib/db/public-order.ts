import { getOrderByRef, getPaymentByRef } from "./server";

export type PublicStatus = "success" | "processing" | "pending" | "expired";

export type PublicOrder = {
  inv: string;
  status: PublicStatus;
  service: string;
  product: string;
  lines: [string, string][];
  method: string;
  total: number;
  sn: string;
  label: string;
  created: number;
  updated: number;
  paidAt?: number;
};

function mapStatus(status: string): PublicStatus {
  if (status === "sukses") return "success";
  if (status === "sudah_bayar") return "processing";
  if (status === "dibatalkan") return "expired";
  return "pending";
}

export async function getPublicOrder(
  invoice: string,
): Promise<{ order: PublicOrder | null; error?: string }> {
  const [payment, orders] = await Promise.all([
    getPaymentByRef(invoice),
    getOrderByRef(invoice),
  ]);

  if (!payment.data) {
    return { order: null, error: payment.error || "Pesanan tidak ditemukan" };
  }

  const data = payment.data;
  const detail = orders.data?.[0] ?? null;
  const created = data.created_at
    ? new Date(data.created_at).getTime()
    : Date.now();

  return {
    order: {
      inv: data.ref,
      status: mapStatus(data.status),
      service: data.nama_layanan,
      product: data.nama_produk ?? "-",
      lines: [
        ["Layanan", data.nama_layanan],
        ["Produk", data.nama_produk ?? "-"],
        ["Nomor tujuan", data.nomor_tujuan],
      ],
      method: data.metode_bayar ?? "QRIS",
      total: data.total ?? 0,
      sn: detail?.sn ?? "",
      label: "SN / Token",
      created,
      updated: detail?.completed_at
        ? new Date(detail.completed_at).getTime()
        : created,
      ...(detail?.paid_at
        ? { paidAt: new Date(detail.paid_at).getTime() }
        : {}),
    },
  };
}
