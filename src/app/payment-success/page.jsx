"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function PaymentSuccess() {

  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");

  const classId = searchParams.get("classId");

  const { data: session } = authClient.useSession();

  const user = session?.user || session?.data?.user;

  const [saved, setSaved] = useState(false);

  useEffect(() => {

    const saveBooking = async () => {

      if (!user || !classId || saved) {

        return;

      }

      try {

        const classRes = await fetch(

          `http://localhost:5000/classes/${classId}`

        );

        const classData = await classRes.json();

        const booking = {

          userEmail: user.email,

          userName: user.name,

          userImage: user.image,

          classId: classData._id,

          classTitle: classData.title,

          classCategory: classData.category,

          classImage: classData.image,

          trainerName: classData.trainerName,

          trainerEmail: classData.trainerEmail,

          price: classData.price,

          paymentId: sessionId,

          paymentStatus: "paid",

          createdAt: new Date(),

        };

        const res = await fetch(

          "http://localhost:5000/bookings",

          {

            method: "POST",

            headers: {

              "Content-Type": "application/json",

            },

            body: JSON.stringify(booking),

          }

        );

        const data = await res.json();

        if (res.status === 403) {

          toast.error(data.message);

          return;

        }

        if (data.message === "Already booked") {

          toast.info("Already booked");

        }

        if (data.insertedId) {

          toast.success("Booking Saved");

        }

        setSaved(true);

      }

      catch {

        toast.error("Failed to save booking");

      }

    };

    saveBooking();

  }, [user, classId, sessionId, saved]);

  return (

    <section className="min-h-screen bg-[#030312] flex items-center justify-center px-6">

      <div className="max-w-xl w-full rounded-[35px] bg-white/[0.03] border border-white/10 p-12 text-center">

        <CheckCircle

          size={90}

          className="mx-auto text-[#D9FF3F]"

        />

        <h1 className="text-5xl font-bold text-white mt-8">

          Payment Successful

        </h1>

        <p className="text-gray-400 mt-5">

          Your class booking has been completed successfully.

        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

          <Link

            href="/"

            className="px-8 py-4 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition"

          >

            Go To Home

          </Link>

          <Link

            href="/dashboard/user/booked-classes"

            className="px-8 py-4 rounded-full bg-[#D9FF3F] text-black font-bold hover:scale-105 transition"

          >

            My Booked Classes

          </Link>

        </div>

      </div>

    </section>

  );

}