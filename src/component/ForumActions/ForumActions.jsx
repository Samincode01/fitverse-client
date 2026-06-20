"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
} from "lucide-react";
import { toast } from "react-toastify";

export default function ForumActions({
  forumId,
  initialLikes = 0,
  initialDislikes = 0,
  initialComments = [],
}) {

  const { data: session } = authClient.useSession();

  const user = session?.user || session?.data?.user;

  const [likes, setLikes] = useState(initialLikes);

  const [dislikes, setDislikes] = useState(initialDislikes);

  const handleLike = async () => {

    if (!user?.email) {

      toast.error("Please login first");

      return;

    }

    const res = await fetch(

      `http://localhost:5000/forums/like/${forumId}`,

      {

        method: "PATCH",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          email: user.email,

        }),

      }

    );

    const data = await res.json();

    if (data.liked) {

      setLikes(prev => prev + 1);

    }

    else {

      setLikes(prev => prev - 1);

    }

  };

  const handleDislike = async () => {

    if (!user?.email) {

      toast.error("Please login first");

      return;

    }

    const res = await fetch(

      `http://localhost:5000/forums/dislike/${forumId}`,

      {

        method: "PATCH",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          email: user.email,

        }),

      }

    );

    const data = await res.json();

    if (data.disliked) {

      setDislikes(prev => prev + 1);

    }

    else {

      setDislikes(prev => prev - 1);

    }

  };

  return (

    <div className="flex gap-5 mt-14">

      <button

        onClick={handleLike}

        className="px-7 py-4 rounded-2xl border border-white/10 text-white flex items-center gap-3"

      >

        <ThumbsUp className="text-[#D9FF3F]" />

        {likes}

      </button>

      <button

        onClick={handleDislike}

        className="px-7 py-4 rounded-2xl border border-white/10 text-white flex items-center gap-3"

      >

        <ThumbsDown className="text-red-400" />

        {dislikes}

      </button>

      <div className="px-7 py-4 rounded-2xl border border-white/10 text-white flex items-center gap-3">

        <MessageCircle className="text-blue-400" />

        {initialComments.length}

      </div>

    </div>

  );

}