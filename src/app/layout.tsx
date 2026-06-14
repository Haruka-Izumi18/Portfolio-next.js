import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";


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
      className={`h-full antialiased`}
    >
      <body className={`${notoSans.variable} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
