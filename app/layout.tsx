import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { ShopChrome } from "@/components/ShopChrome";

export const metadata: Metadata = {
  title: {
    default: "Sleepie | Lugnare nätter börjar här",
    template: "%s | Sleepie",
  },
  description:
    "Smarta produkter som hjälper ditt barn sova – och dig andas ut. Premium baby sleep & calming. Stroller rocker, white noise, muslin och mer.",
  openGraph: {
    title: "Sleepie | Lugnare nätter börjar här",
    description:
      "Smarta produkter som hjälper ditt barn sova – och dig andas ut.",
    locale: "sv_SE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <ShopChrome>{children}</ShopChrome>
        </Providers>
      </body>
    </html>
  );
}
