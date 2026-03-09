import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TemplateLayer | Premium HTML, CSS & JavaScript Templates",
  description: "Discover beautifully crafted, SEO-optimized website templates. Live preview, instant access, and professionally designed for modern web projects.",
  keywords: "HTML templates, CSS templates, JavaScript templates, website templates, web design, responsive templates",
  authors: [{ name: "TemplateLayer" }],
  openGraph: {
    title: "TemplateLayer | Premium Website Templates",
    description: "Discover beautifully crafted, SEO-optimized website templates with live previews.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TemplateLayer | Premium Website Templates",
    description: "Discover beautifully crafted, SEO-optimized website templates with live previews.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
