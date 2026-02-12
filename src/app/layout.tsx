import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const faith = localFont({
  src: "../../public/fonts/faith.ttf",
  variable: "--font-faith",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maria & Andrei — 15 August 2026",
  description: "Vă invităm la nunta noastră",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body
        className={`${faith.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
