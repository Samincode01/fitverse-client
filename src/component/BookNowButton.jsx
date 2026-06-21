"use client";

import { Calendar } from "lucide-react";
import { toast } from "react-toastify";

export default function BookNowButton({

  classId,

  title,

  price,

}) {

  const handleBooking = async () => {

    try {

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

      onClick={handleBooking}

      className="w-full mt-10 py-5 rounded-full bg-[#D9FF3F] text-black font-bold text-lg hover:scale-105 transition-all cursor-pointer"

    >

      <Calendar className="inline mr-3" />

      Book Now

    </button>

  );

}