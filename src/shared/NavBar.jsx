"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { FaReact } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Classes", path: "/classes" },
    { name: "Community Forum", path: "/forum" },
  ];

  return (
    <header className="w-full absolute top-0 left-0 z-50">

      <nav className="w-full h-20 px-6 md:px-12 flex items-center justify-between bg-black/20 backdrop-blur-xl border-b border-white/10">

        {/* Logo */}

        <Link href="/" className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-full bg-[#D9FF3F]/10 border border-[#D9FF3F]/30 flex items-center justify-center">

            <FaReact className="text-[#D9FF3F] text-2xl" />

          </div>

          <div>

            <h2 className="text-white text-2xl font-bold">
              Fitverse
            </h2>

            <p className="text-xs text-gray-400">
              Smart Training
            </p>

          </div>

        </Link>

        {/* Desktop Nav */}

        <ul className="hidden lg:flex items-center gap-10">

          {navLinks.map((item) => (

            <li key={item.path}>

              <Link
                href={item.path}
                className={`relative font-medium transition group ${
                  pathname === item.path
                    ? "text-[#D9FF3F]"
                    : "text-gray-300 hover:text-white"
                }`}
              >

                {item.name}

                <span
                  className={`absolute left-0 -bottom-2 h-[2px] bg-[#D9FF3F] transition-all duration-300 ${
                    pathname === item.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />

              </Link>

            </li>

          ))}

        </ul>

        {/* Login */}

        <div className="hidden lg:block">

          <Link
            href="/login"
            className="px-7 py-3 rounded-full bg-[#D9FF3F] text-black font-semibold transition-all duration-300 hover:bg-[#c6ea37] hover:scale-105"
          >
            Login
          </Link>

        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white"
        >

          {open ? <X size={28} /> : <Menu size={28} />}

        </button>

      </nav>

      {/* Mobile Menu */}

      {open && (

        <div className="lg:hidden bg-black/80 backdrop-blur-2xl border-b border-white/10 p-6">

          <div className="flex flex-col gap-6">

            {navLinks.map((item) => (

              <Link
                key={item.path}
                href={item.path}
                onClick={() => setOpen(false)}
                className={
                  pathname === item.path
                    ? "text-[#D9FF3F] font-semibold"
                    : "text-white"
                }
              >
                {item.name}
              </Link>

            ))}

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="bg-[#D9FF3F] text-black rounded-full py-3 text-center font-semibold"
            >
              Login
            </Link>

          </div>

        </div>

      )}

    </header>
  );
}