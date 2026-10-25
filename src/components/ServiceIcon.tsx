import type { ReactNode } from "react";
import type { Slug } from "@/lib/catalog";

const paths: Record<Slug, ReactNode> = {
  pulsa: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  "paket-data": <path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01" />,
  "e-wallet": (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M16 12h2M3 10h18" />
    </>
  ),
  pln: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  pdam: <path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z" />,
  "tv-internet": (
    <>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M8 21h8" />
    </>
  ),
  game: (
    <>
      <rect x="2" y="7" width="20" height="11" rx="5" />
      <path d="M7 11v3M5.5 12.5h3M16 12h.01M18 13.5h.01" />
    </>
  ),
  bpjs: <path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c0 6-8 11-8 11z" />,
  multifinance: (
    <>
      <circle cx="6" cy="17" r="3" />
      <circle cx="18" cy="17" r="3" />
      <path d="M6 17h6l3-6h3M12 17 9 8H6" />
    </>
  ),
};

export function ServiceIcon({
  slug,
  className = "h-6 w-6",
}: {
  slug: Slug;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[slug]}
    </svg>
  );
}
