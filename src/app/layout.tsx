import type { Metadata } from "next";
import "./globals.css";
import PersistentShell from "@/components/layout/PersistentShell";

export const metadata: Metadata = {
  title: "E-CELL • The Entrepreneurship Cell | Collegiate Startup Incubator",
  description:
    "Autonomous collegiate startup incubator and venture launchpad. We empower student technopreneurs with prototype seed capital, hardware sandbox facilities, patent filing, and angel syndication.",
  keywords: [
    "E-Cell",
    "Entrepreneurship Cell",
    "Student Startup Incubator",
    "Venture Capital",
    "DeepTech Sandbox",
    "Seed Grants",
    "Hackathon",
    "Angel Syndicate",
  ],
  authors: [{ name: "E-Cell Council" }],
  openGraph: {
    title: "E-CELL • The Entrepreneurship Cell | Venture Launchpad",
    description: "Turning dorm-room engineering prototypes into venture-backed technology companies.",
    siteName: "E-Cell",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#08090D] text-gray-100 antialiased selection:bg-cyan-500/20 selection:text-cyan-300 min-h-screen relative font-sans">
        <PersistentShell>{children}</PersistentShell>
      </body>
    </html>
  );
}
