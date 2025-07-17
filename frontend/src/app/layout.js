"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./components/sidebar";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/";

  return (
    <html lang="en">
      <head>
        <title>Course Management System</title>
        <meta name="description" content="Manage Courses and Students" />
      </head>
      <body className="flex min-h-screen bg-gray-100" suppressHydrationWarning>
        {showSidebar && <Sidebar />}
        <main
          className={`flex-1 p-4 md:p-6 overflow-x-auto ${
            showSidebar ? "" : ""
          }`}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
