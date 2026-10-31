"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  detectOperator,
  formatRupiah,
  normalizePhone,
  priceList,
  quickServices,
  type PriceItem,
  type Service,
  type Slug,
} from "@/lib/catalog";
import { billItemFor } from "@/lib/catalog-hydrate";

const defaults: Record<string, string | null> = {
  pulsa: null,
  "paket-data": null,
  pln: "PLN Prabayar",
  game: "Mobile Legends",
  "e-wallet": "DANA",
  pdam: "PDAM Jakarta",
};

export function QuickOrder({ services }: { services: Record<string, Service> }) {
  const router = useRouter();
  const [slug, setSlug] = useState<Slug>("pulsa");
  const [target, setTarget] = useState("");
  const [provider, setProvider] = useState<string | null>(null);
  const [selected, setSelected] = useState<PriceItem | null>(null);

  const service = services[slug];
  const list = priceList(service, provider);
  const targetValid = service.auto
    ? normalizePhone(target).length >= 10
    : target.trim().length >= 6;
  const billItem: PriceItem | null = targetValid
    ? billItemFor(service, provider)
    : null;
  const effectiveItem = service.bill ? billItem : selected;
  const canPay = !!provider && !!effectiveItem && targetValid;

  function chooseService(next: Slug) {
    setSlug(next);
    setTarget("");
    setProvider(defaults[next] ?? null);
    setSelected(null);
  }

  function changeTarget(value: string) {
    setTarget(value);
    if (!service.auto) return;

    const detected = detectOperator(value);
    if (detected !== provider) {
      setProvider(detected);
      setSelected(null);
    }
  }

  function pay() {
    if (!canPay || !provider || !effectiveItem) return;
    const params = new URLSearchParams({
      s: slug,
      p: provider,
      i: effectiveItem[0],
      n: target.trim(),
      a: String(effectiveItem[1]),
      sid: service.dbServiceId ?? "",
      pid: effectiveItem[2] ?? "",
    });
    router.push(`/checkout/?${params.toString()}`);
  }

  return (
    <div
      id="beli"
      className="scroll-mt-24 rounded-[2rem] bg-navy p-6 text-white shadow-[12px_12px_0_#FFE14F] md:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="d text-2xl font-bold">Order sekarang</h2>
          <p className="text-sm text-white/60">Isi tiga hal, beres.</p>
        </div>
        <span className="whitespace-nowrap rounded-full bg-sun px-2.5 py-1 text-xs font-bold text-navy">
          Order 24/7
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-sm">
        {quickServices.map((item) => {
          const isActive = slug === item.slug;
          return (
            <button
              key={item.slug}
              type="button"
              onClick={() => chooseService(item.slug)}
              aria-pressed={isActive}
              className={`rounded-full border px-3.5 py-1.5 transition ${
                isActive
                  ? "border-sun bg-sun font-semibold text-navy"
                  : "border-white/25 text-white hover:border-white/50"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <label htmlFor="quick-target" className="mt-5 block text-sm text-white/70">
        {service.inputLabel}
      </label>
      <input
        id="quick-target"
        value={target}
        onChange={(event) => changeTarget(event.target.value)}
        inputMode={service.auto ? "numeric" : "text"}
        autoComplete={service.auto ? "tel" : "off"}
        placeholder={service.placeholder}
        className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-sun focus-visible:outline-none!"
      />

      {service.auto ? (
        <p className={`mt-2 text-xs font-semibold ${provider ? "text-sun" : "text-white/40"}`}>
          {provider ? `Operator terdeteksi: ${provider}` : "Operator terdeteksi otomatis."}
        </p>
      ) : null}

      <p className="mt-5 text-sm text-white/70">
        {service.bill ? "Tagihan" : "Pilih nominal"}
      </p>

      {service.bill ? (
        billItem ? (
          <div className="mt-2 rounded-xl bg-sun p-4 text-navy">
            <div className="flex items-center justify-between gap-3">
              <div>
                <b className="block text-sm">{billItem[0]}</b>
                <span className="text-xs opacity-60">
                  Nominal tagihan dari katalog
                </span>
              </div>
              <b className="d whitespace-nowrap text-xl">{formatRupiah(billItem[1])}</b>
            </div>
          </div>
        ) : (
          <p className="mt-2 rounded-xl border border-dashed border-white/20 p-4 text-xs text-white/50">
            Isi {service.inputLabel.toLowerCase()} dulu, tagihan muncul otomatis.
          </p>
        )
      ) : service.auto && !provider ? (
        <p className="mt-2 rounded-xl border border-dashed border-white/20 p-4 text-xs text-white/50">
          Ketik nomor HP dulu, nominal muncul sesuai operatormu.
        </p>
      ) : (
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {list.slice(0, 6).map((option) => {
            const isSelected = selected?.[0] === option[0];
            return (
              <button
                key={option[0]}
                type="button"
                onClick={() => setSelected(option)}
                aria-pressed={isSelected}
                className={`rounded-xl border-2 p-3 text-left transition ${
                  isSelected
                    ? "border-sun bg-sun text-navy"
                    : "border-white/15 bg-white/5 text-white hover:border-white/40"
                }`}
              >
                <b className="d block text-sm leading-tight">{option[0]}</b>
                <span className="text-[11px] opacity-70">{formatRupiah(option[1])}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-5 flex items-center justify-between rounded-xl bg-white/10 p-4">
        <div>
          <p className="text-xs text-white/60">Total bayar</p>
          <p className="d text-2xl font-bold">
            {effectiveItem ? formatRupiah(effectiveItem[1]) : "Rp0"}
          </p>
        </div>
        <button
          type="button"
          onClick={pay}
          disabled={!canPay}
          className="rounded-full bg-sun px-6 py-3 font-bold text-navy transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-35"
        >
          Bayar →
        </button>
      </div>

      <p className="mt-4 text-[11px] text-white/50">
        QRIS · semua e-wallet &amp; m-banking · tanpa biaya tambahan
      </p>
    </div>
  );
}
