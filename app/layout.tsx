import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kalgo4444 | Frontend Developer",
    template: "%s | Kalgo4444",
  },
  description: "Portfolio of Kalgo4444, a Frontend Developer specializing in building accessible, pixel-perfect, and performant web experiences with Next.js and Tailwind CSS.",
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "Web Development",
    "Portfolio",
    "Kalgo4444",
    "Abdulaziz Abdugafurov",
  ],
  authors: [
    {
      name: "Kalgo4444",
      url: "https://github.com/kalgo4444",
    },
  ],
  creator: "Kalgo4444",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kalgo4444.vercel.app",
    title: "Kalgo4444 | Frontend Developer",
    description: "Building digital experiences that matter. Explore my projects and skills.",
    siteName: "Kalgo4444 Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalgo4444 | Frontend Developer",
    description: "Building digital experiences that matter. Explore my projects and skills.",
    creator: "@kalgo4444",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
