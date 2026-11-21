import { JetBrains_Mono } from "next/font/google";
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "500",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${jetbrainsMono.className}`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
