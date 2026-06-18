"use client";

import Link from "next/link";
import { Button, Avatar } from "@heroui/react";
import { GiMuscleUp } from "react-icons/gi";
import { FiArrowUpRight } from "react-icons/fi";

const user = null; // later replace with auth user

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "All Classes",
    href: "/classes",
  },
  {
    label: "Community Forum",
    href: "/forum",
  },
];

export default function NavBar() {
  return (
    <header className="fixed top-5 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-5">
        <div className="h-20 px-8 rounded-full border border-white/10 backdrop-blur-2xl bg-white/5 flex items-center justify-between">

          {/* logo */}

          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-lime-400 flex items-center justify-center">
              <GiMuscleUp className="text-2xl text-black" />
            </div>

            <h1 className="text-3xl font-bold text-white">
              FitVerse
            </h1>
          </Link>

          {/* nav links */}

          <div className="hidden lg:flex items-center gap-10">

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white font-semibold hover:text-lime-400 transition"
              >
                {item.label}
              </Link>
            ))}

            {user && (
              <Link
                href="/dashboard"
                className="text-white font-semibold hover:text-lime-400 transition"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* right */}

          <div className="flex items-center gap-4">

            {user ? (
              <>
                <Avatar src={user?.image} />

                <Button
                  radius="full"
                  className="bg-lime-400 text-black font-bold"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="light"
                    className="text-white"
                  >
                    Login
                  </Button>
                </Link>

                <Link href="/register">
                  <Button
                    radius="full"
                    className="bg-lime-400 text-black px-6 font-bold"
                    endContent={<FiArrowUpRight />}
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}

          </div>
        </div>
      </div>
    </header>
  );
}