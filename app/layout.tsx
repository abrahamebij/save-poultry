import type { Metadata } from "next";
import { Roboto, Roboto_Slab, Roboto_Mono } from "next/font/google";
import QueryProvider from "@/components/QueryProvider";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ui",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "SavePoultry — AI Poultry Health Diagnosis",
  description:
    "Upload a photo of your chicken and get an instant AI diagnosis. Detect diseases early, save your flock.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${robotoSlab.variable} ${robotoMono.variable}`}
    >
      <body className="bg-background text-text font-ui antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}