import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import "./globals.scss";
import InnerLayout from "../../components/Layout/InnerLayout";
import syncDatabase from "../lib/sync";
import AuthProvider from "../../components/auth-provider";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const notoSans = Noto_Sans({
  subsets: ["latin"], // You can specify subsets like 'latin', 'cyrillic', etc.
  weight: ["400", "500", "600", "700"], // Specify font weights if needed
  variable: "--font-noto-sans", // Add a CSS variable for easy use
});

export const metadata: Metadata = {
  title: "FormLLC | Hassle-Free LLC & Corporation Registration in the USA",
  description:
    "Start your US company with FormLLC in minutes. Expert guidance for LLC and Corporation formation. Trusted by thousands of entrepreneurs. Get started today at https://formllc.io!",
  openGraph: {
    title: "FormLLC | Hassle-Free LLC & Corporation Registration in the USA",
    description:
      "FormLLC makes starting your US company easy. Expert assistance with LLC and Corporation formation. Secure, fast, and trusted by thousands.",
    url: "https://formllc.io/",
    type: "website",
    images: [
      {
        url: "https://formllc.io/og-image.webp", // Replace with the URL of your Open Graph image
        width: 1200,
        height: 630,
        alt: "FormLLC | Hassle-Free LLC & Corporation Registration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FormLLC | Hassle-Free LLC & Corporation Registration in the USA",
    description:
      "Easily register your LLC or Corporation in the USA with FormLLC. Fast, secure, and expert-supported registration services. Get started now!",
    images: ["https://formllc.io/twitter-image.webp"],
  },
  alternates: {
    canonical: "https://formllc.io/",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await syncDatabase();
  const GTMID = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en">
      <head>
        {/* Google Analytics Scripts */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GTMID}`}
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GTMID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}  ${notoSans.variable}`}
      >
        <Link
          href="https://api.whatsapp.com/send?phone=447909729519"
          target="_blank"
          className="link-block"
        >
          <Image
            src="/images/download.png"
            width={50}
            height={50}
            alt="whatsapp"
            className="whatsapp"
          />
        </Link>
        <AuthProvider>
          <InnerLayout>{children}</InnerLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
