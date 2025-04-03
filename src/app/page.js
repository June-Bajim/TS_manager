"use client";  // Ensures this runs on the client side
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if user is not authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
          {children}
        
        </main>
      </body>
    </html>
  );
}
