import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: "CalculArgent — Calculateurs financiers gratuits",
  description: "Des calculateurs simples et gratuits pour votre épargne, vos dettes et votre patrimoine.",
  openGraph: { title: "CalculArgent — Vos calculs financiers, enfin clairs", description: "Des calculateurs simples et gratuits pour votre épargne, vos dettes et votre patrimoine.", siteName: "CalculArgent", images: [{ url: "/og.png", width: 1731, height: 909, alt: "CalculArgent — Vos calculs financiers, enfin clairs." }], locale: "fr_FR", type: "website" },
  twitter: { card: "summary_large_image", title: "CalculArgent — Vos calculs financiers, enfin clairs", description: "Des calculateurs simples et gratuits pour votre épargne, vos dettes et votre patrimoine.", images: ["/og.png"] },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  referrer: "strict-origin-when-cross-origin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {children}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && <Script id="adsense-loader" strategy="afterInteractive" async crossOrigin="anonymous" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`} />}
        {process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN && <Script id="cloudflare-web-analytics" strategy="afterInteractive" src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon={JSON.stringify({ token: process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN })} />}
      </body>
    </html>
  );
}
