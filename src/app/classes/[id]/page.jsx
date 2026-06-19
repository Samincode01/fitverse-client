import Image from "next/image";
import Link from "next/link";
import { Users, Heart, ArrowLeft } from "lucide-react";

async function getClass(id) {
  try {
    const res = await fetch(`http://localhost:5000/classes/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    return res.json();

  } catch (error) {

    console.log(error);

    return null;

  }
}

export default async function ClassDetails({ params }) {

  const { id } = await params;

  const data = await getClass(id);

  if (!data) {

    return (

      <section className="min-h-screen bg-[#030312] flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-white text-5xl font-bold">
            Class Not Found
          </h1>

          <p className="text-gray-400 mt-4">
            The class you are looking for does not exist.
          </p>

          <Link
            href="/classes"
            className="inline-block mt-8 px-8 py-4 rounded-full bg-[#D9FF3F] text-black font-bold"
          >
            Back To Classes
          </Link>

        </div>

      </section>

    );
  }

  return (

    <section className="min-h-screen bg-[#030312] pt-36 pb-20 px-6">

      <div className="max-w-7xl mx-auto">

        <Link
          href="/classes"
          className="inline-flex items-center gap-2 text-[#D9FF3F] mb-10"
        >

          <ArrowLeft size={18} />

          Back to Classes

        </Link>

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Image */}

          <div className="relative h-[550px] rounded-[35px] overflow-hidden border border-white/10">

            <Image
              src={data.image}
              alt={data.title}
              fill
              sizes="100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          </div>

          {/* Content */}

          <div>

            <span className="px-5 py-2 rounded-full bg-pink-500/20 text-pink-300 text-sm font-semibold">

              {data.category}

            </span>

            <h1 className="text-6xl font-bold text-white mt-8">

              {data.title}

            </h1>

            <p className="text-gray-400 mt-6 text-lg leading-9">

              {data.description}

            </p>

            {/* Info */}

            <div className="flex flex-wrap gap-5 mt-10">

              <div className="px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.03]">

                <p className="text-gray-400 text-sm">

                  Level

                </p>

                <h3 className="text-[#D9FF3F] text-xl font-bold mt-1">

                  {data.level}

                </h3>

              </div>

              <div className="px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.03]">

                <p className="text-gray-400 text-sm">

                  Students

                </p>

                <div className="flex items-center gap-2 mt-1">

                  <Users size={20} className="text-[#D9FF3F]" />

                  <h3 className="text-white text-xl font-bold">

                    {data.students}

                  </h3>

                </div>

              </div>

              <div className="px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.03]">

                <p className="text-gray-400 text-sm">

                  Price

                </p>

                <h3 className="text-[#D9FF3F] text-xl font-bold mt-1">

                  ${data.price}

                </h3>

              </div>

            </div>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-14">

              <button className="px-10 py-5 rounded-full bg-[#D9FF3F] text-black font-bold text-lg hover:scale-105 transition-all duration-300 cursor-pointer">

                Book Now

              </button>

              <button className="px-10 py-5 rounded-full border border-[#D9FF3F]/30 text-[#D9FF3F] flex items-center gap-3 hover:bg-[#D9FF3F] hover:text-black transition-all duration-300 cursor-pointer">

                <Heart size={22} />

                Add To Favourite

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>

  );
}