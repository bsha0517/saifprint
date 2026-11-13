import brand from "@/config/brand-manifest.json";

/**
 * Official Al-Saif Print & Pack logo (generated from assets/brand/al-saif-logo-original.png
 * by `npm run assets`).
 *  - "header": icon + wordmark, without the small tagline (illegible at header size)
 *  - "full":   complete lockup including "Printing | Packaging | Finishing"
 * The artwork is navy/gold on transparent, so on dark backgrounds it sits on a white card.
 */
export function Logo({
  variant = "header",
  className = "h-10 w-auto sm:h-11 lg:h-12",
  decorative = false,
}: {
  variant?: "header" | "full";
  className?: string;
  /** true when the surrounding link already carries the company name */
  decorative?: boolean;
}) {
  const file = variant === "full" ? "al-saif-logo" : "al-saif-logo-header";
  const size = brand[variant];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export; pre-optimised asset
    <img
      src={`/brand/${file}.webp`}
      width={size.width}
      height={size.height}
      alt={decorative ? "" : "Al-Saif Print & Pack"}
      className={className}
      decoding="async"
      fetchPriority={variant === "header" ? "high" : "auto"}
      loading={variant === "header" ? "eager" : "lazy"}
    />
  );
}
