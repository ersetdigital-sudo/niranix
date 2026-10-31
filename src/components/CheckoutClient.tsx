"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ADMIN_WHATSAPP,
  ADMIN_WHATSAPP_URL,
  formatRupiah,
  isSlug,
  QRIS_IMAGE,
  services,
} from "@/lib/catalog";
import { createOrder } from "@/lib/db/client";
import { toPublicError } from "@/lib/db/errors";
import { ServiceIcon } from "./ServiceIcon";

function clock(total: number) {
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(
    total % 60,
  ).padStart(2, "0")}`;
}

export function CheckoutClient({
  brandSlug,
  qrisMethodId,
  qrisImageUrl,
}: {
  brandSlug: string;
  qrisMethodId: string | null;
  qrisImageUrl: string | null;
}) {
  const params = useSearchParams();
  const requested = params.get("s");
  const slug = isSlug(requested) ? requested : null;
  const service = slug ? services[slug] : null;
  const provider = params.get("p") ?? "";
  const item = params.get("i") ?? "";
  const target = params.get("n") ?? "";
  const amount = Number(params.get("a")) || 0;
  const serviceId = params.get("sid") ?? "";
  const productId = params.get("pid") ?? "";
  const valid = !!service && !!provider && !!item && !!target && amount > 0;

  const [inv, setInv] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const [expiresAt, setExpiresAt] = useState(0);
  const [left, setLeft] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const [creating, setCreating] = useState(false);
  const [payError, setPayError] = useState("");
  const [paid, setPaid] = useState(false);
  const createdRef = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function create() {
    if (!service || !valid) return;
    if (!serviceId || !productId) {
      setPayError("Data pesanan belum lengkap. Ulangi dari halaman layanan.");
      createdRef.current = false;
      return;
    }
    if (!brandSlug || !qrisMethodId) {
      setPayError("Pembayaran belum tersedia. Coba lagi sebentar.");
      createdRef.current = false;
      return;
    }

    setCreating(true);
    setPayError("");
    try {
      const created = await createOrder({
        brandSlug,
        serviceId,
        productId,
        nomorTujuan: target.trim(),
        input: { provider, item, nomor_tujuan: target.trim() },
        paymentMethodId: qrisMethodId,
      });
      const expiry = new Date(created.expires_at).getTime();
      setInv(created.ref);
      setOrderTotal(created.total);
      setExpiresAt(expiry);
      setLeft(Math.max(1, Math.ceil((expiry - Date.now()) / 1000)));
      setTimedOut(false);
    } catch (failure) {
      setPayError(toPublicError(failure).message);
      createdRef.current = false;
    } finally {
      setCreating(false);
    }
  }

  useEffect(() => {
    if (!valid || createdRef.current) return;
    createdRef.current = true;
    void create();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valid]);

  useEffect(() => {
    if (!expiresAt || paid) return;
    const tick = () => {
      const next = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
      setLeft(next);
      if (next <= 0) setTimedOut(true);
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [expiresAt, paid]);

  if (!service || !valid) {
    return (
      <main className="mx-auto max-w-4xl px-5 pb-20 pt-12 md:pt-20">
        <div className="rounded-3xl bg-white p-8 text-center lg:p-12">
          <p className="d text-2xl font-extrabold">Keranjangmu kosong</p>
          <p className="mt-2 text-navy/60">
            Pilih layanan dan nominal dulu, lalu lanjutkan ke pembayaran.
          </p>
          <Link
            href="/#layanan"
            className="mt-6 inline-block rounded-full bg-navy px-6 py-3 font-bold text-sun"
          >
            Pilih layanan
          </Link>
        </div>
      </main>
    );
  }

  const displayTotal = inv ? orderTotal : amount;
  const waConfirm = `${ADMIN_WHATSAPP_URL}?text=${encodeURIComponent(
    `Halo admin Niranix, saya sudah bayar QRIS${inv ? ` untuk transaksi ${inv}` : "."}`,
  )}`;
  const payDisabled = creating || !inv || timedOut;

  return (
    <main className="mx-auto max-w-5xl px-5 pb-36 pt-8 md:pt-14 lg:pb-16">
      <ol className="mb-6 flex flex-wrap items-center gap-2 text-xs font-bold">
        <li className="rounded-full bg-navy px-3 py-1.5 text-sun">1 Detail</li>
        <li className="opacity-30">—</li>
        <li className="rounded-full bg-navy px-3 py-1.5 text-sun">2 Pembayaran</li>
        <li className="opacity-30">—</li>
        <li
          className={`rounded-full px-3 py-1.5 ${
            paid ? "bg-navy text-sun" : "bg-white"
          }`}
        >
          3 {paid ? "Diproses" : "Status"}
        </li>
      </ol>

      <div className="grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          {paid ? (
            <section className="up rounded-3xl bg-white p-6 shadow-[0_20px_50px_-25px_rgba(25,40,83,0.4)] md:p-8">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sun text-navy">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 12 5 5 9-10" />
                  </svg>
                </span>
                <div>
                  <p aria-live="polite" className="d text-2xl font-extrabold leading-tight">
                    Terima kasih, pembayaran Anda sedang diproses
                  </p>
                  <p className="mt-2 text-sm text-navy/60">
                    Admin akan memverifikasi pembayaran QRIS Anda secara manual.
                    Simpan kode invoice untuk melacak pesanan.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-mist p-5">
                <p className="text-xs font-bold uppercase tracking-widest opacity-50">
                  Kode invoice
                </p>
                <p className="d mt-1 text-2xl font-extrabold">{inv || "—"}</p>
                <p className="mt-2 text-sm text-navy/60">
                  Total {formatRupiah(displayTotal)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                  <Link
                    href={`/cek-transaksi/?id=${inv}`}
                    className="rounded-full bg-navy px-5 py-2.5 font-bold text-sun"
                  >
                    Cek status
                  </Link>
                  <a
                    href={waConfirm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-navy/15 px-5 py-2.5 font-semibold hover:bg-white"
                  >
                    Konfirmasi via WhatsApp
                  </a>
                </div>
              </div>
            </section>
          ) : (
            <section className="up rounded-3xl bg-white p-6 md:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="d text-2xl font-extrabold">Pembayaran QRIS</p>
                  <p className="mt-1 text-sm text-navy/60">
                    Scan dari e-wallet atau m-banking apa pun.
                  </p>
                </div>
                <span className="rounded-full bg-sun px-3 py-1.5 text-xs font-extrabold">
                  QRIS
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-mist px-4 py-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                    Kode invoice
                  </p>
                  <p className="d text-lg font-extrabold">
                    {inv || (creating ? "Menyiapkan…" : "—")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                    Selesaikan dalam
                  </p>
                  <p className="d text-lg font-extrabold">
                    {!inv ? "—" : timedOut ? "Waktu habis" : clock(left)}
                  </p>
                </div>
              </div>

              {payError ? (
                <div className="mt-4 rounded-2xl border border-red-300 bg-red-50 p-4 text-xs text-red-700">
                  <p className="font-bold">{payError}</p>
                  <button
                    type="button"
                    onClick={() => {
                      if (!creating) {
                        createdRef.current = true;
                        void create();
                      }
                    }}
                    className="mt-2 rounded-full border border-red-400 px-3 py-1.5 font-bold"
                  >
                    Coba lagi
                  </button>
                </div>
              ) : null}

              <div className="mt-5 grid items-center gap-6 rounded-2xl bg-mist p-4 sm:grid-cols-[220px_1fr] sm:p-6">
                <div className="rounded-2xl bg-white p-3">
                  <img
                    src={qrisImageUrl || QRIS_IMAGE}
                    alt="QRIS pembayaran Niranix Digital"
                    width={440}
                    height={440}
                    className="h-auto w-full rounded-xl"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-50">
                    Total bayar
                  </p>
                  <p className="d mt-1 text-3xl font-extrabold">
                    {formatRupiah(displayTotal)}
                  </p>
                  <ol className="mt-4 space-y-2 text-sm text-navy/60">
                    <li>1. Buka e-wallet atau m-banking.</li>
                    <li>2. Scan QRIS di samping.</li>
                    <li>3. Bayar sesuai nominal.</li>
                    <li>4. Tekan “Saya sudah bayar”.</li>
                  </ol>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                {["Semua e-wallet", "Semua m-banking", "Verifikasi admin"].map(
                  (badge) => (
                    <span key={badge} className="rounded-full bg-mist px-3 py-1.5">
                      {badge}
                    </span>
                  ),
                )}
              </div>

              <button
                type="button"
                onClick={() => setPaid(true)}
                disabled={payDisabled}
                className="mt-5 hidden w-full rounded-2xl bg-navy py-4 font-bold text-sun transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 lg:block"
              >
                {creating ? "Menyiapkan…" : "Saya sudah bayar"}
              </button>

              <p className="mt-4 rounded-2xl bg-mist p-4 text-xs text-navy/60">
                Bayar sesuai nominal agar mudah diverifikasi. Kalau status belum
                berubah, hubungi admin lewat WhatsApp.
              </p>
            </section>
          )}

          <section className="up rounded-3xl bg-white p-6 md:p-7">
            <p className="font-bold">Butuh bantuan?</p>
            <p className="mt-2 text-sm text-navy/60">
              Admin Niranix siap bantu cek pembayaran atau kendala pesanan.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={ADMIN_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-sun px-5 py-2.5 text-sm font-bold text-navy"
              >
                WhatsApp {ADMIN_WHATSAPP}
              </a>
              <Link
                href="/cek-transaksi/"
                className="rounded-full border border-navy/15 px-5 py-2.5 text-sm font-semibold hover:bg-mist"
              >
                Cek transaksi
              </Link>
            </div>
          </section>
        </div>

        <aside className="up sticky top-24 rounded-[2rem] bg-navy p-6 text-white md:p-7">
          <p className="d text-xl font-extrabold">Pesananmu</p>

          <div className="mt-4 flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sun text-navy">
              <ServiceIcon slug={service.slug} className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <b className="block truncate">
                {service.title} · {item}
              </b>
              <p className="truncate text-xs text-white/50">
                {provider} · {target}
              </p>
            </div>
          </div>

          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-white/50">Harga</dt>
              <dd className="font-bold">{formatRupiah(amount)}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-white/50">Biaya admin</dt>
              <dd className="font-bold">Termasuk</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-white/50">Metode</dt>
              <dd className="font-bold">QRIS</dd>
            </div>
          </dl>

          <div className="mt-5 flex items-end justify-between border-t border-dashed border-white/20 pt-5">
            <span className="text-sm text-white/50">Total bayar</span>
            <span className="d text-3xl font-extrabold text-sun">
              {formatRupiah(displayTotal)}
            </span>
          </div>

          {paid || inv ? (
            <div className="mt-5 rounded-2xl bg-white/10 p-4 text-sm">
              <p className="text-xs uppercase tracking-widest text-white/50">
                Status
              </p>
              <p className="mt-1 inline-flex items-center gap-2 font-bold text-sun">
                <span className="h-2 w-2 rounded-full bg-sun" />
                {paid ? "Sedang diproses" : "Menunggu pembayaran"}
              </p>
              {inv ? (
                <p className="mt-1 text-xs text-white/50">Invoice {inv}</p>
              ) : null}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setPaid(true)}
              disabled={payDisabled}
              className="mt-5 hidden w-full rounded-2xl bg-sun py-4 font-bold text-navy transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 lg:block"
            >
              {creating ? "Menyiapkan…" : "Saya sudah bayar"}
            </button>
          )}

          <p className="mt-3 text-center text-xs text-white/40">
            Pembayaran dicek manual oleh admin
          </p>
        </aside>
      </div>

      {paid ? null : (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-white/95 px-5 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_30px_-15px_rgba(25,40,83,0.3)] backdrop-blur lg:hidden">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs opacity-60">Total bayar</p>
              <p className="d text-2xl font-extrabold leading-tight">
                {formatRupiah(displayTotal)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setPaid(true)}
              disabled={payDisabled}
              className="rounded-2xl bg-navy px-6 py-3.5 font-bold text-sun disabled:cursor-not-allowed disabled:opacity-50"
            >
              {creating ? "Menyiapkan…" : "Saya sudah bayar"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
