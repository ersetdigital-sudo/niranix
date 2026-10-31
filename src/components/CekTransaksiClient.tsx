"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ADMIN_WHATSAPP_URL, formatRupiah } from "@/lib/catalog";

type PublicStatus = "success" | "processing" | "pending" | "expired";

type SearchOrder = {
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

const statusText: Record<PublicStatus, string> = {
  pending: "Menunggu pembayaran",
  processing: "Sedang diproses",
  success: "Selesai",
  expired: "Dibatalkan",
};

function formatDate(value: number) {
  return new Date(value).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function CekTransaksiClient() {
  const params = useSearchParams();
  const initialId = params.get("id") ?? "";
  const [query, setQuery] = useState(initialId);
  const [result, setResult] = useState<SearchOrder | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (value: string) => {
    const term = value.trim();
    setQuery(term);
    if (!term) return;
    setLoading(true);
    try {
      const response = await fetch(
        `/api/orders/lookup?q=${encodeURIComponent(term)}`,
        { cache: "no-store" },
      );
      setResult(response.ok ? ((await response.json()) as SearchOrder) : null);
    } catch {
      setResult(null);
    } finally {
      setSearched(true);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialId) void search(initialId);
  }, [initialId, search]);

  return (
    <main className="mx-auto max-w-6xl px-5 pb-16 pt-12 md:pt-20">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="up">
          <p className="text-sm font-bold uppercase tracking-widest text-navy/50">
            Cek transaksi
          </p>
          <h1 className="d mt-2 text-5xl font-extrabold md:text-6xl">
            Pesananmu
            <br />
            udah sampai mana?
          </h1>
          <p className="mt-4 max-w-md text-navy/60">
            Masukkan kode transaksi dari halaman pembayaran, atau nomor HP yang kamu
            isi waktu order.
          </p>

          <form
            className="mt-8 flex flex-col gap-2 rounded-3xl bg-white p-3 shadow-[0_20px_50px_-25px_rgba(25,40,83,0.4)] sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              void search(query);
            }}
          >
            <label htmlFor="track-query" className="sr-only">
              Kode transaksi atau nomor HP
            </label>
            <input
              id="track-query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="NRX-XXXXXX atau 08xx"
              autoComplete="off"
              className="min-w-0 flex-1 rounded-2xl bg-mist px-5 py-4 font-semibold outline-none focus:ring-2 focus:ring-navy focus-visible:outline-none!"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-navy px-7 py-4 font-bold text-sun transition hover:scale-[1.02] disabled:opacity-60"
            >
              {loading ? "Mencari…" : "Lacak →"}
            </button>
          </form>

          <p className="mt-3 text-xs text-navy/50">
            Kode transaksi muncul setelah pembayaran dibuat.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-3 text-center">
            {[
              ["Sukses", "Produk terkirim"],
              ["Proses", "Tunggu sebentar"],
              ["Refund", "Dana kembali"],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-2xl bg-white p-4">
                <p className="d text-xl font-extrabold">{title}</p>
                <p className="mt-1 text-xs opacity-50">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="up relative min-h-[420px] overflow-hidden rounded-[2rem] bg-navy p-7 text-white md:p-9"
          style={{ animationDelay: "0.15s" }}
          aria-live="polite"
        >
          <div
            className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-sun/10"
            aria-hidden="true"
          />

          {!searched ? (
            <div className="relative grid min-h-[340px] place-items-center py-16 text-center">
              <div>
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/10">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFE14F" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </div>
                <p className="d mt-5 text-2xl font-bold">Hasil muncul di sini</p>
                <p className="mt-2 text-sm text-white/50">
                  Status, detail produk, dan kode invoice.
                </p>
              </div>
            </div>
          ) : loading ? (
            <div className="relative grid min-h-[340px] place-items-center py-16 text-center">
              <p className="d text-2xl font-bold">Mencari transaksi…</p>
            </div>
          ) : result ? (
            <OrderResult order={result} />
          ) : (
            <div className="relative grid min-h-[340px] place-items-center py-10 text-center">
              <div>
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/10">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFE14F" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v5M12 16h.01" />
                  </svg>
                </div>
                <p className="d mt-5 text-2xl font-bold">Belum ketemu</p>
                <p className="mx-auto mt-2 max-w-xs text-sm text-white/50">
                  Transaksi dengan kode atau nomor itu tidak ditemukan. Cek lagi
                  datanya, atau tanya admin.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2 text-sm">
                  <Link
                    href="/#layanan"
                    className="rounded-full bg-sun px-5 py-2.5 font-bold text-navy"
                  >
                    Buat pesanan
                  </Link>
                  <a
                    href={ADMIN_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/20 px-5 py-2.5 font-semibold"
                  >
                    Chat admin
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function OrderResult({ order }: { order: SearchOrder }) {
  const [copied, setCopied] = useState(false);
  const target =
    order.lines.find(([label]) => /tujuan/i.test(label))?.[1] ?? "-";

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(order.inv);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="relative">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/50">
            ID Transaksi
          </p>
          <p className="d mt-1 text-2xl font-extrabold">{order.inv}</p>
        </div>
        <span className="rounded-full bg-sun px-3 py-1.5 text-xs font-bold text-navy">
          ● {statusText[order.status]}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-xs text-white/50">Produk</p>
          <p className="mt-1 font-bold">
            {order.product || order.service}
          </p>
        </div>
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-xs text-white/50">Total bayar</p>
          <p className="mt-1 font-bold">{formatRupiah(order.total)}</p>
        </div>
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-xs text-white/50">Layanan</p>
          <p className="mt-1 font-bold">{order.service}</p>
        </div>
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-xs text-white/50">Tujuan</p>
          <p className="mt-1 truncate font-bold">{target}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-sun p-4 text-navy">
        <div className="min-w-0">
          <p className="text-xs font-bold opacity-60">Kode invoice</p>
          <p className="truncate font-mono text-lg font-bold tracking-wider">
            {order.inv}
          </p>
        </div>
        <button
          type="button"
          onClick={copyCode}
          className="shrink-0 rounded-xl bg-navy px-3 py-2 text-xs font-bold text-sun"
        >
          {copied ? "✓ Tersalin" : "Salin"}
        </button>
      </div>

      {order.sn ? (
        <div className="mt-3 rounded-2xl border border-sun/40 bg-white/10 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-white/50">
            {order.label}
          </p>
          <p className="d mt-1 break-all text-lg font-extrabold text-sun">
            {order.sn}
          </p>
        </div>
      ) : null}

      <ol className="mt-7 space-y-5">
        <li className="flex gap-4">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sun font-bold text-navy">
            ✓
          </span>
          <div>
            <p className="font-bold">Pesanan dibuat</p>
            <p className="text-xs text-white/50">
              {formatDate(order.created)} WIB
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-sun">
            <span className="h-2 w-2 rounded-full bg-sun" />
          </span>
          <div>
            <p className="font-bold">{statusText[order.status]}</p>
            <p className="text-xs text-white/50">
              {order.status === "pending"
                ? "Selesaikan pembayaran QRIS sesuai nominal."
                : order.status === "processing"
                  ? "Pembayaran QRIS dicek manual oleh admin."
                  : order.status === "success"
                    ? "Pembayaran diterima dan pesanan sudah diproses."
                    : "Transaksi dibatalkan atau kedaluwarsa."}
            </p>
          </div>
        </li>
        <li
          className={`flex gap-4 ${
            order.status === "success" ? "" : "opacity-35"
          }`}
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/30">
            3
          </span>
          <div>
            <p className="font-bold">Pesanan selesai</p>
            <p className="text-xs text-white/50">
              Produk terkirim setelah pembayaran terverifikasi.
            </p>
          </div>
        </li>
      </ol>

      <a
        href={`${ADMIN_WHATSAPP_URL}?text=${encodeURIComponent(
          `Halo admin Niranix, saya ingin cek transaksi ${order.inv}.`,
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block text-sm font-bold text-sun hover:text-white"
      >
        Tanya admin soal transaksi ini →
      </a>
    </div>
  );
}
