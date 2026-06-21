"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function AddToFavouriteButton({ classId }) {

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {

    const checkFavourite = async () => {

      const session = await authClient.getSession();

      const user = session?.data?.user;

      if (!user) return;

      const res = await fetch(

        `http://localhost:5000/favourites/${user.id}`

      );

      const data = await res.json();

      const exists = data.some(

        (item) => item.classId === classId

      );

      setIsFavourite(exists);

    };

    checkFavourite();

  }, [classId]);

  const handleFavourite = async () => {

    try {

      const session = await authClient.getSession();

      const user = session?.data?.user;

      if (!user) {

        toast.error("Please login first");

        return;

      }

      if (isFavourite) {

        toast.info("Already added to favourites");

        return;

      }

      const response = await fetch(

        "http://localhost:5000/favourites",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            userId: user.id,

            classId,

          }),

        }

      );

      const data = await response.json();

      if (data.insertedId) {

        setIsFavourite(true);

        toast.success("Added to favourites");

      }

    } catch (error) {

      console.log(error);

      toast.error("Failed to add favourite");

    }

  };

  return (

    <button

      onClick={handleFavourite}

      className={`

      px-10 py-5 rounded-full flex items-center gap-3

      transition-all duration-300 cursor-pointer

      ${

        isFavourite

          ? "bg-[#D9FF3F] text-black"

          : "border border-[#D9FF3F]/30 text-[#D9FF3F] hover:bg-[#D9FF3F] hover:text-black"

      }

      `}

    >

      <Heart size={22} fill={isFavourite ? "currentColor" : "none"} />

      {isFavourite

        ? "Added To Favourites"

        : "Add To Favourite"}

    </button>

  );

}