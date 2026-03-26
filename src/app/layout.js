import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { getPublicEnv } from "@/config/env";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-bonnot-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const { siteUrl } = getPublicEnv();

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Headless Shop", template: "%s · Headless Shop" },
  description: "WooCommerce + WPGraphQL + Next.js modular storefront",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
