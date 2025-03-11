"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import { useRouter } from "next/navigation"; // Import useRouter for routing
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "@/store/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    console.log("Page loaded, current route:", router.asPath);
  }, [router.asPath]);

  return (
    <Provider store={store}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="flex min-h-screen flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Sidebar */}

            {/* Main Content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <Footer />
          </div>
        </body>
      </html>
    </Provider>
  );
}
