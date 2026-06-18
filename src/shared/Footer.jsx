"use client";

import Link from "next/link";
import {
  FaReact,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  const socials = [
    { icon: <FaFacebookF /> },
    { icon: <FaInstagram /> },
    { icon: <FaTwitter /> },
    { icon: <FaYoutube /> },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#030312] border-t border-white/10">

      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[220px] bg-[#D9FF3F]/10 blur-[120px]" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,.25) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-full border border-[#D9FF3F]/30 bg-[#D9FF3F]/10 flex items-center justify-center">

                <FaReact className="text-[#D9FF3F] text-3xl" />

              </div>

              <div>

                <h2 className="text-white text-3xl font-bold">
                  Fitverse
                </h2>

                <p className="text-gray-400 text-sm">
                  Smart Training
                </p>

              </div>

            </div>

            <p className="text-gray-400 mt-8 leading-8 max-w-sm">
              Train smarter, stay consistent and transform your body with
              premium fitness programs, expert guidance and a thriving
              community.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-white text-xl font-semibold mb-8">
              Quick Links
            </h3>

            <div className="flex flex-col gap-5">

              <Link href="/" className="text-gray-400 hover:text-[#D9FF3F] transition">
                Home
              </Link>

              <Link href="/classes" className="text-gray-400 hover:text-[#D9FF3F] transition">
                All Classes
              </Link>

              <Link href="/forum" className="text-gray-400 hover:text-[#D9FF3F] transition">
                Community Forum
              </Link>

            </div>

          </div>

          {/* Programs */}

          <div>

            <h3 className="text-white text-xl font-semibold mb-8">
              Programs
            </h3>

            <div className="flex flex-col gap-5">

              <Link href="#" className="text-gray-400 hover:text-[#D9FF3F] transition">
                Strength Training
              </Link>

              <Link href="#" className="text-gray-400 hover:text-[#D9FF3F] transition">
                Weight Loss
              </Link>

              <Link href="#" className="text-gray-400 hover:text-[#D9FF3F] transition">
                Yoga & Mobility
              </Link>

              <Link href="#" className="text-gray-400 hover:text-[#D9FF3F] transition">
                Personal Coaching
              </Link>

            </div>

          </div>

          {/* Newsletter */}

          <div>

            <h3 className="text-white text-xl font-semibold mb-8">
              Stay Updated
            </h3>

            <p className="text-gray-400 mb-6">
              Subscribe to get fitness tips and exclusive updates.
            </p>

            <div className="flex flex-col gap-4">

              <input
                type="email"
                placeholder="Your email"
                className="h-14 px-5 rounded-2xl bg-white/[0.04] border border-white/10 outline-none text-white placeholder:text-gray-500 focus:border-[#D9FF3F] transition"
              />

              <button className="h-14 rounded-2xl bg-[#D9FF3F] text-black font-bold transition-all duration-300 hover:scale-[1.02] hover:bg-[#c9ef39] cursor-pointer">
                Subscribe
              </button>

            </div>

          </div>

        </div>

        <div className="h-[1px] bg-white/10 my-14" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          <p className="text-gray-500 text-sm">
            © 2025 Fitverse. All Rights Reserved.
          </p>

          <div className="flex items-center gap-5">

            {socials.map((item, i) => (

              <button
                key={i}
                className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.03] text-gray-300 flex items-center justify-center transition-all duration-300 hover:text-[#D9FF3F] hover:border-[#D9FF3F]/40 hover:-translate-y-1 cursor-pointer"
              >
                {item.icon}
              </button>

            ))}

          </div>

        </div>

      </div>

    </footer>
  );
}