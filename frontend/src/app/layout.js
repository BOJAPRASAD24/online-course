import Sidebar from "./components/sidebar";
import "./globals.css";

export const metadata = {
  title: "Course Management System",
  description: "Manage Courses and Students",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-100" suppressHydrationWarning>
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 overflow-x-auto">{children}</main>
      </body>
    </html>
  );
}
