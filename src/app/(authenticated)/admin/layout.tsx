import type { Metadata } from "next";
import { Noto_Sans, Geist } from "next/font/google";
import "../../globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
}) 

export const metadata: Metadata = {
  title: "Portforio",
  description: "Portforio de Haruka",
  icons: {
    icon: "/favicon-code.svg",
    shortcut: "/favicon-code.svg",
    apple: "/favicon-code.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
    <html
      lang="fr"
      className={cn("h-full", "antialiased", "font-sans", geist.variable)}
    >
      <body className={`${notoSans.variable} flex w-full flex-col items-center py-20 px-16 font-sans dark:bg-black`}>{children}</body>
    </html>
    </TooltipProvider>
  );
}
