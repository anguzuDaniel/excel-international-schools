import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "./components/ClientWrapper";
import { client } from "@/sanity/lib/client";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// 1. DYNAMIC METADATA FROM SANITY
export async function generateMetadata(): Promise<Metadata> {
  // Replace 'hero' with whatever schema holds your SEO title/description
  const seo = await client.fetch(`*[_type == "hero"][0]{title, text}`);

  return {
    title: seo?.title || "Merryland High Schools",
    description: seo?.text || "Strive to Excel",
    icons: {
      icon: "/favicon.ico", // Ensure you have a favicon in /public
    }
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* 2. THE CLIENT WRAPPER HANDLES THE LOADING STATE */}
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}