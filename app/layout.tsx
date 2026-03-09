import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "TemplateLayer",
    description: "Template Marketplace",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
