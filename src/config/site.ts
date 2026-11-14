/**
 * Single source of truth for business information and page content.
 * Update details here rather than inside individual components.
 *
 * Facts are taken from the supplied Al-Saif Print & Pack company brief.
 * Do not add statistics, certifications, hours or claims that the business
 * has not confirmed in writing.
 */

export const business = {
  name: "Al-Saif Print & Pack",
  shortName: "Al-Saif",
  tagline: "Your Trusted Partner in Printing & Packaging Excellence.",
  supportingLine: "Precision Printing. Premium Packaging. Professional Results.",
  footerStatement: "Professional Printing & Packaging Solutions in Lahore, Pakistan.",
  description:
    "A complete printing house in Lahore offering pre-press, offset printing, custom packaging and professional print finishing for businesses.",
  phoneDisplay: "+92 300 6591090",
  phoneE164: "+923006591090",
  whatsappNumber: "923006591090",
  email: "alsaifprintandpack@gmail.com",
  address: {
    street: "Hazrat Ali Road, Akram Park, Near Rafaiaabad Police Chowki, Band Road",
    city: "Lahore",
    region: "Punjab",
    country: "Pakistan",
    countryCode: "PK",
  },
} as const;

export const fullAddress = `${business.address.street}, ${business.address.city}, ${business.address.country}`;

export const links = {
  tel: `tel:${business.phoneE164}`,
  mailto: `mailto:${business.email}`,
  whatsapp: `https://wa.me/${business.whatsappNumber}`,
  whatsappWithText: (text: string) =>
    `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(text)}`,
  directions: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Al-Saif Print & Pack, ${fullAddress}`,
  )}`,
} as const;

export const whatsappGreeting =
  "Hello Al-Saif Print & Pack, I would like to discuss a printing / packaging requirement.";

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Our Capabilities", href: "#capabilities" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
] as const;

export const vision =
  "To be a leading name in the printing industry, built on dependable service, lasting client relationships and sustainable, mutually rewarding growth.";

export const mission =
  "To deliver exceptional printing and packaging services through innovation and creativity, consistently exceeding the expectations of the customers we serve.";

export const strengths = [
  "Experienced production staff",
  "Offset printing capabilities",
  "Pre-press and post-press production under one roof",
  "In-house design assistance",
  "A broad range of printing and packaging services",
  "Customer-focused production coordination",
  "Round-the-clock service availability, as stated in our company profile",
] as const;

export type ServiceIcon =
  | "printer"
  | "package"
  | "pill"
  | "idCard"
  | "bookOpen"
  | "megaphone"
  | "tag"
  | "shoppingBag"
  | "calendar"
  | "layers"
  | "sparkles";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: ServiceIcon;
  image?: { src: string; alt: string };
}

export const services: Service[] = [
  {
    id: "offset-printing",
    title: "Offset Printing",
    description:
      "Commercial offset printing in Lahore for business documents, marketing materials and product-related print, prepared with care from artwork to press.",
    icon: "printer",
    image: {
      src: "heidelberg-press-feeder-offset-printing",
      alt: "Paper stack loaded in the feeder of a Heidelberg sheet-fed offset printing press",
    },
  },
  {
    id: "custom-packaging",
    title: "Custom Packaging",
    description:
      "Printed boxes and packaging that present your product professionally on the shelf and help your brand stand out.",
    icon: "package",
    image: {
      src: "custom-printed-product-boxes",
      alt: "Rows of printed product boxes with window cut-outs (representative stock photo)",
    },
  },
  {
    id: "pharmaceutical-packaging",
    title: "Pharmaceutical Packaging Printing",
    description:
      "Printing for pharmaceutical-sector cartons and packaging requirements, coordinated closely with your artwork and specifications.",
    icon: "pill",
    image: {
      src: "pharmaceutical-carton-packaging",
      alt: "A printed medicine carton beside capsule blister packs (representative stock photo)",
    },
  },
  {
    id: "stationery",
    title: "Business Cards & Corporate Stationery",
    description:
      "Business cards, letterheads, envelopes and branded stationery that keep your company identity consistent.",
    icon: "idCard",
  },
  {
    id: "brochures",
    title: "Brochures, Catalogues & Literature",
    description:
      "Brochures, catalogues and informational literature that present your products and services clearly.",
    icon: "bookOpen",
  },
  {
    id: "posters-leaflets",
    title: "Posters & Leaflets",
    description: "Promotional posters, flyers and leaflets for campaigns, launches and point-of-sale.",
    icon: "megaphone",
  },
  {
    id: "stickers-labels",
    title: "Sticker & Label Printing",
    description:
      "Printed stickers and labels for products and business use. Share your application and we will advise on suitable options.",
    icon: "tag",
  },
  {
    id: "paper-bags",
    title: "Paper Bags",
    description: "Printed paper bags for retail, events and brand presentation.",
    icon: "shoppingBag",
  },
  {
    id: "calendars",
    title: "Calendars",
    description: "Custom printed wall and desk calendars for promotional and corporate gifting.",
    icon: "calendar",
  },
  {
    id: "screen-printing",
    title: "Screen Printing",
    description: "Screen-printing solutions for suitable commercial applications. Ask us about your job.",
    icon: "layers",
  },
  {
    id: "print-finishing",
    title: "Premium Print Finishing",
    description:
      "Finishing that adds protection, texture and shelf appeal — from lamination and UV to embossing and die cutting.",
    icon: "sparkles",
  },
];

export const finishingOptions = [
  { title: "Lamination", description: "Protective gloss or matt film for durability and a refined feel." },
  { title: "Spot UV", description: "Selective high-gloss highlights on logos, text or graphics." },
  { title: "UV finishing", description: "UV coating that adds shine and surface protection." },
  { title: "Embossing", description: "Raised, tactile detail that adds depth to a design." },
  { title: "Die cutting", description: "Precise cutting and creasing for cartons and custom shapes." },
  { title: "Pasting", description: "Carton gluing and assembly ready for packing." },
  { title: "Panni printing", description: "Specialised finishing — ask us whether it suits your job." },
  {
    title: "Holography",
    description:
      "Holographic finishing solutions that enhance the visual appeal of printed packaging with distinctive decorative effects.",
  },
  {
    title: "Drip-Off",
    description:
      "Specialized print finishing that combines contrasting gloss and matte effects to create texture, depth, and a distinctive visual appearance.",
  },
] as const;

export const finishingTitles = finishingOptions.map((f) => f.title);

/** Options for the quotation form's "Service Required" field. */
export const quoteServiceOptions = [
  ...services.map((s) => s.title),
  "Holography",
  "Drip-Off",
  "Other / Not sure yet",
];

export interface Industry {
  id: string;
  title: string;
  description: string;
  /** true only where the company profile lists clients in this sector */
  establishedClients: boolean;
}

export const industries: Industry[] = [
  {
    id: "pharmaceuticals",
    title: "Pharmaceuticals",
    description:
      "Most of the clients named in our company profile are pharmaceutical companies. We print cartons, inserts and supporting materials to the artwork and specifications each client provides.",
    establishedClients: true,
  },
  {
    id: "food-beverages",
    title: "Food & Beverages",
    description:
      "Printed boxes, labels and promotional material for food and nutrition brands. Our listed clients include food and nutrition businesses.",
    establishedClients: true,
  },
  {
    id: "cosmetics",
    title: "Cosmetics & Personal Care",
    description:
      "Presentation-focused cartons and labels where finishes such as spot UV and embossing can lift a product's shelf appeal.",
    establishedClients: false,
  },
  {
    id: "retail-consumer",
    title: "Retail & Consumer Goods",
    description: "Product packaging, paper bags, stickers and in-store promotional print for retailers and manufacturers.",
    establishedClients: false,
  },
  {
    id: "corporate",
    title: "Corporate Businesses",
    description: "Stationery, calendars, reports and brochures for companies and procurement teams.",
    establishedClients: false,
  },
  {
    id: "marketing-advertising",
    title: "Marketing & Advertising",
    description: "A dependable production partner for agencies delivering print campaigns on behalf of their clients.",
    establishedClients: false,
  },
];

export const printingEquipment = [
  { name: "Heidelberg Printing Machine", note: "Offset printing" },
  { name: "Heidelberg GTO Machine", note: "Offset printing" },
  { name: "Solna 125 Machine", note: "Offset printing" },
] as const;

export const finishingEquipment = [
  { name: "Die Cutting Machine", note: "Cutting and creasing for cartons and shapes" },
  { name: "Pasting Machine", note: "Carton gluing and assembly" },
  { name: "Lamination Machine", note: "Protective and decorative film finishes" },
  { name: "UV Machine", note: "UV coating" },
  { name: "Spot UV Machine", note: "Selective high-gloss highlights" },
  { name: "Embossing Machine", note: "Raised, tactile detail" },
  { name: "Panni Printing Machine", note: "Specialised finishing — ask us about suitability" },
] as const;

export const processSteps = [
  {
    title: "Consultation",
    description: "We discuss your requirements, specifications, quantities and expectations.",
  },
  {
    title: "Design & Pre-Press",
    description: "Artwork preparation and design coordination so files are ready for production.",
  },
  {
    title: "Printing",
    description: "Production using the printing process best suited to the job.",
  },
  {
    title: "Finishing",
    description: "Cutting, lamination, UV, embossing or other finishing, as the job requires.",
  },
  {
    title: "Delivery Coordination",
    description: "Final order preparation and delivery arrangements, as agreed with you.",
  },
] as const;

/** Client names as listed in the supplied company profile. Text only — no logos. */
export const clients = [
  "Neutro Pharma",
  "Care Pharma",
  "Radiant Pharma",
  "NS Pharma",
  "Zodiac Pharma",
  "NSP Pharma",
  "Cell Laboratories",
  "Mass Pharma",
  "DS Pharma",
  "Hi-Nutrition",
  "Oasis Pharma",
  "Amaan Pharma",
  "Xenon Pharma",
  "Siam Pharma",
  "Islam Pharma",
  "Livein Pharma",
  "Kaap Pharma",
  "Relizon Pharma",
  "Trend Pharma",
  "Cure Inn Pharma",
  "Green Star Foods",
  "Hisun Pharma",
  "Star Laboratories",
  "Symans Pharma",
  "Welwink Pharma",
  "Weather Fold Pharmaceuticals",
  "Qadir Pharma",
  "Mega Pharma",
  "GT Pharma",
] as const;

export const reasons = [
  {
    title: "End-to-End Printing",
    description: "From artwork preparation and pre-press through printing to finishing — one partner, one point of contact.",
    icon: "workflow",
  },
  {
    title: "Experienced Team",
    description: "Production staff and in-house design support who understand commercial and packaging print.",
    icon: "users",
  },
  {
    title: "Versatile Capabilities",
    description: "Commercial printing, packaging and finishing under one roof, for everyday and specialised jobs.",
    icon: "layoutGrid",
  },
  {
    title: "Customer-Focused Approach",
    description: "We start from your requirements and budget, then recommend a practical way to produce them.",
    icon: "handshake",
  },
  {
    title: "Attention to Detail",
    description: "Careful artwork checks and preparation before anything goes to press.",
    icon: "scanSearch",
  },
  {
    title: "Flexible Production Support",
    description: "Coordination for different quantities, formats and timelines — with service available around the clock.",
    icon: "clock",
  },
] as const;

export const valuePropositions = [
  {
    title: "Complete Printing Solutions",
    description: "Pre-press, offset printing and post-press finishing handled in one place.",
    icon: "printer",
  },
  {
    title: "In-House Design Support",
    description: "Our design team helps prepare and refine artwork so it is ready for production.",
    icon: "penTool",
  },
  {
    title: "Professional Print Finishing",
    description: "Lamination, UV, spot UV, embossing, die cutting and pasting to complete the job.",
    icon: "sparkles",
  },
] as const;
