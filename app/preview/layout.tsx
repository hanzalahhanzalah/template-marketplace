import type { Metadata } from "next";
import "../(site)/globals.css";

export const metadata: Metadata = {
    title: "Template Preview | TemplateLayer",
    description: "Live preview of our premium website templates.",
};

export default function PreviewLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>{children}</main>
    );
}
