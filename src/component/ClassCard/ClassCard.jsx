"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock3, Users } from "lucide-react";

export default function ClassCard({
  image,
  title,
  trainer,
  category,
  level,
  price,
  duration,
  students,
  description,
}) {
  return (
    <div
      className="
      group
      overflow-hidden
      rounded-[30px]
      border border-white/10
      bg-white/[0.03]
      backdrop-blur-xl
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-[#D9FF3F]/30
      "
    >

      {/* Image */}

      <div className="relative h-[280px] overflow-hidden">

        <Image
          src={image}
          alt={title}
          fill
          className="
          object-cover
          transition-transform
          duration-700
          group-hover:scale-110
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Category */}

        <div
          className="
          absolute
          top-5
          left-5

          px-4
          py-2

          rounded-full

          bg-black/30

          text-white

          text-sm

          font-semibold
          "
        >
          {category}
        </div>

        {/* Duration */}

        <div
          className="
          absolute

          bottom-5
          left-5

          px-5
          py-2

          rounded-xl

          bg-pink-400

          text-white

          font-bold
          "
        >
          {duration}
        </div>

      </div>

      {/* Content */}

      <div className="p-8">

        <h2 className="text-3xl font-bold text-white">
          {title}
        </h2>

        <p className="text-gray-400 mt-2">
          by Trainer
        </p>

        {/* Meta */}

        <div className="flex items-center gap-5 mt-6">

          <span
            className="
            px-4
            py-2

            rounded-full

            bg-[#D9FF3F]/15

            text-[#D9FF3F]

            text-sm

            font-semibold
            "
          >
            {level}
          </span>

          <div className="flex items-center gap-2 text-gray-400">

            <Clock3 size={18} />

            <span>{duration}</span>

          </div>

          <div className="flex items-center gap-2 text-gray-400">

            <Users size={18} />

            <span>{students}</span>

          </div>

        </div>

        {/* Description */}

        <p className="text-gray-400 mt-7 leading-8">
          {description}
        </p>

        {/* Footer */}

        <div className="border-t border-white/10 mt-8 pt-8 flex items-center justify-between">

          <div>

            <h3 className="text-4xl font-bold text-[#D9FF3F]">
              ${price}
            </h3>

            <p className="text-gray-500 text-sm">
              /session
            </p>

          </div>

          <Link
            href="/classes"
            className="
            px-8
            py-4

            rounded-2xl

            border

            border-[#D9FF3F]/30

            text-[#D9FF3F]

            font-semibold

            transition-all

            duration-300

            hover:bg-[#D9FF3F]

            hover:text-black
            "
          >
            View Details
          </Link>

        </div>

      </div>

    </div>
  );
}