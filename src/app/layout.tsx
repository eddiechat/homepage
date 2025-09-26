import type { Metadata } from "next";
import { headers } from 'next/headers'
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const ua = (await headers()).get('user-agent') || ''
  const isDiscord = /\bDiscordbot\b/i.test(ua)

  return {
    title: "Eddie - Email infrastructure to grow your business",
    description: "Privacy-first email infrastructure for fast growing companies. Run agents and automations securely on your email and proprietary data.",
    icons: {
      icon: [
        {
          url: "/eddie-swirl-white.svg",
          type: "image/svg+xml",
        },
      ],
    },
    openGraph: {
      // Use full absolute URLs; Discord is picky about relatives.
      images: [
        {
          url: isDiscord
            ? 'https://eddie.chat/opengraph-image-dark.png'
            : 'https://eddie.chat/opengraph-image.png'
        }
      ],
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
