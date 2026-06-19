"use client";

import { motion } from "framer-motion";
import { GoDotFill } from "react-icons/go";
import { FaPlay } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: (delay) => ({
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.8,
      delay,
      ease: "easeOut",
    },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030312] pt-[160px]">
      {/* Background Image */}

      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* Cinematic Dark Overlay */}

      <div className="absolute inset-0 bg-black/65" />

      {/* Lime Glow */}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-[#D9FF3F]/20 blur-[140px]" />

      {/* Dot Pattern */}

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,.2) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Content */}

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Badge */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,.3)]">
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <GoDotFill className="text-[#D9FF3F] text-xl" />
            </motion.div>

            <span className="text-gray-200 font-medium">
              Smart Training. Real Results.
            </span>
          </div>
        </motion.div>

        {/* Heading */}

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-center font-bold text-white text-5xl md:text-7xl lg:text-[78px] leading-[1.05]"
        >
          Where Fitness Passion

          <br />

          Discipline And

          <span className="text-[#D9FF3F]"> Results Come Together</span>

          <br />

          Daily
        </motion.h1>

        {/* Description */}

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="max-w-3xl mx-auto text-center text-gray-300 text-lg md:text-xl mt-8 leading-relaxed"
        >
          Build strength, stay motivated and train smarter with expert-led
          programs designed to transform your fitness journey.
        </motion.p>

        {/* Features */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="flex flex-wrap justify-center gap-10 mt-12"
        >
          {[
            "Stronger Every Day",
            "Transform Your Body",
            "Train Hard. Stay Fit.",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 text-white"
            >
              <div className="relative">
                <div className="w-4 h-4 rounded-full border-2 border-[#D9FF3F]" />

                <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-[#D9FF3F]" />
              </div>

              <span>{item}</span>
            </div>
          ))}
        </motion.div>

        {/* Buttons */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="flex justify-center gap-6 flex-wrap mt-14 mb-6"
        >
          {/* Explore Button */}

          <button className="group px-10 py-5 rounded-full bg-[#D9FF3F] text-black font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_45px_rgba(217,255,63,.45)]">
            <span className="flex items-center gap-3">
              Explore Classes

              <ArrowUpRight
                size={20}
                className="transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </span>
          </button>

          {/* Watch Video */}

          <button className="group flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#D9FF3F] text-black flex items-center justify-center shadow-[0_0_35px_rgba(217,255,63,.35)] transition-all duration-300 group-hover:scale-110">
              <FaPlay />
            </div>

            <span className="text-white text-xl font-semibold">
              Watch Video
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}