"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function FavouritePage() {

  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadFavourites = async () => {

      try {

        const session = await authClient.getSession();

        const userId = session?.data?.user?.id;

        if (!userId) {

          setLoading(false);

          return;

        }

        const favRes = await fetch(
          `http://localhost:5000/favourites/${userId}`
        );

        const favData = await favRes.json();

        const classPromises = favData.map(async (item) => {

          const res = await fetch(
            `http://localhost:5000/classes/${item.classId}`
          );

          return res.json();

        });

        const classes = await Promise.all(classPromises);

        setFavourites(classes);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    loadFavourites();

  }, []);

  if (loading) {

    return (

      <section className="min-h-screen bg-[#030312] flex items-center justify-center">

        <h1 className="text-white text-3xl">
          Loading...
        </h1>

      </section>

    );

  }

  return (

    <section className="min-h-screen bg-[#030312] py-28 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center gap-4 mb-14">

          <Heart className="text-[#D9FF3F]" size={35} />

          <h1 className="text-5xl font-bold text-white">

            My Favourite Classes

          </h1>

        </div>

        {favourites.length === 0 ? (

          <div className="text-center py-20">

            <h2 className="text-white text-3xl font-bold">

              No Favourite Classes Yet

            </h2>

            <p className="text-gray-400 mt-4">

              Start adding your favourite classes.

            </p>

            <Link
              href="/classes"
              className="inline-block mt-8 px-8 py-4 rounded-full bg-[#D9FF3F] text-black font-bold"
            >

              Browse Classes

            </Link>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {favourites.map((item) => (

              <div
                key={item._id}
                className="rounded-[30px] overflow-hidden border border-white/10 bg-white/[0.03]"
              >

                <div className="relative h-[250px]">

                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />

                </div>

                <div className="p-7">

                  <span className="text-[#D9FF3F] text-sm">

                    {item.category}

                  </span>

                  <h2 className="text-white text-2xl font-bold mt-3">

                    {item.title}

                  </h2>

                  <p className="text-gray-400 mt-4">

                    {item.description}

                  </p>

                  <div className="flex justify-between items-center mt-8">

                    <span className="text-[#D9FF3F] font-bold text-xl">

                      ${item.price}

                    </span>

                    <Link
                      href={`/classes/${item._id}`}
                      className="px-5 py-3 rounded-full bg-[#D9FF3F] text-black font-semibold"
                    >

                      View Details

                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>

  );
}