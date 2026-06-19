"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, LayoutDashboard, LogOut, ChevronDown, Heart, } from "lucide-react";
import { FaReact } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const dropdownRef = useRef(null);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user || session?.data?.user;

  const dashboardLink =
    user?.role === "admin"
      ? "/dashboard/admin"
      : user?.role === "trainer"
      ? "/dashboard/trainer"
      : "/dashboard/user";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Classes", path: "/classes" },
    { name: "Community Forum", path: "/forum" },
  ];

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      toast.success("Logged out successfully");

      router.push("/");

      router.refresh();
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

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

        {/* Right Side Desktop */}

        <div className="hidden lg:flex items-center gap-5">

          {!isPending && user ? (

            <div className="flex items-center gap-4">

              <Link
                href={dashboardLink}
                className="px-6 py-3 rounded-full bg-[#D9FF3F] text-black font-semibold flex items-center gap-2 hover:bg-[#c6ea37] transition-all duration-300"
              >

                <LayoutDashboard size={18} />

                Dashboard

              </Link>

              <div className="relative" ref={dropdownRef}>

                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3"
                >

                  <img
                    src={user.image || "/avatar.png"}
                    alt={user.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#D9FF3F]"
                  />

                  <div className="text-left">

                    <h3 className="text-white font-semibold">
                      {user.name}
                    </h3>

                    <p className="text-xs text-gray-400 capitalize">
                      {user.role}
                    </p>

                  </div>

                  <ChevronDown
                    size={18}
                    className={`text-white transition ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />

                </button>

                {profileOpen && (

                  <div className="absolute right-0 top-16 w-56 rounded-2xl overflow-hidden border border-white/10 bg-[#0B0B18] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,.45)]">

                    <div className="px-5 py-4 border-b border-white/10">

                      <p className="text-white font-semibold">
                        {user.name}
                      </p>

                      <p className="text-gray-400 text-sm">
                        {user.email}
                      </p>

                    </div>

                 {user?.role === "user" && (

  <Link
    href="/dashboard/user/favourites"
    className="flex items-center gap-3 px-5 py-4 text-white hover:bg-white/5 transition"
  >

    <Heart size={18} className="text-[#D9FF3F]" />

    My Favourite Classes

  </Link>

)}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-4 text-red-400 hover:bg-white/5 transition cursor-pointer"
                    >

                      <LogOut size={18} />

                      Logout

                    </button>

                  </div>

                )}

              </div>

            </div>

          ) : (

            <Link
              href="/login"
              className="px-7 py-3 rounded-full bg-[#D9FF3F] text-black font-semibold transition-all duration-300 hover:bg-[#c6ea37] hover:scale-105"
            >
              Login
            </Link>

          )}

        </div>

        {/* Mobile Toggle */}

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white"
        >

          {open ? <X size={28} /> : <Menu size={28} />}

        </button>

      </nav>

      {/* Mobile Menu */}

      {open && (

        <div className="lg:hidden bg-black/90 backdrop-blur-2xl border-b border-white/10 p-6">

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

            {user ? (

              <>
                <div className="border-t border-white/10 pt-5 flex items-center gap-4">

                  <img
                    src={user.image || "/avatar.png"}
                    alt={user.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#D9FF3F]"
                  />

                  <div>

                    <h3 className="text-white font-semibold">
                      {user.name}
                    </h3>

                    <p className="text-gray-400 text-sm capitalize">
                      {user.role}
                    </p>

                  </div>

                </div>

                <Link
                  href={dashboardLink}
                  onClick={() => setOpen(false)}
                  className="bg-[#D9FF3F] text-black rounded-full py-3 text-center font-semibold"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-500/20 text-red-400 rounded-full py-3 font-semibold cursor-pointer"
                >
                  Logout
                </button>
              </>

            ) : (

              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="bg-[#D9FF3F] text-black rounded-full py-3 text-center font-semibold"
              >
                Login
              </Link>

            )}

          </div>

        </div>

      )}

    </header>
  );
}