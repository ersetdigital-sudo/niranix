import Link from "next/link";

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2.5"
      aria-label="Niranix Digital — Beranda"
    >
      <svg width="36" height="36" viewBox="0 0 40 40" aria-hidden="true">
        <rect width="40" height="40" rx="12" fill={onDark ? "#22377a" : "#192853"} />
        <path
          d="M9 28V12l10 16V12"
          fill="none"
          stroke="#ECF4F7"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M26 9h5l-3 7h4l-8 14 2.5-9H23z" fill="#FFE14F" />
      </svg>
      <span
        className={`d text-[22px] font-extrabold tracking-tight ${
          onDark ? "text-white" : "text-navy"
        }`}
      >
        niranix<span className={onDark ? "text-sun" : "text-sun-deep"}>.</span>
      </span>
    </Link>
  );
}
