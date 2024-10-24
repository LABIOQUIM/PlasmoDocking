import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from "@/components/plasmodocking/Navbar/Navbar";
import { getUserLocale } from "@/services/locale";
import Footer from "@/components/plasmodocking/Footer/Footer";
import { ReactQueryProvider } from "@/components/plasmodocking/Provider/React_query_provider";

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

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getUserLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  console.log('====================================');
  console.log(locale);
  console.log('====================================');

  return (
    <html lang={locale}>
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <div className="pt-4 bg-white ">
              {children}
            </div>
              {/* <Footer /> */}
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
