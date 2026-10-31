import type { Metadata } from "next";
import { Suspense } from "react";
import { LayananClient } from "@/components/LayananClient";
import { isSlug, services } from "@/lib/catalog";
import { getHydratedService } from "@/lib/catalog-hydrate";
import "@/app/logos.css";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Pilih layanan Niranix: pulsa, paket data, token PLN, e-wallet, game, dan tagihan bulanan.",
};

export default async function LayananPage({
  searchParams,
}: {
  searchParams: Promise<{ s?: string | string[] }>;
}) {
  const params = await searchParams;
  const requested = Array.isArray(params.s) ? params.s[0] : params.s;
  const slug = isSlug(requested) ? requested : "pulsa";
  const { service } = await getHydratedService(slug);

  return (
    <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
      <LayananClient key={slug} service={service ?? services[slug]} />
    </Suspense>
  );
}
