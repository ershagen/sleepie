import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sleepie | Lugnare nätter börjar här",
  description:
    "Smarta produkter som hjälper ditt barn sova – och dig andas ut. Premium baby sleep & calming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
