"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_WHATSAPP, ADMIN_WHATSAPP_URL } from "@/lib/catalog";
import { Logo } from "./Logo";

export function SiteFooter() {
  const rawPathname = usePathname();
  const pathname = rawPathname.replace(/\/+$/, "") || "/";
  const hideOnMobile = pathname === "/layanan" || pathname === "/checkout";

  return (
    <footer
      className={`${hideOnMobile ? "hidden lg:block" : ""} relative mt-10 overflow-hidden rounded-t-[2.5rem] bg-navy text-white`}
    >
      <div
        className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sun/10"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-5 pb-8 pt-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo onDark />
            <p className="mt-4 max-w-xs text-sm text-white/60">
              Pulsa, kuota, token, tagihan, sampai top up game. Bayar sekali lewat
              QRIS, beres.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#4ade80]" />
              Semua sistem normal
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-sun">Produk</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li><Link href="/layanan/?s=pulsa" className="hover:text-white">Pulsa &amp; Data</Link></li>
              <li><Link href="/layanan/?s=pln" className="hover:text-white">Token PLN</Link></li>
              <li><Link href="/layanan/?s=game" className="hover:text-white">Top Up Game</Link></li>
              <li><Link href="/layanan/?s=e-wallet" className="hover:text-white">E-Wallet</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-sun">Bantuan</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li><Link href="/cek-transaksi/" className="hover:text-white">Cek Transaksi</Link></li>
              <li><Link href="/bantuan/" className="hover:text-white">Pusat Bantuan</Link></li>
              <li><Link href="/#cara" className="hover:text-white">Cara Bayar</Link></li>
              <li>
                <a
                  href={ADMIN_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Hubungi Kami
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-sun">Pembayaran</p>
            <p className="mt-4 inline-flex rounded-lg bg-sun px-3 py-1.5 text-sm font-extrabold text-navy">
              QRIS
            </p>
            <p className="mt-3 text-sm text-white/70">
              Scan dari e-wallet atau m-banking apa pun. Pembayaran dicek manual oleh
              admin.
            </p>
            <a
              href={ADMIN_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-xs font-semibold text-sun hover:text-white"
            >
              WhatsApp {ADMIN_WHATSAPP}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© 2026 Niranix Digital. Semua hak dilindungi.</p>
          <p>QRIS · E-Wallet · M-Banking</p>
        </div>
      </div>
    </footer>
  );
}
