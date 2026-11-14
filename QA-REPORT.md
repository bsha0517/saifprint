# QA report — Al-Saif Print & Pack website

Date: 13 November 2026 · Build: Next.js 16.4.6 static export (`out/`)

## Automated checks (all passing)

| Check | Result |
| --- | --- |
| `npm run typecheck` (TypeScript strict) | Pass |
| `npm run lint` (ESLint, Next core-web-vitals) | Pass, 0 warnings |
| `npm test` (quote validation, sanitisation, message & URL building) | 11/11 pass |
| `npm run build` (static export) | Pass — `/`, `robots.txt`, `sitemap.xml`, `manifest.webmanifest` |
| `npm audit --omit=dev` (shipped dependencies) | 0 vulnerabilities |
| `npm audit` (incl. dev tooling) | 7 moderate, all in ESLint's TypeScript tooling (`minimatch` ReDoS) — build-time only, not shipped to visitors. `npm audit fix` made no change; resolves when `eslint-config-next` updates. |

## Browser tests (headless Chrome via Puppeteer, against the built `out/` folder) — 39/39 pass

- **Mobile menu:** opens and closes; `aria-expanded` is set; page scroll locks while open; focus moves into the menu and is trapped there; Escape closes it and returns focus to the toggle; tapping a link closes the menu and scrolls to the section, clear of the sticky header.
- **Links:** every in-page anchor resolves; `tel:+923006591090`, `mailto:alsaifprintandpack@gmail.com` and `wa.me/923006591090` are correct; Get Directions opens a Google Maps search; every `target=_blank` link has `rel="noopener noreferrer"`.
- **Semantics:** one `h1`, no skipped heading levels, every image has alt text, every form control has a label, no duplicate IDs. The first Tab press lands on a visible "Skip to content" link.
- **Structured data:** LocalBusiness JSON-LD with no opening hours, geo-coordinates, ratings, reviews or founding date.
- **Quotation form:**
  - Submitting an empty form shows an error summary that receives focus, and all 7 required fields are flagged (`aria-invalid` plus a linked error message).
  - An invalid phone number or email is rejected, and WhatsApp is not opened.
  - A valid submission opens WhatsApp exactly once, to the company number, with the expected message. HTML and `&` characters in the input arrive as plain text and cannot add URL parameters.
  - The status message says the request has **not** been sent yet. WhatsApp-again, email and copy-message fallbacks are offered.
  - "Request a Quote" on a service card pre-selects that service in the form.
- **Robustness:** all content is visible with reduced motion enabled and with JavaScript disabled.

## Responsive checks

Widths tested: 320, 375, 390, 768, 1024, 1440 and 1920 px.

- No horizontal scrolling at any width (`scrollWidth` equals the viewport width).
- No broken images and no console errors.
- All tap targets are at least 24 px.
- I reviewed screenshots at 320, 375, 768 and 1440 px. Issues found and fixed during review:
  - empty grid cells in Services and Industries
  - client initials that looked like logos
  - the hero chip overlay crowding the photo on small phones
  - the email address breaking mid-word
  - inline links that were too small to tap comfortably
- The floating WhatsApp button hides itself over the quote form and the contact section.

## Lighthouse 12.6 (local, production configuration)

Setup: a production-mode build served by a local static server with brotli compression and cache headers, to approximate a CDN.

| Run | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Desktop (3 runs) | 99–100 | 100 | 100 | 100 |
| Mobile (simulated slow 4G, 8 runs) | 78–92 | 100 | 100 | 100 |

- **Desktop:** LCP 0.7 s, CLS 0, TBT 10–70 ms.
- **Mobile:** FCP about 1.0 s, LCP 2.7–3.1 s, CLS 0.
- **Why mobile varies:** most of the spread is Total Blocking Time (200–650 ms) from React hydration, measured on a busy development laptop. The mobile target of 90+ was met in some runs but not consistently. Re-measure on the live host with PageSpeed Insights.
- **Python test server:** the earlier scores of 81 mobile / 96 desktop came from Python's `http.server`, which has no compression or caching. They do not reflect a real host.

## Brand

The official logo (`AL-SAIF Print & Pack Logo.png`, added during the build) is used in the header (tagline-free lockup), footer (full lockup on a white card), favicons/app icons ("AP" monogram), structured data and the social-share image. Re-tested after the change: 39/39 browser checks pass and Lighthouse results are unchanged (Accessibility, Best Practices and SEO 100).

## Not tested / limitations

- Opening WhatsApp on a real phone, and the visitor actually pressing Send. The generated URL is verified, but the WhatsApp app itself was not exercised.
- Real assistive technology (NVDA/VoiceOver). Accessibility was checked with automated audits and keyboard tests only.
- Safari and Firefox. Tests ran in Chromium only.
- Performance on the eventual production host and domain.

---

## Update — 15 November 2026 (clients, finishing, images, production SEO)

Commit `cd7cebf`, deployed to https://saifprint.vercel.app (Vercel production, project `saifprint`).

- **Content:** 29 clients (8 added; no duplicates); Holography and Drip-Off added to Premium Print Finishing and to the quote form.
- **Images:** the hero ("Finishing options" overlay) and Offset Printing card now use owner-supplied photos. The originals are small (554×554 and 640×480).
- **Local checks:** typecheck, lint and unit tests (11/11) pass, and the production build passes.
- **Browser tests:** 51/51 pass, both locally and against the live deployment.
- **Responsive:** 320–1920 px shows no horizontal scroll, no broken images and no console errors.
- **Lighthouse** (local, CDN-like server, 3 runs each):

  | | Performance | Accessibility | Best Practices | SEO |
  | --- | --- | --- | --- | --- |
  | Desktop | 99–100 | 100 | 100 | 100 |
  | Mobile | 87–93 | 100 | 100 | 100 |

- **Live SEO output:**
  - One title tag and the new description.
  - Canonical, og:url and og:image all use `https://alsaifprintpack.pk/`.
  - `noindex, nofollow`, and `robots.txt` disallows crawling, because the domain is not live.
  - The sitemap lists `https://alsaifprintpack.pk/`.
  - `X-Robots-Tag: noindex` is sent on `saifprint.vercel.app`.
  - No stale domain references.
- **Domain:** `alsaifprintpack.pk` returns NXDOMAIN (not delegated at PKNIC). The apex and www (308 → apex) are attached in Vercel; see the README go-live checklist for the DNS records.
