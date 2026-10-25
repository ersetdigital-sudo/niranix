"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const navigation = [
  { href: "/", label: "Beranda" },
  { href: "/#layanan", label: "Layanan" },
  { href: "/#cara", label: "Cara Bayar" },
  { href: "/cek-transaksi/", label: "Cek Transaksi" },
  { href: "/bantuan/", label: "Bantuan" },
];

function activeLabel(pathname: string) {
  if (pathname === "/") return "Beranda";
  if (pathname.startsWith("/layanan")) return "Layanan";
  if (pathname.startsWith("/cek-transaksi")) return "Cek Transaksi";
  if (pathname.startsWith("/bantuan")) return "Bantuan";
  return "";
}

export function SiteHeader() {
  const rawPathname = usePathname();
  const pathname = rawPathname.replace(/\/+$/, "") || "/";
  const active = activeLabel(pathname);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-mist/85 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Logo />

        <div className="hidden items-center gap-1 rounded-full bg-navy/5 p-1 text-sm font-semibold lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={active === item.label ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 transition ${
                active === item.label
                  ? "bg-white text-navy shadow-sm"
                  : "hover:bg-white/70"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/#beli"
            className="rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-sun transition hover:scale-105"
          >
            Order kilat
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white lg:hidden"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#192853" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#192853" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h10" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-nav" className="px-5 pb-4 lg:hidden">
          <div className="rounded-2xl bg-white p-2 shadow-lg">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active === item.label ? "page" : undefined}
                className={`block rounded-xl px-4 py-3 font-bold ${
                  active === item.label ? "bg-sun" : "hover:bg-mist"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
