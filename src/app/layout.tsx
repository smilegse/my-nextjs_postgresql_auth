import localFont from "next/font/local";
import "./globals.css";
import ProgressbarProvider from "@/components/progressbar-provider";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata = {
    title: "Next's Auth",
    description: "This is a User login authentication project using Postgresql",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>

        <ProgressbarProvider>
            {children}
        </ProgressbarProvider>

        </body>
        </html>
    );
}
