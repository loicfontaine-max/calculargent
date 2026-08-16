import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: "CalculArgent — Calculateurs financiers gratuits",
  description: "Des calculateurs simples et gratuits pour votre épargne, vos dettes et votre patrimoine.",
  openGraph: { title: "CalculArgent — Vos calculs financiers, enfin clairs", description: "Des calculateurs simples et gratuits pour votre épargne, vos dettes et votre patrimoine.", siteName: "CalculArgent", images: ["/og-calculargent.png"], locale: "fr_FR", type: "website" },
  twitter: { card: "summary_large_image", title: "CalculArgent — Vos calculs financiers, enfin clairs", description: "Des calculateurs simples et gratuits pour votre épargne, vos dettes et votre patrimoine.", images: ["/og-calculargent.png"] },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && <Script id="adsense-loader" strategy="afterInteractive" async crossOrigin="anonymous" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`} />}
      </body>
    </html>
  );
}
