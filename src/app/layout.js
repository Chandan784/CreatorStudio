"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
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
  const pathname = usePathname();

 
  // useEffect(() => {
  //   const isAuthenticated = checkAuth(); // Implement your auth check logic

  //   // List of public routes that don't require authentication
  //   const publicRoutes = ["/login", "/register", "/forgot-password"];

  //   if (!isAuthenticated && !publicRoutes.includes(pathname)) {
  //     router.push("/auth");
  //   }
  // }, [pathname, router]);

  // Helper function to check authentication
  // const checkAuth = () => {
  // Check token in localStorage (client-side only)
  //   if (typeof window !== "undefined") {
  //     return !!localStorage.getItem("token");
  //   }
  //   return false;
  // };

  return (
    <Provider store={store}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="flex min-h-screen flex-col">
            {/* Conditionally render Navbar if not on auth pages */}
            {!["/login", "/register"].includes(pathname) && <Navbar />}

            {/* Main Content */}
            <main className="flex-1">{children}</main>

            {/* Conditionally render Footer if not on auth pages */}
            {!["/login", "/register"].includes(pathname) && <Footer />}
          </div>
        </body>
      </html>
    </Provider>
  );
}
