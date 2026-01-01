import type { Metadata } from "next";
import { Geist, Geist_Mono, League_Spartan } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { ToastProvider } from "@/shared/components/ui";
import { AuthProvider } from "@/shared/components/auth/AuthContext";
import { MenuProvider } from "@/shared/components/menu/MenuContext";
import AppBottomNav from "@/shared/components/AppBottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Smart Restaurant - Order Food",
  description: "Order food from your favorite restaurants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${leagueSpartan.variable} antialiased`}
      >
        <AuthProvider>
          <MenuProvider>
            <ToastProvider>
              {children}
              <Suspense fallback={null}>
                <AppBottomNav />
              </Suspense>
            </ToastProvider>
          </MenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
