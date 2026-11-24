import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "SenkaiHub — Anime Clan Social Platform",
  description: "Join clans, unlock progress-gated spoiler vaults, and compete in Clan Wars.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-background text-foreground font-sans">
        <QueryProvider>
          <TooltipProvider delay={200}>
            {children}
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
