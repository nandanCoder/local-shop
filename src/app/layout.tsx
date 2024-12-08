import type { Metadata } from "next";
import { Lora } from "next/font/google";
import Footer from "./Footer";
import "./globals.css";
import Navbar from "./Navbar";
import ReactQueryProvider from "./ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Local Shop",
    absolute: "Local Shop",
  },
  description: "A full-stack e-commerce application built with Next.js 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lora.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <Navbar />
            {children}
            <Footer />
          </ReactQueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
