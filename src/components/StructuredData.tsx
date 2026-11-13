import { business, finishingOptions, services } from "@/config/site";
import { absoluteUrl, siteUrl } from "@/lib/site-url";

/**
 * Organization / LocalBusiness JSON-LD.
 * Deliberately omits opening hours, geo-coordinates, ratings, reviews and founding
 * date — none have been confirmed by the business.
 */
export function StructuredData() {
  const url = absoluteUrl("/");
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    ...(url ? { "@id": `${url}#business`, url } : {}),
    name: business.name,
    description: business.description,
    telephone: business.phoneE164,
    email: business.email,
    ...(siteUrl
      ? { image: absoluteUrl("/og-image.jpg"), logo: absoluteUrl("/brand/al-saif-logo.png") }
      : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      addressCountry: business.address.countryCode,
    },
    areaServed: { "@type": "Country", name: "Pakistan" },
    knowsAbout: [
      "Offset printing",
      "Commercial printing",
      "Custom packaging",
      "Pharmaceutical packaging printing",
      ...finishingOptions,
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Printing & Packaging Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
          provider: { "@type": "LocalBusiness", name: business.name },
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped cannot break out of the script element.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
