import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "ResumeForge — Professional Resume Builder",
    template: "%s · ResumeForge",
  },
  description:
    "Build an ATS-friendly professional resume in minutes. Live preview, 6 clean templates, PDF export, and secure cloud autosave.",
  keywords: ["resume builder", "CV maker", "ATS resume", "PDF resume"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
