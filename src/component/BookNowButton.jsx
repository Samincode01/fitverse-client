"use client";

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function BookNowButton({

  classId,

  title,

  price,

}) {

  const { data: session } = authClient.useSession();

  const user = session?.user || session?.data?.user;

  const [alreadyBooked, setAlreadyBooked] = useState(false);

  const [checking, setChecking] = useState(true);

  useEffect(() => {

    const checkBooking = async () => {

      if (!user?.email) {

        setChecking(false);

        return;

      }

      try {

        const res = await fetch(

          `http://localhost:5000/bookings/check?email=${user.email}&classId=${classId}`

        );

        const data = await res.json();

        setAlreadyBooked(data.booked);

      }

      catch (error) {

        console.log(error);

      }

      finally {

        setChecking(false);

      }

    };

    checkBooking();

  }, [user, classId]);



  const handleBooking = async () => {

    try {

      // blocked check

      const userRes = await fetch(

        `http://localhost:5000/users/${user.email}`

      );

      const userData = await userRes.json();

      if (userData?.status === "blocked") {

        toast.error("Action restricted by Admin");

        return;

      }

      const res = await fetch(

        "/api/checkout-session",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            classId,

            title,

            price,

          }),

        }

      );

      const data = await res.json();

      if (data.url) {

        window.location.href = data.url;

      }

    }

    catch {

      toast.error("Failed to start payment");

    }

  };



  return (

    <button

      disabled={
  alreadyBooked ||
  checking ||
  user?.role !== "user"
}

      onClick={handleBooking}

      className={`

        w-full mt-10 py-5 rounded-full

        font-bold text-lg transition-all

        ${alreadyBooked

          ? "bg-gray-700 text-gray-400 cursor-not-allowed"

          : "bg-[#D9FF3F] text-black hover:scale-105 cursor-pointer"}

      `}

    >

      <Calendar className="inline mr-3" />

      {
  checking
    ? "Checking..."
    : alreadyBooked
    ? "Already Booked"
    : user?.role !== "user"
    ? "Members Only"
    : "Book Now"
}

    </button>

  );

}