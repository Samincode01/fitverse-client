"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import {
  BookOpen,
  Heart,
  UserCircle2,
  BadgeCheck,
} from "lucide-react";

export default function UserDashboard() {

  const { data: session } = authClient.useSession();

  const user = session?.user || session?.data?.user;

  const [application, setApplication] = useState(null);

  const [favourites, setFavourites] = useState(0);

  useEffect(() => {

    if (!user?.email) return;

    fetch(`http://localhost:5000/trainer-applications/${user.email}`)
      .then(res => res.json())
      .then(data => {

        if (data) {

          setApplication(data);

        }

      });

    fetch(`http://localhost:5000/favourites/${user.id}`)
      .then(res => res.json())
      .then(data => {

        setFavourites(data.length);

      });

  }, [user]);

  return (

    <div className="space-y-8">

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-[#0A0A18] border border-white/10 rounded-3xl p-7">

          <div className="flex items-center gap-5">

            <div className="w-14 h-14 rounded-2xl bg-[#D9FF3F]/10 flex items-center justify-center">

              <BookOpen
                size={28}
                className="text-[#D9FF3F]"
              />

            </div>

            <div>

              <p className="text-gray-400 text-sm">

                Total Booked Classes

              </p>

              <h2 className="text-4xl font-bold text-white">

                0

              </h2>

            </div>

          </div>

        </div>

        <div className="bg-[#0A0A18] border border-white/10 rounded-3xl p-7">

          <div className="flex items-center gap-5">

            <div className="w-14 h-14 rounded-2xl bg-[#D9FF3F]/10 flex items-center justify-center">

              <Heart
                size={28}
                className="text-[#D9FF3F]"
              />

            </div>

            <div>

              <p className="text-gray-400 text-sm">

                Total Favorites

              </p>

              <h2 className="text-4xl font-bold text-white">

                {favourites}

              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* Profile */}

      <div className="bg-[#0A0A18] border border-white/10 rounded-3xl p-8">

        <h2 className="text-3xl font-bold text-white mb-8">

          Profile Details

        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

          {user?.image ? (

            <Image
              src={user.image}
              alt={user.name}
              width={90}
              height={90}
              priority
              className="rounded-full border-4 border-[#D9FF3F] object-cover"
            />

          ) : (

            <div className="w-[90px] h-[90px] rounded-full border-4 border-[#D9FF3F] bg-[#D9FF3F]/10 flex items-center justify-center">

              <UserCircle2
                size={55}
                className="text-[#D9FF3F]"
              />

            </div>

          )}

          <div className="space-y-4">

            <div>

              <p className="text-sm text-gray-400">

                Name

              </p>

              <h3 className="text-2xl font-bold text-white">

                {user?.name}

              </h3>

            </div>

            <div>

              <p className="text-sm text-gray-400">

                Email

              </p>

              <p className="text-white">

                {user?.email}

              </p>

            </div>

            <span className="inline-flex px-4 py-1.5 rounded-full bg-[#D9FF3F] text-black text-sm font-semibold">

              User

            </span>

          </div>

        </div>

      </div>

      {/* Trainer Application */}

      <div className="bg-[#0A0A18] border border-white/10 rounded-3xl p-8">

        <h2 className="text-3xl font-bold text-white mb-6">

          Trainer Application

        </h2>

        {!application ? (

          <p className="text-gray-400">

            You haven't applied as a trainer yet.

          </p>

        ) : (

          <>

            <div className="flex items-center gap-3">

              <BadgeCheck
                size={24}
                className={
                  application.status === "approved"
                    ? "text-green-400"
                    : application.status === "rejected"
                    ? "text-red-400"
                    : "text-yellow-400"
                }
              />

              <h3
                className={`text-xl font-bold capitalize ${
                  application.status === "approved"
                    ? "text-green-400"
                    : application.status === "rejected"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >

                {application.status}

              </h3>

            </div>

            {application.status === "rejected" &&
              application.feedback && (

                <div className="mt-5 p-5 rounded-2xl bg-red-500/10 border border-red-500/20">

                  <p className="text-red-300 font-semibold mb-2">

                    Admin Feedback

                  </p>

                  <p className="text-gray-300">

                    {application.feedback}

                  </p>

                </div>

            )}

          </>

        )}

      </div>

    </div>

  );

}