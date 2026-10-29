import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Using Geist as the primary font since Satoshi/Outfit aren't in next/font/google
// They can be added later as local fonts if needed
const satoshi = geistSans;
const outfit = geistSans;

export const metadata: Metadata = {
  metadataBase: new URL("https://resume-builder-pro-pi-jade.vercel.app"),
  title: {
    default: "ResumeForge — Professional Resume Builder",
    template: "%s · ResumeForge",
  },
  description:
    "Build an ATS-friendly professional resume in minutes. Live preview, 27 professional templates, PDF export, and secure cloud autosave.",
  keywords: ["resume builder", "CV maker", "ATS resume", "PDF resume"],
  openGraph: {
    title: "ResumeForge — Professional Resume Builder",
    description:
      "Build an ATS-friendly professional resume in minutes. Live preview, 27 professional templates, PDF export, and secure cloud autosave.",
    url: "https://resume-builder-pro-pi-jade.vercel.app",
    siteName: "ResumeForge",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeForge — Professional Resume Builder",
    description:
      "Build an ATS-friendly professional resume in minutes. Live preview, 27 professional templates, PDF export.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${satoshi.variable} ${outfit.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}