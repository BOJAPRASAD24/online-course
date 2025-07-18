"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/course", label: "Courses" },
  { href: "/student", label: "Students" },
  { href: "/enrollment", label: "Enrollment"},
  { href: "/instructor", label: "Instructor"},
  { href: "/", label: "Logout" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-4 bg-gray-900 text-white flex justify-between items-center">
        <h2 className="text-lg font-bold">Course Manager</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6 text-white" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "block" : "hidden"
        } md:block w-64 h-screen bg-gray-900 text-white flex flex-col fixed md:static z-50`}
      >
        <div className="text-2xl font-bold p-6 border-b border-gray-700 hidden md:block">
          Course Manager
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block px-4 py-2 rounded hover:bg-gray-700 transition ${
                pathname === href ? "bg-gray-800 font-semibold" : ""
              }`}
              onClick={() => {
                setIsOpen(false);
                if (label === "Logout") {
                  localStorage.removeItem("isAuthenticated");
                }
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
