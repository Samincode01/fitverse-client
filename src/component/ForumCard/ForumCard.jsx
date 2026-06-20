"use client";

import Link from "next/link";

export default function ForumCard({
  id,
  image,
  title,
  author,
  description,
}) {
  return (
    <div className="bg-[#0A0A18] border border-gray-800 rounded-3xl overflow-hidden shadow-lg">

      <img
        src={image}
        alt={title}
        className="w-full h-[250px] object-cover"
      />

      <div className="p-6">

        <p className="text-[#D9FF3F] text-sm font-semibold">
          By {author}
        </p>

        <h2 className="text-white text-2xl font-bold mt-3">
          {title}
        </h2>

        <p className="text-gray-300 mt-4 leading-7">
          {description}
        </p>

        <Link
          href={`/forum/${id}`}
          className="inline-block mt-6 px-6 py-3 rounded-xl bg-[#D9FF3F] text-black font-semibold hover:opacity-90"
        >
          Read More
        </Link>

      </div>

    </div>
  );
}