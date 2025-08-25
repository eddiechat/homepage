import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Eddie - Email infrastructure to grow your business",
  description: "Privacy-first email infrastructure for fast growing companies. Run agents and automations securely on your email and proprietary data.",
  icons: {
    icon: [
      {
        url: "/eddie-logo.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      }
    ],
    shortcut: "/favicon.svg",
    apple: "/eddie-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
