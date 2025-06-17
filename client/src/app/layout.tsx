import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientRoot } from "@/app/client-root/ClientRoot";
import { Toaster } from "sonner";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hiretics",
  description: "Powered By GAMMADEVELOPERS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors position="top-center" />
        <ClientRoot>
          <ProtectedRoute>
            <NextTopLoader color="#16A34A" height={3} showSpinner={false} />
            {children}
          </ProtectedRoute>
        </ClientRoot>
      </body>
    </html>
  );
}
