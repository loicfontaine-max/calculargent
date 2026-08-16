import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Plume — Vos finances, enfin claires",
  description: "Des calculateurs simples et gratuits pour votre épargne, vos dettes et votre patrimoine.",
  openGraph: { title: "Plume — Vos finances, enfin claires", description: "Des calculateurs simples et gratuits pour votre épargne, vos dettes et votre patrimoine.", images: ["/og.png"], locale: "fr_FR", type: "website" },
  twitter: { card: "summary_large_image", title: "Plume — Vos finances, enfin claires", description: "Des calculateurs simples et gratuits pour votre épargne, vos dettes et votre patrimoine.", images: ["/og.png"] },
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
      </body>
    </html>
  );
}
