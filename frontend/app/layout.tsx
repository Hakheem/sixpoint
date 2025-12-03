import type { Metadata } from "next";
import { Work_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import Footer from "./_components/Footer"
import Header from "./_components/header/Header";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Wittgenstein from Google Fonts
const wittgenstein = {
  variable: "--font-wittgenstein",
  style: "normal",
};

export const metadata: Metadata = {
  title: "SixPoint Victoria Hotel",
  description: "Experience luxurious comfort and exceptional hospitality at SixPoint Victoria Hotel. Your perfect getaway with premium amenities, exquisite dining, and unforgettable memories in the heart of Victoria.",
  keywords: "hotel, accommodation, luxury stay, Kenya, Kisumu, vacation, booking",
};

export default function RootLayout({
  children,
}: Readonly<{ 
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Wittgenstein:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${workSans.variable} ${cormorantGaramond.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}

