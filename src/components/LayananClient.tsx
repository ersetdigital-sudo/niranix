"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  detectOperator,
  formatRupiah,
  isSlug,
  normalizePhone,
  priceList,
  providerLogoClass,
  services,
  simulateBill,
  type PriceItem,
  type Slug,
} from "@/lib/catalog";
import { ProviderLogo } from "./ProviderLogo";

export function LayananClient() {
  const router = useRouter();
  const params = useSearchParams();
  const requested = params.get("s");
  const slug: Slug = isSlug(requested) ? requested : "pulsa";
  const service = services[slug];
  const query = params.toString();

  const [target, setTarget] = useState(params.get("n") ?? "");
  const [provider, setProvider] = useState<string | null>(
    service.auto ? null : service.providers[0],
  );
  const [item, setItem] = useState<PriceItem | null>(null);

  useEffect(() => {
    const next = services[slug];
    setProvider(next.auto ? null : next.providers[0]);
    setItem(null);
    setTarget(new URLSearchParams(query).get("n") ?? "");
    document.title = `${next.title} · Niranix`;
  }, [slug, query]);

  const list = priceList(service, provider);
  const targetValid = service.auto
    ? normalizePhone(target).length >= 10
    : target.trim().length >= 6;
  const billAmount =
    service.bill && target.trim().length > 5
      ? simulateBill(target + (provider ?? ""))
      : null;
  const billItem: PriceItem | null =
    billAmount !== null ? [`Tagihan ${provider ?? ""}`, billAmount] : null;
  const effectiveItem = service.bill ? billItem : item;
  const canPay = targetValid && !!provider && !!effectiveItem;

  function handleTarget(value: string) {
    setTarget(value);
    if (!service.auto) return;

    const detected = detectOperator(value);
    if (detected !== provider) {
      setProvider(detected);
      setItem(null);
    }
  }

  function handleProvider(name: string) {
    setProvider(name);
    setItem(null);
  }

  function pay() {
    if (!canPay || !provider || !effectiveItem) return;
    const next = new URLSearchParams({
      s: slug,
      p: provider,
      i: effectiveItem[0],
      n: target.trim(),
      a: String(effectiveItem[1]),
    });
    router.push(`/checkout/?${next.toString()}`);
  }

  const summary: [string, string][] = [
    ["Layanan", service.title],
    ["Provider", provider ?? "-"],
    ["Produk", effectiveItem?.[0] ?? "-"],
    ["Tujuan", target.trim() || "-"],
  ];

  return (
    <main className="mx-auto max-w-6xl px-5 pb-36 pt-8 md:pt-14 lg:pb-16">
      <Link
        href="/#layanan"
        className="text-sm font-bold opacity-60 hover:opacity-100"
      >
        ← Semua layanan
      </Link>

      <div className="mt-5 grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          <div className="up relative overflow-hidden rounded-[2rem] bg-navy p-7 text-white md:p-9">
            <div
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/5"
              aria-hidden="true"
            />
            <p className="text-xs font-bold uppercase tracking-widest text-sun">
              {service.category}
            </p>
            <h1 className="d mt-2 text-4xl font-extrabold md:text-5xl">
              {service.title}
            </h1>
            <p className="mt-2 text-white/60">{service.description}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-sun" aria-hidden="true">
                  <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
                </svg>
                Proses cepat
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-sun" aria-hidden="true">
                  <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" />
                </svg>
                Auto refund
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-sun" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                24/7
              </span>
            </div>
          </div>

          <div className="up rounded-3xl bg-white p-6 md:p-7">
            <label htmlFor="target" className="flex items-center gap-2 font-bold">
              <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-sun text-xs">
                1
              </span>
              {service.inputLabel}
            </label>
            <input
              id="target"
              value={target}
              onChange={(event) => handleTarget(event.target.value)}
              inputMode={service.auto ? "numeric" : "text"}
              autoComplete={service.auto ? "tel" : "off"}
              placeholder={service.placeholder}
              className="mt-3 w-full rounded-2xl bg-mist px-5 py-4 font-semibold outline-none focus:ring-2 focus:ring-navy focus-visible:outline-none!"
            />
            {service.auto && provider ? (
              <div className="mt-3 flex items-center gap-3 rounded-2xl bg-mist px-4 py-3">
                <ProviderLogo name={provider} className="h-6 w-20 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-wide opacity-50">
                    Terdeteksi
                  </p>
                  <p className="truncate text-sm font-bold">{provider}</p>
                </div>
                <span className="ml-auto grid h-5 w-5 shrink-0 place-items-center rounded-full bg-navy text-sun">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" aria-hidden="true">
                    <path d="m5 12 5 5 9-10" />
                  </svg>
                </span>
              </div>
            ) : null}
            {target.length > 0 && !targetValid ? (
              <p className="mt-2 text-sm font-semibold text-red-600">
                Isi data tujuan dengan benar dulu ya.
              </p>
            ) : null}
          </div>

          {service.auto ? null : (
            <div className="up rounded-3xl bg-white p-6 md:p-7">
              <p className="flex items-center gap-2 font-bold">
                <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-sun text-xs">
                  2
                </span>
                Pilih provider
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5">
                {service.providers.map((name) => {
                  const isActive = provider === name;
                  const hasLogo = !!providerLogoClass(name);
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => handleProvider(name)}
                      aria-pressed={isActive}
                      className={`relative grid h-[74px] place-items-center rounded-2xl border-2 bg-white p-2.5 transition ${
                        isActive
                          ? "border-navy shadow-[0_0_0_3px_#FFE14F]"
                          : "border-navy/10 hover:border-navy/40"
                      }`}
                    >
                      <span
                        className={`absolute -right-2 -top-2 h-5 w-5 place-items-center rounded-full bg-navy text-sun ${
                          isActive ? "grid" : "hidden"
                        }`}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" aria-hidden="true">
                          <path d="m5 12 5 5 9-10" />
                        </svg>
                      </span>
                      {hasLogo ? (
                        <>
                          <ProviderLogo name={name} className="h-6 w-full" />
                          <span className="text-center text-[11px] font-bold leading-tight opacity-60">
                            {name}
                          </span>
                        </>
                      ) : (
                        <span className="text-center text-sm font-bold leading-tight">
                          {name}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="up rounded-3xl bg-white p-6 md:p-7">
            <p className="flex items-center gap-2 font-bold">
              <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-sun text-xs">
                {service.auto ? "2" : "3"}
              </span>
              {service.bill ? "Cek tagihan" : "Pilih nominal"}
            </p>

            {service.bill ? (
              billItem ? (
                <div className="mt-3 flex items-center justify-between gap-4 rounded-2xl border-2 border-navy bg-sun p-4 text-navy">
                  <div>
                    <b className="block">{billItem[0]}</b>
                    <span className="text-xs opacity-60">
                      a.n. Pelanggan {target.trim().slice(-4)} · termasuk admin Rp2.500
                    </span>
                  </div>
                  <b className="d whitespace-nowrap text-xl">
                    {formatRupiah(billItem[1])}
                  </b>
                </div>
              ) : (
                <p className="mt-3 rounded-2xl bg-mist p-4 text-sm opacity-60">
                  Isi {service.inputLabel.toLowerCase()} dulu, tagihan tampil otomatis.
                </p>
              )
            ) : service.auto && !provider ? (
              <p className="mt-3 rounded-2xl bg-mist p-4 text-sm opacity-60">
                Ketik nomor HP dulu, nominal muncul sesuai operatormu.
              </p>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {list.map((option) => {
                  const isActive = item?.[0] === option[0];
                  return (
                    <button
                      key={option[0]}
                      type="button"
                      onClick={() => setItem(option)}
                      aria-pressed={isActive}
                      className={`rounded-2xl border-2 p-4 text-left transition ${
                        isActive
                          ? "border-navy bg-sun"
                          : "border-navy/10 bg-white hover:border-navy"
                      }`}
                    >
                      <b className="block text-sm">{option[0]}</b>
                      <span className="text-xs opacity-60">
                        {formatRupiah(option[1])}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <aside className="up sticky top-24 hidden rounded-[2rem] bg-white p-6 shadow-[0_20px_50px_-25px_rgba(25,40,83,0.4)] md:p-7 lg:block">
          <p className="d text-xl font-extrabold">Ringkasan</p>
          <dl className="mt-4 space-y-3 text-sm">
            {summary.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-3">
                <dt className="opacity-50">{label}</dt>
                <dd className="truncate text-right font-bold">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 flex items-end justify-between border-t border-dashed border-navy/20 pt-5">
            <span className="text-sm opacity-50">Total</span>
            <span className="d text-3xl font-extrabold">
              {effectiveItem ? formatRupiah(effectiveItem[1]) : "Rp0"}
            </span>
          </div>
          <button
            type="button"
            onClick={pay}
            disabled={!canPay}
            className="mt-5 w-full rounded-2xl bg-navy py-4 font-bold text-sun transition hover:scale-[1.02] disabled:opacity-40"
          >
            Lanjut bayar →
          </button>
          <p className="mt-3 text-center text-xs opacity-50">
            Harga sudah termasuk biaya admin.
          </p>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-white/95 px-5 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_30px_-15px_rgba(25,40,83,0.3)] backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs opacity-60">
              {effectiveItem
                ? `${provider} · ${effectiveItem[0]}`
                : targetValid
                  ? "Pilih nominal dulu"
                  : `Isi ${service.inputLabel.toLowerCase()} dulu`}
            </p>
            <p className="d text-2xl font-extrabold leading-tight">
              {effectiveItem ? formatRupiah(effectiveItem[1]) : "Rp0"}
            </p>
          </div>
          <button
            type="button"
            onClick={pay}
            disabled={!canPay}
            className="rounded-2xl bg-navy px-6 py-3.5 font-bold text-sun disabled:opacity-40"
          >
            Bayar →
          </button>
        </div>
      </div>
    </main>
  );
}
