import {GeistSans} from "geist/font/sans";
import "./globals.css";
import Head from "next/head";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "STARPOWER",
    description: "STARPOWER",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={GeistSans.className}>
        <head>
            <link rel="icon" href="./logo192.png" sizes="any"/>
        </head>
        <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
            {children}
        </main>
        </body>
        </html>
    );
}
