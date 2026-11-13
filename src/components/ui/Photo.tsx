import manifest from "@/config/image-manifest.json";

type ImageName = keyof typeof manifest;

interface PhotoProps {
  name: string;
  alt: string;
  /** Responsive `sizes` attribute describing the rendered width. */
  sizes: string;
  className?: string;
  /** Above-the-fold images: load eagerly with high priority. */
  priority?: boolean;
}

/**
 * Responsive WebP image from the pre-generated set in /public/images.
 * Intrinsic width/height are always set so the browser reserves space (no layout shift).
 */
export function Photo({ name, alt, sizes, className, priority = false }: PhotoProps) {
  const entry = manifest[name as ImageName];
  if (!entry) throw new Error(`Unknown image "${name}". Run npm run assets.`);
  const srcSet = entry.widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(", ");
  const fallback = entry.widths.find((w) => w >= 1080) ?? entry.widths.at(-1);
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export with pre-optimised srcset
    <img
      src={`/images/${name}-${fallback}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={entry.width}
      height={entry.height}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
