import { providerLogoClass } from "@/lib/catalog";

export function ProviderLogo({
  name,
  className = "h-7 w-full",
}: {
  name: string;
  className?: string;
}) {
  const logoClass = providerLogoClass(name);
  if (!logoClass) return null;

  return (
    <span
      className={`lgo ${logoClass} block ${className}`}
      role="img"
      aria-label={name}
    />
  );
}
