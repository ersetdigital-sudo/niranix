"use client";

import Link from "next/link";
import { useState } from "react";
import { ADMIN_WHATSAPP, ADMIN_WHATSAPP_URL } from "@/lib/catalog";

type Faq = {
  category: string;
  question: string;
  answer: string;
  keywords: string;
};

const faqs: Faq[] = [
  {
    category: "Pembayaran",
    question: "Pembayaran sudah, tapi status masih menunggu?",
    answer:
      "Pembayaran QRIS dicek manual oleh admin. Kalau status belum berubah, kirim bukti bayar lewat WhatsApp dengan menyertakan kode invoice.",
    keywords: "qris menunggu status bukti transfer manual verifikasi",
  },
  {
    category: "Pembayaran",
    question: "Metode pembayaran apa saja?",
    answer: "QRIS — bisa dari semua e-wallet dan m-banking.",
    keywords: "qris dana ovo gopay shopeepay bank mbanking metode",
  },
  {
    category: "Pembayaran",
    question: "Kenapa pembayaran dicek manual?",
    answer:
      "Supaya nominal dan bukti bayar cocok dengan pesanan. Setelah terverifikasi, status berubah menjadi Sedang diproses.",
    keywords: "manual admin verifikasi konfirmasi nominal",
  },
  {
    category: "Transaksi",
    question: "Salah input nomor tujuan, bisa dibatalkan?",
    answer:
      "Transaksi yang sudah sukses tidak bisa dibatalkan. Kalau masih diproses, segera hubungi admin lewat WhatsApp.",
    keywords: "salah nomor tujuan batal ubah",
  },
  {
    category: "Transaksi",
    question: "Token PLN belum muncul?",
    answer:
      "Buka halaman Cek Transaksi dan masukkan kode NRX-. Token tampil setelah pembayaran terverifikasi dan pesanan diproses.",
    keywords: "token pln belum muncul kode cek transaksi",
  },
  {
    category: "Transaksi",
    question: "Berapa lama pesanan diproses?",
    answer:
      "Setelah pembayaran terkonfirmasi, pesanan biasanya diproses dalam hitungan detik.",
    keywords: "lama proses cepat masuk tunggu",
  },
  {
    category: "Refund",
    question: "Berapa lama refund masuk?",
    answer:
      "Refund dikembalikan ke metode pembayaran awal, umumnya 1x24 jam di hari kerja.",
    keywords: "refund dana kembali gagal",
  },
  {
    category: "Akun",
    question: "Perlu daftar akun?",
    answer: "Nggak perlu. Cukup isi nomor, pilih nominal, lalu bayar.",
    keywords: "akun daftar login register",
  },
];

const categories = ["Semua", ...Array.from(new Set(faqs.map((item) => item.category)))];

export function BantuanClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");

  const needle = query.trim().toLowerCase();
  const filtered = faqs.filter((item) => {
    if (category !== "Semua" && item.category !== category) return false;
    if (!needle) return true;
    return `${item.category} ${item.question} ${item.answer} ${item.keywords}`
      .toLowerCase()
      .includes(needle);
  });

  return (
    <main className="mx-auto max-w-6xl px-5 pb-16 pt-12 md:pt-20">
      <div className="up mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-navy/50">
          Pusat bantuan
        </p>
        <h1 className="d mt-2 text-5xl font-extrabold md:text-6xl">
          Ada yang bisa
          <br />
          kami bantu?
        </h1>
        <div className="mt-8 flex items-center gap-3 rounded-full bg-white p-2 pl-6 shadow-[0_20px_50px_-25px_rgba(25,40,83,0.4)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#192853" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <label htmlFor="faq-search" className="sr-only">
            Cari pertanyaan
          </label>
          <input
            id="faq-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari: refund, token, QRIS..."
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-3 font-semibold outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Hapus pencarian"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-navy/50 hover:bg-mist hover:text-navy"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {categories.map((item) => {
          const isActive = category === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                isActive
                  ? "border-navy bg-navy text-sun"
                  : "border-navy/15 bg-white hover:border-navy/40"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-8 max-w-3xl space-y-3">
        {filtered.length ? (
          filtered.map((item, index) => (
            <details
              key={item.question}
              className="up rounded-2xl bg-white px-6 py-5"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <summary className="flex cursor-pointer list-none justify-between gap-4 text-lg font-bold">
                <span>
                  <span className="block text-[11px] uppercase tracking-widest opacity-40">
                    {item.category}
                  </span>
                  {item.question}
                </span>
                <span className="pl text-2xl leading-none" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 opacity-70">{item.answer}</p>
            </details>
          ))
        ) : (
          <p className="mt-8 text-center text-navy/50">
            Belum ketemu jawabannya. Langsung tanya kami aja di bawah.
          </p>
        )}
      </div>

      <section id="kontak" className="mt-20 grid gap-4 md:grid-cols-3">
        <a
          href={ADMIN_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-3xl bg-navy p-7 text-white md:col-span-2"
        >
          <div
            className="absolute -bottom-12 -right-12 h-52 w-52 rounded-full bg-sun/15 transition duration-700 group-hover:scale-125"
            aria-hidden="true"
          />
          <span className="relative rounded-full bg-sun px-3 py-1 text-xs font-bold text-navy">
            WhatsApp admin
          </span>
          <h2 className="d relative mt-5 text-3xl font-extrabold md:text-4xl">
            Chat via WhatsApp
          </h2>
          <p className="relative mt-2 max-w-md text-white/60">
            Admin akan membalas secepatnya. Sertakan kode invoice NRX- atau nomor HP
            biar cepat dicek.
          </p>
          <span className="relative mt-6 inline-block rounded-full bg-sun px-6 py-3 font-bold text-navy">
            Mulai chat →
          </span>
          <p className="relative mt-4 text-xs text-white/40">{ADMIN_WHATSAPP}</p>
        </a>

        <div className="grid gap-4">
          <Link
            href="/cek-transaksi/"
            className="rounded-3xl bg-sun p-6 transition hover:-translate-y-1"
          >
            <p className="text-xs font-bold uppercase tracking-widest opacity-60">
              Cepat
            </p>
            <p className="d mt-1 text-xl font-bold">Cek status transaksi →</p>
          </Link>
          <Link
            href="/#cara"
            className="rounded-3xl bg-white p-6 transition hover:-translate-y-1"
          >
            <p className="text-xs font-bold uppercase tracking-widest opacity-50">
              Panduan
            </p>
            <p className="d mt-1 text-xl font-bold">Cara bayar QRIS →</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
