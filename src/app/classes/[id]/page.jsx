import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  Users,
  BarChart3,
  DollarSign,
  ArrowLeft,
  Calendar,
} from "lucide-react";

import { auth } from "@/lib/auth";
import AddToFavouriteButton from "@/component/AddToFavouriteButton";
import BookNowButton from "@/component/BookNowButton";

async function getClass(id) {

  try {

    const res = await fetch(
      `http://localhost:5000/classes/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {

      return null;

    }

    return res.json();

  } catch {

    return null;

  }

}

export default async function ClassDetails({ params }) {

  const session = await auth.api.getSession({

    headers: await headers(),

  });

  if (!session) {

    redirect("/login");

  }

  const { id } = await params;

  const data = await getClass(id);

  if (!data) {

    return (

      <section className="min-h-screen bg-[#030312] flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-5xl font-bold text-white">

            Class Not Found

          </h1>

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

    <section className="min-h-screen bg-[#030312] pb-24">

      {/* Hero */}

      <div className="relative h-[500px]">

        <Image
          src={data.image}
          alt={data.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-[#030312]" />

      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-40 relative z-10">

        <Link
          href="/classes"
          className="inline-flex items-center gap-3 text-[#D9FF3F] mb-10"
        >

          <ArrowLeft size={18} />

          Back to Classes

        </Link>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left */}

          <div className="lg:col-span-2">

            <span className="px-5 py-2 rounded-full bg-[#D9FF3F]/10 border border-[#D9FF3F]/20 text-[#D9FF3F]">

              {data.category}

            </span>

            <h1 className="text-6xl font-bold text-white mt-8">

              {data.title}

            </h1>

            <p className="text-gray-400 mt-8 text-lg leading-9">

              {data.description}

            </p>

            {/* Info */}

            <div className="grid md:grid-cols-3 gap-6 mt-14">

              <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-8">

                <BarChart3
                  className="text-[#D9FF3F]"
                  size={30}
                />

                <p className="text-gray-400 mt-6">

                  Level

                </p>

                <h2 className="text-white text-3xl font-bold mt-2">

                  {data.level}

                </h2>

              </div>

              <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-8">

                <Users
                  className="text-[#D9FF3F]"
                  size={30}
                />

                <p className="text-gray-400 mt-6">

                  Students

                </p>

                <h2 className="text-white text-3xl font-bold mt-2">

                  {data.students}

                </h2>

              </div>

              <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-8">

                <DollarSign
                  className="text-[#D9FF3F]"
                  size={30}
                />

                <p className="text-gray-400 mt-6">

                  Price

                </p>

                <h2 className="text-white text-3xl font-bold mt-2">

                  ${data.price}

                </h2>

              </div>

            </div>

          </div>

          {/* Right */}

          <div>

            <div className="sticky top-28 rounded-[35px] bg-white/[0.03] border border-white/10 p-8">

              <div className="text-center">

                <p className="text-gray-400">

                  Course Price

                </p>

                <h1 className="text-6xl font-bold text-[#D9FF3F] mt-4">

                  ${data.price}

                </h1>

              </div>

              <div className="mt-10 space-y-5">

                <div className="flex justify-between">

                  <span className="text-gray-400">

                    Category

                  </span>

                  <span className="text-white">

                    {data.category}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-400">

                    Difficulty

                  </span>

                  <span className="text-white">

                    {data.level}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-400">

                    Students

                  </span>

                  <span className="text-white">

                    {data.students}

                  </span>

                </div>

              </div>

              {/* Static Booking */}

             <BookNowButton

 classId={data._id}

 title={data.title}

 price={data.price}

/>

              {/* Favourite */}

              <div className="mt-5 flex justify-center">

                <AddToFavouriteButton
                  classId={data._id}
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}