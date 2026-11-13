import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { business } from "@/config/site";
import { allowIndexing, metadataBase, siteUrl } from "@/lib/site-url";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const title = "Al-Saif Print & Pack | Printing & Packaging Solutions Lahore";
const description =
  "Al-Saif Print & Pack offers offset printing, custom packaging, commercial printing and professional print finishing solutions in Lahore, Pakistan.";

export const metadata: Metadata = {
  metadataBase,
  title,
  description,
  applicationName: business.name,
  keywords: [
    "printing and packaging company Lahore",
    "offset printing Lahore",
    "custom packaging Lahore",
    "commercial printing Lahore",
    "pharmaceutical packaging printing Lahore",
    "printing press Lahore",
    "packaging printing Pakistan",
  ],
  // Canonical is only emitted when the production URL is configured.
  alternates: siteUrl ? { canonical: "/" } : undefined,
  robots: allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: business.name,
    title,
    description,
    url: siteUrl ? "/" : undefined,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Al-Saif Print & Pack — Printing & Packaging Solutions in Lahore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#171D3D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-PK" className={jakarta.variable}>
      <body className="min-h-screen antialiased">
        {/* Enables progressive-enhancement animations only when JavaScript runs. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        {children}
      </body>
    </html>
  );
}
