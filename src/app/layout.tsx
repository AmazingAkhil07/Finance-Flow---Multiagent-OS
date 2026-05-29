import type { Metadata } from "next";
import { Inter, Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "FinanceFlow | Intelligence OS",
  description: "Cinematic Financial Intelligence Dashboard",
};

import { TickerBar } from "@/components/layout/TickerBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { BookmarkProvider } from "@/providers/BookmarkProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable} antialiased min-h-screen font-sans`}
        suppressHydrationWarning
      >
        <BookmarkProvider>
          <div className="p-6 h-screen w-full flex flex-col gap-6 overflow-hidden">
            <TickerBar />
            <div className="flex-1 flex gap-6 min-h-0 relative">
              <Sidebar />
              {children}
            </div>
          </div>
        </BookmarkProvider>
      </body>
    </html>
  );
}
