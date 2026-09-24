import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cairo, IBM_Plex_Sans_Arabic, Tajawal } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VideoCut Studio - محرر فيديو احترافي",
  description: "محرر فيديو احترافي يعمل داخل المتصفح بدون حاجة لرفع الملفات إلى خادم",
  manifest: "/manifest.json",
  themeColor: "#7C3AED",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "VideoCut Studio",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      dir="rtl"
      lang="ar"
      className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} ${tajawal.variable} ${ibmPlexArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
