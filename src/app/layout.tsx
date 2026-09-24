import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import PersistentShell from "@/components/layout/PersistentShell";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ecell.vsbcetc.edu.in"),
  title: "E-CELL | VSB College of Engineering Technical Campus",
  description:
    "Official Entrepreneurship Cell of VSB College of Engineering Technical Campus (Autonomous), Coimbatore. Where vision meets venture. Associated with National Entrepreneurship Challenge, E-Cell IIT Bombay.",
  keywords: [
    "VSB E-Cell",
    "VSBCETC",
    "Entrepreneurship Cell",
    "Coimbatore Startup Incubator",
    "IIT Bombay NEC",
    "Student Innovation",
    "Tech Startups Coimbatore",
  ],
  authors: [{ name: "VSBCETC Entrepreneurship Cell" }],
  openGraph: {
    title: "E-CELL VSBCETC | Where Vision Meets Venture",
    description: "Incubating next-generation founders, technology leaders, and impactful enterprises.",
    url: "https://ecell.vsbcetc.edu.in",
    siteName: "E-Cell VSBCETC",
    images: [
      {
        url: "/photos/team_poster.webp",
        width: 1200,
        height: 630,
        alt: "VSB College of Engineering Technical Campus E-Cell Team",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#F7F3E9] text-[#121316] font-body selection:bg-[#82111E] selection:text-white antialiased">
        <PersistentShell>{children}</PersistentShell>
      </body>
    </html>
  );
}
