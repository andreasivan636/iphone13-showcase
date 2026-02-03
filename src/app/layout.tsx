import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Atau font Outfit kamu
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "iPhone 13 Showcase",
    description: "Scrollytelling Experience",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {/* Pastikan tidak ada ReactLenis membungkus children ini */}
                {children}
            </body>
        </html>
    );
}