/**
 * Production URL handling.
 *
 * NEXT_PUBLIC_SITE_URL       – the live domain, e.g. https://www.example.com (no trailing slash).
 *                              Used for canonical URLs, Open Graph URLs, sitemap and structured data.
 * NEXT_PUBLIC_ALLOW_INDEXING – set to "true" ONLY for the production build. Any other value
 *                              (or unset) makes the build non-indexable (robots noindex +
 *                              "Disallow: /"), which is the safe default for previews/staging.
 */
const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");

function parse(url: string | undefined): URL | undefined {
  if (!url) return undefined;
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:" ? u : undefined;
  } catch {
    return undefined;
  }
}

/** The configured production URL, or undefined when not configured. */
export const siteUrl: URL | undefined = parse(raw);

/** Whether search engines may index this build. Requires a configured URL. */
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" && Boolean(siteUrl);

/** Base used to resolve relative metadata URLs (falls back to localhost for local builds). */
export const metadataBase: URL = siteUrl ?? new URL("http://localhost:3000");

export function absoluteUrl(pathname = "/"): string | undefined {
  return siteUrl ? new URL(pathname, siteUrl).toString() : undefined;
}
