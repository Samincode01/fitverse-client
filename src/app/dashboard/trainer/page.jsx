"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  Dumbbell,
  Users,
  ShieldCheck,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function TrainerDashboard() {

  const router = useRouter();

  const shownToast = useRef(false);

  const { data: session, isPending } =
    authClient.useSession();

  const user = session?.user || session?.data?.user;

  const [stats, setStats] = useState({

    totalClasses: 0,

    totalStudents: 0,

  });

  const [loading, setLoading] = useState(true);

  // Route Protection

  useEffect(() => {

    if (

      !isPending &&

      user &&

      user.role !== "trainer" &&

      !shownToast.current

    ) {

      shownToast.current = true;

      toast.error("Restricted Page");

      router.push("/");

    }

  }, [user, isPending, router]);

  // Load Stats

  useEffect(() => {

    const loadStats = async () => {

      try {

        if (!user?.email) return;

        const res = await fetch(

          `http://localhost:5000/trainer-stats/${user.email}`

        );

        const data = await res.json();

        setStats({

          totalClasses: data.totalClasses || 0,

          totalStudents: data.totalStudents || 0,

        });

      }

      catch (error) {

        console.log(error);

        toast.error("Failed to load dashboard");

      }

      finally {

        setLoading(false);

      }

    };

    loadStats();

  }, [user]);

  if (isPending || loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#030312]">

        <h1 className="text-white text-3xl font-bold">

          Loading...

        </h1>

      </div>

    );

  }

  if (user?.role !== "trainer") {

    return null;

  }

  return (

    <section className="min-h-screen bg-[#030312] pt-28 px-6 pb-20">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="mb-12">

          <h1 className="text-5xl font-bold text-white">

            Trainer Dashboard

          </h1>

          <p className="text-gray-400 mt-4">

            Manage your classes and students.

          </p>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-2 gap-8">

          <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8">

            <div className="w-16 h-16 rounded-full bg-[#D9FF3F]/10 flex items-center justify-center">

              <Dumbbell

                className="text-[#D9FF3F]"

                size={30}

              />

            </div>

            <h3 className="text-gray-400 mt-8">

              Total Classes Created

            </h3>

            <h1 className="text-white text-5xl font-bold mt-3">

              {stats.totalClasses}

            </h1>

          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-8">

            <div className="w-16 h-16 rounded-full bg-[#D9FF3F]/10 flex items-center justify-center">

              <Users

                className="text-[#D9FF3F]"

                size={30}

              />

            </div>

            <h3 className="text-gray-400 mt-8">

              Total Students Enrolled

            </h3>

            <h1 className="text-white text-5xl font-bold mt-3">

              {stats.totalStudents}

            </h1>

          </div>

        </div>

        {/* Profile */}

        <div className="mt-16 rounded-[35px] border border-white/10 bg-white/[0.03] p-10">

          <div className="flex flex-col md:flex-row items-center gap-8">

            {

              user?.image ? (

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

                    size={55}

                    className="text-[#D9FF3F]"

                  />

                </div>

              )

            }

            <div>

              <h1 className="text-white text-4xl font-bold">

                {user?.name}

              </h1>

              <p className="text-gray-400 text-lg mt-3">

                {user?.email}

              </p>

              <div className="mt-6">

                <span className="px-6 py-3 rounded-full bg-[#D9FF3F] text-black font-bold">

                  Trainer

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}