import { JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { siteMetadata } from "@/entities/profile";
import { THEME_STORAGE_KEY } from "@/features/theme-toggle";
import { ScrollProgress } from "@/shared/ui/scroll-progress";
import { SiteHeader } from "@/widgets/site-header";
import { Providers } from "./providers";
import "./globals.css";

// No weight list: one variable font file instead of one file per weight.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = siteMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the theme script adds the "dark" class before React hydrates.
    <html
      lang="en"
      className={`${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      {/* Desktop and laptop (lg+): the whole site fits one 100vh screen. Tablet and phone: natural height. */}
      <body className="flex min-h-dvh flex-col bg-canvas font-mono text-ink lg:h-dvh">
        {/* Light is the default; only an explicit saved choice turns dark on, before first paint. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark")document.documentElement.classList.add("dark")}catch{}`}
        </Script>
        <Providers>
          <ScrollProgress />
          <SiteHeader />
          {/* Scrolls inside itself only if a short laptop screen can't fit the page. */}
          <main className="grid flex-1 grid-cols-1 lg:min-h-0 lg:overflow-y-auto">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
