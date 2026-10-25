"use client";

import Link from "next/link";
import { useState } from "react";
import {
  categories,
  serviceSlugs,
  services,
  type Category,
} from "@/lib/catalog";
import { ServiceIcon } from "./ServiceIcon";

type Filter = "Semua" | Category;

const tabs: Filter[] = ["Semua", ...categories];

export function CatalogGrid() {
  const [filter, setFilter] = useState<Filter>("Semua");
  const cards = serviceSlugs
    .map((slug) => services[slug])
    .filter((service) => filter === "Semua" || service.category === filter);

  return (
    <section id="layanan" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
      <p className="text-sm font-bold uppercase tracking-widest text-navy/50">
        Katalog
      </p>
      <h2 className="d mt-2 max-w-2xl text-4xl font-extrabold md:text-5xl">
        Mau isi apa hari ini?
      </h2>
      <p className="mt-3 text-navy/70">
        Sembilan produk, dikelompokkan biar kamu nggak bingung nyarinya.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = filter === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                isActive
                  ? "border-navy bg-navy text-sun"
                  : "border-navy/15 bg-white hover:border-navy/40"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {cards.map((service, index) => (
          <Link
            key={`${filter}-${service.slug}`}
            href={`/layanan/?s=${service.slug}`}
            style={{ animationDelay: `${index * 45}ms` }}
            className="svc group relative overflow-hidden rounded-3xl border border-navy/10 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:bg-navy hover:text-white hover:shadow-[0_18px_40px_-18px_rgba(25,40,83,0.45)] md:p-6"
          >
            <div className="flex items-start justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sun text-navy">
                <ServiceIcon slug={service.slug} className="h-6 w-6" />
              </span>
              <span
                className="grid h-9 w-9 place-items-center rounded-full border border-navy/15 opacity-40 transition group-hover:-rotate-45 group-hover:border-transparent group-hover:bg-sun group-hover:text-navy group-hover:opacity-100"
                aria-hidden="true"
              >
                →
              </span>
            </div>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-widest opacity-50">
              {service.category}
            </p>
            <h3 className="d mt-1 text-lg font-bold md:text-xl">{service.title}</h3>
            <p className="mt-1 text-sm opacity-60">{service.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
