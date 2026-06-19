"use client";

import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function AddToFavouriteButton({ classId }) {

  const handleFavourite = async () => {

    try {

      const session = await authClient.getSession();

      const user = session?.data?.user;

      if (!user) {

        toast.error("Please login first");

        return;

      }

      const response = await fetch("http://localhost:5000/favourites", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          userId: user.id,

          classId: classId,

        }),

      });

      const data = await response.json();

      if (data.insertedId) {

        toast.success("Added to favourites");

      } else {

        toast.info(data.message || "Already added");

      }

    } catch (error) {

      console.log(error);

      toast.error("Failed to add favourite");

    }

  };

  return (

    <button
      onClick={handleFavourite}
      className="px-10 py-5 rounded-full border border-[#D9FF3F]/30 text-[#D9FF3F] flex items-center gap-3 hover:bg-[#D9FF3F] hover:text-black transition-all duration-300 cursor-pointer"
    >

      <Heart size={22} />

      Add To Favourite

    </button>

  );
}