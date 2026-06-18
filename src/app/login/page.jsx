"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { FaReact } from "react-icons/fa";

export default function LoginPage() {
  return (
    <section className="relative min-h-screen bg-[#030312] overflow-hidden flex items-center justify-center px-6">

      {/* Background Image */}

      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#030312]/70 via-[#030312]/85 to-[#030312]" />

      {/* Glow */}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#D9FF3F]/20 blur-[130px]" />

      {/* Card */}

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .7 }}
        className="
        relative
        z-10

        w-full
        max-w-md

        rounded-[35px]

        border
        border-white/10

        bg-white/[0.04]

        backdrop-blur-2xl

        p-10

        shadow-[0_20px_60px_rgba(0,0,0,.5)]
        "
      >

        {/* Logo */}

        <div className="flex flex-col items-center">

          <div
            className="
            w-16
            h-16

            rounded-full

            border

            border-[#D9FF3F]/30

            bg-[#D9FF3F]/10

            flex

            items-center

            justify-center
          "
          >
            <FaReact className="text-[#D9FF3F] text-4xl" />
          </div>

          <h1 className="text-white text-4xl font-bold mt-6">
            Welcome Back
          </h1>

          <p className="text-gray-400 text-center mt-3">
            Login to continue your fitness journey with Fitverse.
          </p>

        </div>

        {/* Form */}

        <form className="mt-10 space-y-6">

          {/* Email */}

          <div>

            <label className="text-gray-300 mb-3 block">
              Email Address
            </label>

            <div
              className="
              flex

              items-center

              gap-3

              px-5

              h-14

              rounded-2xl

              border

              border-white/10

              bg-white/[0.03]

              focus-within:border-[#D9FF3F]
            "
            >

              <Mail className="text-[#D9FF3F]" size={20} />

              <input
                type="email"
                placeholder="Enter your email"
                className="
                flex-1

                bg-transparent

                outline-none

                text-white

                placeholder:text-gray-500
              "
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="text-gray-300 mb-3 block">
              Password
            </label>

            <div
              className="
              flex

              items-center

              gap-3

              px-5

              h-14

              rounded-2xl

              border

              border-white/10

              bg-white/[0.03]

              focus-within:border-[#D9FF3F]
            "
            >

              <Lock className="text-[#D9FF3F]" size={20} />

              <input
                type="password"
                placeholder="Enter your password"
                className="
                flex-1

                bg-transparent

                outline-none

                text-white

                placeholder:text-gray-500
              "
              />

            </div>

          </div>

          {/* Remember */}

          <div className="flex justify-between items-center">

            <label className="flex items-center gap-2 text-gray-400 text-sm">

              <input type="checkbox" />

              Remember me

            </label>

            <Link
              href="/forgot-password"
              className="text-[#D9FF3F] text-sm"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Login Button */}

          <button
            className="
            w-full

            h-14

            rounded-full

            bg-[#D9FF3F]

            text-black

            font-bold

            text-lg

            flex

            items-center

            justify-center

            gap-3

            transition-all

            duration-300

            hover:scale-[1.02]

            hover:bg-[#c8ee38]
          "
          >

            Login

            <ArrowRight size={20} />

          </button>

        </form>

        {/* Footer */}

        <div className="mt-8 text-center">

          <p className="text-gray-400">

            Don't have an account?

            <Link
              href="/register"
              className="text-[#D9FF3F] ml-2 font-semibold"
            >
              Create Account
            </Link>

          </p>

        </div>

      </motion.div>

    </section>
  );
}