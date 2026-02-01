import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: "iPhone 13 | Cinematic",
    description: "Experience the new iPhone 13.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="lenis">
            <body className={outfit.className}>{children}</body>
        </html>
    );
}
