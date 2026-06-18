"use client";

import { motion } from "framer-motion";
import {
  Layers3,
  Workflow,
  Globe,
} from "lucide-react";

const steps = [
  {
    step: "Step 01",
    title: "Join Fitverse",
    description:
      "Begin with a fitness assessment to understand your goals, body composition and fitness level.",
    icon: Layers3,
  },

  {
    step: "Step 02",
    title: "Get Your Plan",
    description:
      "Take the first step toward a stronger you with a fitness plan designed just for your goals by expert trainers.",
    icon: Workflow,
  },

  {
    step: "Step 03",
    title: "Train With Experts",
    description:
      "Follow guided training sessions using modern equipment under professional supervision.",
    icon: Globe,
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: (i) => ({
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      delay: i * 0.15,
      ease: "easeOut",
    },
  }),
};

export default function ProcessSection() {
  return (
    <section className="relative py-28 bg-[#030312] overflow-hidden">

      {/* Glow */}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#D9FF3F]/10 blur-[130px]" />

      {/* Background Pattern */}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Badge */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="flex justify-center"
        >

          <div
            className="
            inline-flex
            items-center
            gap-3

            px-5
            py-2

            rounded-full

            border
            border-white/10

            bg-white/[0.04]

            backdrop-blur-xl
          "
          >

            <div className="w-2 h-2 rounded-full bg-[#D9FF3F] animate-pulse" />

            <span className="text-gray-300 text-sm">
              How It Work
            </span>

          </div>

        </motion.div>

        {/* Heading */}

        <motion.h2
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="
          text-center

          text-white

          font-bold

          text-5xl

          md:text-6xl

          leading-tight

          max-w-4xl

          mx-auto

          mt-8
        "
        >
          The Training Process Behind

          <span className="text-[#D9FF3F]">
            {" "}Real Fitness Success
          </span>

        </motion.h2>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {steps.map((item, i) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.step}

                custom={i}

                variants={fadeUp}

                initial="hidden"

                whileInView="visible"

                viewport={{ once: true }}

                className="
                group

                relative

                p-12

                rounded-[30px]

                border

                border-white/10

                bg-white/[0.03]

                backdrop-blur-xl

                overflow-hidden

                transition-all

                duration-500

                hover:border-[#D9FF3F]/30

                hover:-translate-y-2
              "
              >

                {/* Hover Glow */}

                <div
                  className="
                  absolute

                  inset-0

                  opacity-0

                  group-hover:opacity-100

                  transition-all

                  duration-500

                  bg-[radial-gradient(circle_at_top,#D9FF3F20,transparent_70%)]
                "
                />

                {/* Icon */}

                <div
                  className="
                  relative

                  z-10

                  w-16

                  h-16

                  rounded-full

                  bg-[#D9FF3F]

                  flex

                  items-center

                  justify-center

                  text-black

                  mx-auto
                "
                >

                  <Icon size={30} />

                </div>

                {/* Step */}

                <div className="flex justify-center mt-8">

                  <span
                    className="
                    px-5

                    py-2

                    rounded-full

                    border

                    border-white/10

                    bg-white/[0.03]

                    text-gray-300

                    text-sm
                  "
                  >
                    {item.step}
                  </span>

                </div>

                {/* Title */}

                <h3
                  className="
                  text-white

                  text-3xl

                  font-bold

                  text-center

                  mt-16
                "
                >
                  {item.title}
                </h3>

                {/* Description */}

                <p
                  className="
                  text-gray-400

                  text-center

                  leading-relaxed

                  mt-6

                  text-lg
                "
                >
                  {item.description}
                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}