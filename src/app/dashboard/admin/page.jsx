"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  Users,
  Dumbbell,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function AdminDashboard() {

  const router = useRouter();

  const hasShownToast = useRef(false);

  const [stats, setStats] = useState({
    users: 0,
    classes: 0,
    bookings: 0,
  });

  const [loadingStats, setLoadingStats] = useState(true);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user || session?.data?.user;

  // Protect Route

  useEffect(() => {

    if (
      !isPending &&
      user &&
      user.role !== "admin" &&
      !hasShownToast.current
    ) {

      hasShownToast.current = true;

      toast.error("Restricted Page", {
        toastId: "restricted-page",
      });

      router.push("/");

    }

  }, [user, isPending, router]);

  // Load Statistics

useEffect(() => {

  const fetchStats = async () => {

    try {

  const [

  usersRes,

  classesRes,

  bookingsRes,

] = await Promise.all([

  fetch("http://localhost:5000/users"),

  fetch("http://localhost:5000/classes"),

  fetch("http://localhost:5000/bookings-count"),

]);

      const users = await usersRes.json();

const bookingData = await bookingsRes.json();

      const classData = await classesRes.json();

      setStats({

  users: users.length,

  classes: classData.total,

  bookings: bookingData.total,

});

    } catch (error) {

      console.log(error);

      toast.error("Failed to load statistics");

    } finally {

      setLoadingStats(false);

    }

  };

  fetchStats();

}, []);

  if (isPending || loadingStats) {

    return (

      <section className="min-h-screen bg-[#030312] flex items-center justify-center">

        <h1 className="text-white text-3xl font-bold">

          Loading...

        </h1>

      </section>

    );

  }

  if (user?.role !== "admin") {

    return null;

  }

  return (

    <section className="min-h-screen bg-[#030312] pt-28 px-6 pb-20">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="mb-12">

          <h1 className="text-5xl font-bold text-white">

            Admin Dashboard

          </h1>

          <p className="text-gray-400 mt-4">

            Manage users, classes and platform activities.

          </p>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Total Users */}

          <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8">

            <div className="w-16 h-16 rounded-full bg-[#D9FF3F]/10 flex items-center justify-center">

              <Users className="text-[#D9FF3F]" size={30} />

            </div>

            <h3 className="text-gray-400 mt-8">

              Total Users

            </h3>

            <h1 className="text-white text-5xl font-bold mt-3">

              {stats.users}

            </h1>

          </div>

          {/* Total Classes */}

          <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8">

            <div className="w-16 h-16 rounded-full bg-[#D9FF3F]/10 flex items-center justify-center">

              <Dumbbell className="text-[#D9FF3F]" size={30} />

            </div>

            <h3 className="text-gray-400 mt-8">

              Total Classes

            </h3>

            <h1 className="text-white text-5xl font-bold mt-3">

              {stats.classes}

            </h1>

          </div>

          {/* Total Booked Classes */}

          <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8">

            <div className="w-16 h-16 rounded-full bg-[#D9FF3F]/10 flex items-center justify-center">

              <CreditCard className="text-[#D9FF3F]" size={30} />

            </div>

            <h3 className="text-gray-400 mt-8">

              Total Booked Classes

            </h3>

            <h1 className="text-white text-5xl font-bold mt-3">

              {stats.bookings}

            </h1>

          </div>

        </div>

        {/* Admin Profile */}

        <div className="mt-16 rounded-[35px] border border-white/10 bg-white/[0.03] p-10">

          <div className="flex flex-col md:flex-row items-center gap-8">

            {user?.image ? (

              <Image
                src={user.image}
                alt={user.name}
                width={120}
                height={120}
                className="w-28 h-28 rounded-full object-cover border-4 border-[#D9FF3F]"
              />

            ) : (

              <div className="w-28 h-28 rounded-full bg-[#D9FF3F]/10 border-4 border-[#D9FF3F] flex items-center justify-center">

                <ShieldCheck
                  className="text-[#D9FF3F]"
                  size={55}
                />

              </div>

            )}

            <div>

              <h1 className="text-white text-4xl font-bold">

                {user?.name}

              </h1>

              <p className="text-gray-400 mt-3 text-lg">

                {user?.email}

              </p>

              <div className="mt-6">

                <span className="px-6 py-3 rounded-full bg-[#D9FF3F] text-black font-bold">

                  Admin

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}