"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function AddToFavouriteButton({ classId }) {

  const [isFavourite, setIsFavourite] = useState(false);
const { data: session } = authClient.useSession();

const user = session?.user || session?.data?.user;
  useEffect(() => {

    const checkFavourite = async () => {

      const session = await authClient.getSession();

      const user = session?.data?.user;

      if (!user) return;

      const res = await fetch(

        `${process.env.NEXT_PUBLIC_API_URL}/favourites/${user.id}`

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

        `${process.env.NEXT_PUBLIC_API_URL}/favourites`,

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

  disabled={isFavourite || user?.role !== "user"}

  className={`

    px-10 py-5 rounded-full flex items-center gap-3

    transition-all duration-300

    ${

      isFavourite

        ? "bg-[#D9FF3F] text-black cursor-not-allowed"

        : user?.role !== "user"

        ? "border border-[#D9FF3F]/30 text-[#D9FF3F] opacity-50 cursor-not-allowed"

        : "border border-[#D9FF3F]/30 text-[#D9FF3F] hover:bg-[#D9FF3F] hover:text-black cursor-pointer"

    }

  `}

>

  <Heart

    size={22}

    fill={isFavourite ? "currentColor" : "none"}

  />

  {

    isFavourite

      ? "Added To Favourites"

      : user?.role !== "user"

      ? "Members Only"

      : "Add To Favourite"

  }

</button>

  );

}