import { business, finishingOptions, services } from "@/config/site";
import { absoluteUrl } from "@/lib/site-url";

/**
 * Organization + LocalBusiness + WebSite JSON-LD (Schema.org @graph).
 *
 * Deliberately omits opening hours, geo-coordinates, ratings, reviews, founding date,
 * awards, certifications and social profiles — none have been confirmed by the business.
 * URL-based properties are only emitted when NEXT_PUBLIC_SITE_URL is configured.
 */
export function StructuredData() {
  const url = absoluteUrl("/");
  const id = (fragment: string) => (url ? { "@id": `${url}#${fragment}` } : {});
  const ref = (fragment: string) => (url ? { "@id": `${url}#${fragment}` } : { name: business.name });

  const address = {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.region,
    addressCountry: business.address.countryCode,
  };

  const offerCatalog = {
    "@type": "OfferCatalog",
    name: "Printing & Packaging Services",
    itemListElement: [
      ...services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
          areaServed: { "@type": "City", name: business.address.city },
          provider: ref("business"),
        },
      })),
      ...finishingOptions
        .filter((f) => f.title === "Holography" || f.title === "Drip-Off")
        .map((f) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: f.title,
            description: f.description,
            areaServed: { "@type": "City", name: business.address.city },
            provider: ref("business"),
          },
        })),
    ],
  };

  const graph = [
    {
      "@type": "Organization",
      ...id("organization"),
      name: business.name,
      ...(url ? { url, logo: absoluteUrl("/brand/al-saif-logo.png") } : {}),
      email: business.email,
      telephone: business.phoneE164,
      address,
    },
    {
      "@type": "LocalBusiness",
      ...id("business"),
      name: business.name,
      description: business.description,
      ...(url ? { url, image: absoluteUrl("/og-image.jpg"), logo: absoluteUrl("/brand/al-saif-logo.png") } : {}),
      telephone: business.phoneE164,
      email: business.email,
      address,
      areaServed: [
        { "@type": "City", name: "Lahore" },
        { "@type": "Country", name: "Pakistan" },
      ],
      parentOrganization: ref("organization"),
      knowsAbout: [
        "Offset printing",
        "Commercial printing",
        "Custom packaging",
        "Pharmaceutical packaging printing",
        ...finishingOptions.map((f) => f.title),
      ],
      hasOfferCatalog: offerCatalog,
    },
    ...(url
      ? [
          {
            "@type": "WebSite",
            ...id("website"),
            url,
            name: business.name,
            inLanguage: "en-PK",
            publisher: ref("organization"),
          },
        ]
      : []),
  ];

  const data = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped cannot break out of the script element.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
