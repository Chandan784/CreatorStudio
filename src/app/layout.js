"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import { useRouter } from "next/navigation"; // Import useRouter for routing
import { useEffect } from "react";

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

  // Example of using useEffect to handle route changes
  useEffect(() => {
    // Example of a route change if needed
    console.log("Page loaded, current route:", router.asPath);
  }, [router.asPath]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          {/* Navbar */}
          <Navbar />

          <div className="flex  flex-1">
            {/* Sidebar */}

            {/* Main Content */}
            <main className="flex-1 ">
              {/* Render children dynamically based on routing */}
              {children}
            </main>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
