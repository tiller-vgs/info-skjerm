import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBarWrapper } from "@/components/ui/NavBarWrapper";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Info-skjerm",
  description: "Info-skjermen til IT-linjen ved Tiller VGS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="no">
        <body className={inter.className}>
          <NavBarWrapper />
          <main className=" min-h-screen bg-linear-to-br from-slate-900 to-slate-800">
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </main>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
