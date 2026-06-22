import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {

  return (

    <section className="min-h-screen bg-[#030312] flex items-center justify-center px-6">

      <div className="text-center max-w-2xl">

        <div className="w-32 h-32 mx-auto rounded-full bg-[#D9FF3F]/10 border border-[#D9FF3F]/20 flex items-center justify-center">

          <Dumbbell

            size={65}

            className="text-[#D9FF3F]"

          />

        </div>

        <h1 className="text-[120px] leading-none font-extrabold text-[#D9FF3F] mt-10">

          404

        </h1>

        <h2 className="text-5xl font-bold text-white mt-4">

          Workout Not Found

        </h2>

        <p className="text-gray-400 text-lg mt-6 max-w-xl mx-auto">

          Looks like this page skipped leg day and disappeared.
          The page you are looking for doesn't exist.

        </p>

        <Link

          href="/"

          className="inline-flex items-center justify-center mt-12 px-10 py-5 rounded-full bg-[#D9FF3F] text-black font-bold text-lg hover:scale-105 transition-all duration-300"

        >

          Back To Home

        </Link>

      </div>

    </section>

  );

}