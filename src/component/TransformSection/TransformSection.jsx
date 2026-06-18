"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Dumbbell,
  Activity,
  ArrowUpRight,
  PhoneCall,
} from "lucide-react";

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

export default function AboutSection() {
  return (
    <section className="bg-[#030312] py-28">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT IMAGE */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            className="relative"
          >

            {/* Glow */}

            <div className="absolute -inset-5 bg-[#D9FF3F]/10 blur-3xl rounded-[40px]" />

            <div
              className="
              relative

              rounded-[35px]

              overflow-hidden

              border

              border-white/10

              shadow-[0_20px_60px_rgba(0,0,0,.5)]
            "
            >

              <Image
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop"
                alt="Fitness"
                width={700}
                height={800}
                className="
                w-full

                h-[650px]

                object-cover

                hover:scale-105

                transition-all

                duration-700
              "
              />

            </div>

          </motion.div>

          {/* RIGHT CONTENT */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
          >

            {/* Badge */}

            <div
              className="
              inline-flex

              items-center

              gap-2

              px-5 py-2

              rounded-full

              border

              border-white/10

              bg-white/[0.04]

              backdrop-blur-xl

              mb-7
            "
            >

              <div className="w-2 h-2 rounded-full bg-[#D9FF3F] animate-pulse" />

              <span className="text-gray-300">
                What We Do
              </span>

            </div>

            {/* Heading */}

            <h2
              className="
              text-white

              font-bold

              text-5xl

              leading-tight
            "
            >
              Transforming Fitness Goals

              <span className="text-[#D9FF3F]">
                {" "}Into Real Results
              </span>

            </h2>

            {/* Description */}

            <p
              className="
              text-gray-400

              text-lg

              leading-relaxed

              mt-7
            "
            >
              We provide expert fitness coaching and personalized
              workout programs designed to help you build strength,
              improve endurance and achieve lasting results.
            </p>

            {/* Feature 1 */}

            <div className="flex gap-5 mt-12">

              <div
                className="
                w-14
                h-14

                rounded-full

                bg-[#D9FF3F]

                text-black

                flex

                items-center

                justify-center
              "
              >
                <Dumbbell />
              </div>

              <div>

                <h3 className="text-white text-2xl font-semibold">
                  Nutrition & Lifestyle Guidance
                </h3>

                <p className="text-gray-400 mt-3">
                  Personalized guidance on diet, wellness and
                  sustainable habits to maximize your results.
                </p>

              </div>

            </div>

            <div className="border-b border-white/10 my-10" />

            {/* Feature 2 */}

            <div className="flex gap-5">

              <div
                className="
                w-14
                h-14

                rounded-full

                bg-[#D9FF3F]

                text-black

                flex

                items-center

                justify-center
              "
              >
                <Activity />
              </div>

              <div>

                <h3 className="text-white text-2xl font-semibold">
                  Personalized Workout Programs
                </h3>

                <p className="text-gray-400 mt-3">
                  Smart training programs tailored to your body,
                  goals and fitness level.
                </p>

              </div>

            </div>

            {/* CTA */}

            <div className="flex items-center gap-8 mt-14">

              <button
                className="
                group

                px-8 py-5

                rounded-full

                bg-[#D9FF3F]

                text-black

                font-semibold

                flex

                items-center

                gap-3

                transition-all

                duration-300

                hover:scale-105
              "
              >

                Get In Touch

                <ArrowUpRight
                  className="
                  group-hover:translate-x-1

                  group-hover:-translate-y-1

                  transition-all
                "
                />

              </button>

              <div className="flex items-center gap-4">

                <div
                  className="
                  w-14
                  h-14

                  rounded-full

                  bg-white/5

                  border

                  border-white/10

                  text-[#D9FF3F]

                  flex

                  items-center

                  justify-center
                "
                >
                  <PhoneCall />
                </div>

                <div>

                  <p className="text-white font-semibold">
                    Phone Number
                  </p>

                  <p className="text-gray-400">
                    +(123) 456-789
                  </p>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}