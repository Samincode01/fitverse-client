"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Calendar, DollarSign } from "lucide-react";

export default function MyBookings() {

  const { data: session } = authClient.useSession();

  const user = session?.user || session?.data?.user;

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!user?.email) return;

    fetch(

      `${process.env.NEXT_PUBLIC_API_URL}/bookings/${user.email}`

    )

      .then(res => res.json())

      .then(data => {

        setBookings(data);

        setLoading(false);

      });

  }, [user]);

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h1 className="text-white text-3xl">

          Loading...

        </h1>

      </div>

    );

  }

  return (

    <section className="min-h-screen bg-[#030312] py-10 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-white mb-12">

          My Booked Classes

        </h1>

        {

          bookings.length === 0 ?

          (

            <div className="text-center py-20">

              <h2 className="text-white text-3xl">

                No Bookings Yet

              </h2>

            </div>

          )

          :

          (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {

                bookings.map(item => (

                  <div

                    key={item._id}

                    className="rounded-[30px] overflow-hidden border border-white/10 bg-white/[0.03]"

                  >

                    <Image

                      src={item.classImage}

                      alt={item.classTitle}

                      width={500}

                      height={300}

                      className="w-full h-[220px] object-cover"

                    />

                    <div className="p-7">

                      <span className="text-[#D9FF3F]">

                        {item.classCategory}

                      </span>

                      <h2 className="text-white text-3xl font-bold mt-4">

                        {item.classTitle}

                      </h2>

                      <p className="text-gray-400 mt-4">

                        Trainer:

                        {" "}

                        {item.trainerName}

                      </p>

                      <div className="flex items-center gap-6 mt-6">

                        <div className="flex items-center gap-2">

                          <DollarSign

                            className="text-[#D9FF3F]"

                            size={20}

                          />

                          <span className="text-white">

                            ${item.price}

                          </span>

                        </div>

                        <div className="flex items-center gap-2">

                          <Calendar

                            className="text-[#D9FF3F]"

                            size={20}

                          />

                          <span className="text-white">

                            Paid

                          </span>

                        </div>

                      </div>

                    </div>

                  </div>

                ))

              }

            </div>

          )

        }

      </div>

    </section>

  );

}