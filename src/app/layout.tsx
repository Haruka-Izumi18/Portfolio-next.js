import type { Metadata } from "next";
import { Noto_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
}) 

export const metadata: Metadata = {
  title: "Portforio",
  description: "Portforio de Haruka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={cn("h-full", "antialiased", "font-sans", geist.variable)}
    >
      <body className={`${notoSans.variable} min-h-full`}>{children}</body>
    </html>
  );
}
