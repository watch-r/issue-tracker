import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import type { Metadata } from "next";
import { AR_One_Sans } from "next/font/google";
import NavBar from "./NavBar";
import { Theme, ThemePanel } from "@radix-ui/themes";

const arOneSans = AR_One_Sans({
    subsets: ["latin-ext", "latin"],
    variable: "--font-arOneSans",
});

export const metadata: Metadata = {
    title: "Issue Tracker",
    description: "App that tracks Issue",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className={arOneSans.variable}>
                <Theme accentColor='teal' grayColor='olive'>
                    <NavBar />
                    <main className='p-5'>{children}</main>
                    {/* <ThemePanel /> */}
                </Theme>
            </body>
        </html>
    );
}
