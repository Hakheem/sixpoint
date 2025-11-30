import type { Metadata } from "next";
import { Work_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Footer from "./_components/Footer"

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
      <body
        className={`${workSans.variable} ${cormorantGaramond.variable} antialiased`}
      >
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
