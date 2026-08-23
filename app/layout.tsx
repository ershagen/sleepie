import type { Metadata, Viewport } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { ShopChrome } from "@/components/ShopChrome";
import { absoluteUrl, DEFAULT_DESCRIPTION, SITE_NAME } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const libre = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#6B8F71",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: {
    default: `${SITE_NAME} | Lugnare nätter börjar här`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "baby sömn",
    "Sleepie Rocker",
    "stroller rocker",
    "white noise bebis",
    "muslin swaddle",
    "sömnsäck",
    "lugnare nätter",
    "Sleepie",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: true, email: true },
  alternates: {
    canonical: absoluteUrl(),
  },
  openGraph: {
    title: `${SITE_NAME} | Lugnare nätter börjar här`,
    description: DEFAULT_DESCRIPTION,
    url: absoluteUrl(),
    siteName: SITE_NAME,
    locale: "sv_SE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Lugnare nätter börjar här`,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${inter.variable} ${libre.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <Providers>
          <ShopChrome>{children}</ShopChrome>
        </Providers>
      </body>
    </html>
  );
}
