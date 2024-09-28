import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { EdgeStoreProvider } from '@/lib/edgeStore';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CarePulse",
  description: "An App for medical appointments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans bg-custom-dark">
      <body className={inter.className}><EdgeStoreProvider>{children}</EdgeStoreProvider></body>
    </html>
  );
}
