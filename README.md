# Al-Saif Print & Pack — Corporate Website

A one-page corporate website for **Al-Saif Print & Pack**, a commercial printing and packaging company in
Lahore, Pakistan. Built as a fully static site: no server, database, cookies, analytics or tracking.

- **Stack:** Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 4 · Lucide icons
- **Output:** plain HTML/CSS/JS in `out/` — host it anywhere that serves static files.
- **Quotation form:** validates input in the browser, then opens WhatsApp with a pre-written message to
  +92 300 6591090. Nothing is sent until the visitor presses *Send* in WhatsApp; an e-mail fallback is offered.

## Run locally

Requirements: Node.js 22.18 or newer (tested on Node 26) and npm.

```bash
npm install
npm run dev          # http://localhost:3000 with hot reload
```

Preview the production build exactly as it will be hosted:

```bash
npm run build        # writes the static site to out/
npm start            # serves out/ at http://localhost:3000 (uses `serve` via npx)
```

Any static server works too, e.g. `python -m http.server 4173 --directory out`.

## Quality checks

```bash
npm run typecheck    # TypeScript
npm run lint         # ESLint (Next.js core-web-vitals rules)
npm test             # unit tests for quote validation / message building (node:test)
npm run check        # all of the above + production build
```

## Editing content

All business details and page content live in **`src/config/site.ts`** — phone, e-mail, address, navigation,
services, finishing options, industries, equipment, process steps, client names, vision/mission and
strengths. Edit there; components read from it. Please keep claims factual (no invented statistics,
certifications, hours or testimonials).

| Path | Purpose |
| --- | --- |
| `src/app/layout.tsx` | Metadata (title, description, Open Graph, robots), font |
| `src/app/page.tsx` | Section order |
| `src/components/sections/*` | One component per section |
| `src/components/sections/QuoteForm.tsx` | Quotation form UI |
| `src/lib/quote.ts` | Validation, sanitisation and WhatsApp/e-mail message building (unit-tested) |
| `src/lib/site-url.ts` | Production URL / indexing switch |
| `src/app/robots.ts`, `sitemap.ts`, `manifest.ts` | robots.txt, sitemap.xml, web manifest |
| `src/components/StructuredData.tsx` | LocalBusiness JSON-LD |
| `scripts/build-assets.mjs` | Generates responsive WebP images, favicons and the social-share image |
| `assets/photos/`, `assets/brand/` | Source photos and brand mark (see `IMAGE-CREDITS.md`) |

## Configuration (production URL & indexing)

Copy `.env.example` and set values **only for the live site** (or set them in the hosting dashboard):

| Variable | Effect |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | e.g. `https://www.your-domain.pk` — enables canonical URL, absolute Open Graph URLs, sitemap entries and URL in structured data. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` only for production. Otherwise robots.txt disallows all crawling and pages carry `noindex`. |

With neither set (the default), the build is **non-indexable** and publishes no placeholder domain — safe for
previews and staging.

## Deployment (free static hosting)

Recommended: **Cloudflare Pages** (free, fast in Pakistan via a global CDN, unlimited bandwidth on the free
plan). Netlify, Vercel or GitHub Pages also work.

Cloudflare Pages settings:

- Build command: `npm run build`
- Output directory: `out`
- Environment variables (Production only): `NEXT_PUBLIC_SITE_URL=https://<your-domain>`,
  `NEXT_PUBLIC_ALLOW_INDEXING=true`, `NODE_VERSION=22`
- Leave the variables unset for Preview deployments so previews stay non-indexable.

### Vercel

1. In Vercel, **Add New → Project → Import** the `saifprint` GitHub repository. The framework is detected
   as Next.js automatically; keep the default build settings (the static export in `out/` is handled for you).
2. **Settings → Environment Variables**, scope **Production** only:
   - `NEXT_PUBLIC_SITE_URL` = `https://<your-domain>` (no trailing slash)
   - `NEXT_PUBLIC_ALLOW_INDEXING` = `true`
3. Add your domain under **Settings → Domains**, then redeploy so the variables are baked into the build.

Leave both variables unset for Preview deployments, so preview URLs (`*.vercel.app`) stay non-indexable.

After going live: add the domain in Google Search Console, submit `https://<your-domain>/sitemap.xml`, and
create/verify a Google Business Profile with the same name, address and phone number.

> Nothing has been deployed, and no domain, hosting or paid service has been set up. These steps need the
> owner's approval and accounts.

## Go-live checklist — alsaifprintpack.pk

Current state (15 Nov 2026): the Vercel project `saifprint` already has **alsaifprintpack.pk** (primary)
and **www.alsaifprintpack.pk** (308 redirect → apex) attached, and Production uses
`NEXT_PUBLIC_SITE_URL=https://alsaifprintpack.pk` with `NEXT_PUBLIC_ALLOW_INDEXING=false`.
The domain does not resolve yet (no DNS delegation at PKNIC), so the site is intentionally non-indexable.

1. **Register / activate the domain** at PKNIC (or a PKNIC reseller) if not done yet.
2. **Add these DNS records** at the domain's DNS provider — exactly as requested by Vercel:

   | Host | Type | Value |
   | --- | --- | --- |
   | `alsaifprintpack.pk` (apex, `@`) | A | `216.198.79.1` |
   | `alsaifprintpack.pk` (apex, `@`) | A | `64.29.17.1` |
   | `www` | CNAME | `5f7aef6cf4cce936.vercel-dns-017.com.` |

   (Vercel also accepts its older generic values `76.76.21.21` / `cname.vercel-dns.com`.) Do not change
   nameservers unless you intend to move DNS to Vercel.
3. Wait until Vercel → Settings → Domains shows both domains as **Valid Configuration** and
   `https://alsaifprintpack.pk` loads with a valid certificate.
4. Set `NEXT_PUBLIC_ALLOW_INDEXING=true` (Production) and **Redeploy**. robots.txt then allows crawling and lists
   `https://alsaifprintpack.pk/sitemap.xml`.
5. Optional, once the domain works: redirect the temporary Vercel URL by adding to `vercel.json`
   (keep the existing `framework` and `headers` entries):

   ```json
   "redirects": [
     {
       "source": "/:path*",
       "has": [{ "type": "host", "value": "saifprint.vercel.app" }],
       "destination": "https://alsaifprintpack.pk/:path*",
       "permanent": true
     }
   ]
   ```

   Until then, `saifprint.vercel.app` is protected from indexing by an `X-Robots-Tag: noindex` header
   (in `vercel.json`) regardless of the indexing setting.
6. **Google Search Console:** add a *Domain property* for `alsaifprintpack.pk`, verify it with the TXT record
   Google provides, submit `https://alsaifprintpack.pk/sitemap.xml`, then use URL Inspection on the homepage.
7. **Google Business Profile:** create or claim the profile using exactly the name, address and phone shown on
   the site (*Al-Saif Print & Pack*, the Band Road address, +92 300 6591090) and add the website URL.

## Brand assets

The official logo supplied by Al-Saif (`AL-SAIF Print & Pack Logo.png`, copied to
`assets/brand/al-saif-logo-original.png`) is used unchanged in its proportions and colours. `npm run assets`
derives from it:

- `public/brand/al-saif-logo.(webp|png)` — full lockup with the "Printing | Packaging | Finishing" tagline
  (footer, on a white card; social-share image; structured data)
- `public/brand/al-saif-logo-header.(webp|png)` — the same lockup without the small tagline, which would be
  illegible at header size
- `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` — the "AP" monogram on a white tile
- `og-image.jpg` — 1200×630 social-sharing image

The supplied file is a 2172×724 raster PNG. A vector version (SVG/AI/EPS) would give sharper results on
high-resolution screens and in print; if one exists, it can replace the PNG and `npm run assets` regenerates
everything (the crop coordinates in `scripts/build-assets.mjs` would then need re-measuring).

## Privacy & security notes

- No cookies, analytics, trackers or third-party scripts. Fonts are self-hosted at build time.
- The quotation form does not send data anywhere by itself; it builds a `wa.me` link (or `mailto:` link) that the
  visitor chooses to open and send. User input is sanitised (control/bidi characters removed, length-limited)
  and URL-encoded.
- No secrets or API keys exist in the codebase. Never put secrets in `NEXT_PUBLIC_*` variables.
- If a privacy policy page is added later, it should describe this exact data flow and be reviewed by a
  qualified adviser.
