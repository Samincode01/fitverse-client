"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Heart, ThumbsDown, MessageCircle, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function MyForums() {

  const { data: session } = authClient.useSession();

  const user = session?.user || session?.data?.user;

  const [forums, setForums] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!user?.email) return;

    fetch(

      `http://localhost:5000/my-forums/${user.email}`

    )

      .then(res => res.json())

      .then(data => {

        setForums(data);

        setLoading(false);

      });

  }, [user]);

  const handleDelete = async (id) => {

    const result = await Swal.fire({

      title: "Delete Forum?",

      text: "This action cannot be undone.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#ef4444",

      background: "#0A0A18",

      color: "#fff",

    });

    if (!result.isConfirmed) return;

    const res = await fetch(

      `http://localhost:5000/forums/${id}`,

      {

        method: "DELETE",

      }

    );

    const data = await res.json();

    if (data.deletedCount > 0) {

      setForums(

        forums.filter(

          item => item._id !== id

        )

      );

      toast.success("Forum Deleted");

    }

  };

  if (loading) {

    return (

      <div className="min-h-screen bg-[#030312] flex items-center justify-center">

        <h1 className="text-white text-3xl">

          Loading...

        </h1>

      </div>

    );

  }

  return (

    <section className="min-h-screen bg-[#030312] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-white mb-12">

          My Forum Posts

        </h1>

        {

          forums.length === 0 ? (

            <div className="text-center py-24 text-white">

              No Forum Posts Yet

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {

                forums.map((forum) => (

                  <div

                    key={forum._id}

                    className="rounded-[30px] overflow-hidden border border-white/10 bg-[#0A0A18]"

                  >

                    <img

                      src={forum.image}

                      alt={forum.title}

                      className="w-full h-[250px] object-cover"

                    />

                    <div className="p-7">

                      <div className="flex justify-between">

                        <span

                          className={`

                          px-4 py-2 rounded-full text-sm font-semibold

                          ${

                            forum.status === "approved"

                            ? "bg-green-500/20 text-green-400"

                            : forum.status === "pending"

                            ? "bg-yellow-500/20 text-yellow-400"

                            : "bg-red-500/20 text-red-400"

                          }

                          `}

                        >

                          {forum.status}

                        </span>

                      </div>

                      <h2 className="text-3xl font-bold text-white mt-6">

                        {forum.title}

                      </h2>

                      <p className="text-gray-400 mt-4 leading-8">

                        {

                          forum.description.length > 100

                          ?

                          forum.description.slice(0,100)+"..."

                          :

                          forum.description

                        }

                      </p>

                      <div className="flex gap-6 mt-8 text-white">

                        <div className="flex items-center gap-2">

                          <Heart

                            size={18}

                            className="text-[#D9FF3F]"

                          />

                          {forum.likes}

                        </div>

                        <div className="flex items-center gap-2">

                          <ThumbsDown

                            size={18}

                            className="text-red-400"

                          />

                          {forum.dislikes}

                        </div>

                        <div className="flex items-center gap-2">

                          <MessageCircle

                            size={18}

                            className="text-sky-400"

                          />

                          {forum.comments?.length}

                        </div>

                      </div>

                      <button

                        onClick={() =>

                          handleDelete(forum._id)

                        }

                        className="w-full mt-8 py-4 rounded-2xl bg-red-500 text-white font-semibold hover:opacity-90 transition"

                      >

                        <div className="flex items-center justify-center gap-3">

                          <Trash2 size={18} />

                          Delete Forum

                        </div>

                      </button>

                    </div>

                  </div>

                ))

              }

            </div>

          )

        }

      </div>

    </section>

  );

}