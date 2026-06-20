import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

import ForumActions from "@/component/ForumActions/ForumActions";
import CommentSection from "@/component/CommentSection/CommentSection";

async function getForum(id) {

  try {

    const res = await fetch(

      `http://localhost:5000/forums/${id}`,

      {

        cache: "no-store",

      }

    );

    if (!res.ok) {

      return null;

    }

    return await res.json();

  } catch {

    return null;

  }

}

export default async function ForumDetails({

  params,

}) {

  // Get logged in user

  const session = await auth.api.getSession({

    headers: await headers(),

  });

  if (!session) {

    redirect("/login");

  }

  const user = session.user || session.data?.user;

  const { id } = await params;

  const forum = await getForum(id);

  if (!forum) {

    return (

      <div className="min-h-screen bg-[#030312] flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-white text-5xl font-bold">

            Post Not Found

          </h1>

          <p className="text-gray-400 mt-4">

            This forum post does not exist.

          </p>

        </div>

      </div>

    );

  }

  return (

    <section className="min-h-screen bg-[#030312] pt-32 pb-24 px-6">

      <div className="max-w-5xl mx-auto">

        {/* Cover */}

        <div className="overflow-hidden rounded-[35px] border border-white/10">

          <img

            src={forum.image}

            alt={forum.title}

            className="w-full h-[500px] object-cover"

          />

        </div>

        {/* Author */}

        <div className="mt-10 flex items-center gap-5">

          {forum.authorImage && (

            <img

              src={forum.authorImage}

              alt={forum.author}

              className="w-16 h-16 rounded-full border-2 border-[#D9FF3F]"

            />

          )}

          <div>

            <p className="text-[#D9FF3F] font-semibold text-lg">

              {forum.author}

            </p>

            <p className="text-gray-400 capitalize">

              {forum.role}

            </p>

          </div>

        </div>

        {/* Title */}

        <h1 className="text-5xl md:text-6xl font-bold text-white mt-8 leading-tight">

          {forum.title}

        </h1>

        {/* Description */}

        <p className="text-gray-300 text-lg leading-10 mt-10">

          {forum.description}

        </p>

        {/* Like / Dislike */}

        <ForumActions

          forumId={forum._id}

          initialLikes={forum.likes}

          initialDislikes={forum.dislikes}

          initialComments={forum.comments || []}

        />

        {/* Comments */}

        <div className="mt-20">

          <h2 className="text-4xl font-bold text-white mb-10">

            Comments

          </h2>

          <CommentSection

            forumId={forum._id}

            currentUser={user}

            comments={forum.comments || []}

          />

        </div>

      </div>

    </section>

  );

}