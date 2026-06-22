"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  UserCircle2,
  Trash2,
  Eye,
  X,
  CheckCircle,
} from "lucide-react";
import { toast } from "react-toastify";

export default function ForumManage() {

  const [forums, setForums] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {

    fetch("http://localhost:5000/forums/all")

      .then((res) => res.json())

      .then((data) => {

        setForums(data);

        setLoading(false);

      })

      .catch(() => {

        toast.error("Failed to load forums");

        setLoading(false);

      });

  }, []);

  const handleApprove = async (id) => {

    const res = await fetch(

      `http://localhost:5000/forums/approve/${id}`,

      {

        method: "PATCH",

      }

    );

    const data = await res.json();

    if (data.modifiedCount > 0) {

      toast.success("Forum Approved");

      setForums(

        forums.map((item) =>

          item._id === id

            ? {

                ...item,

                status: "approved",

              }

            : item

        )

      );

    }

  };

  const handleReject = async (id) => {

    const res = await fetch(

      `http://localhost:5000/forums/reject/${id}`,

      {

        method: "PATCH",

      }

    );

    const data = await res.json();

    if (data.modifiedCount > 0) {

      toast.success("Forum Rejected");

      setForums(

        forums.map((item) =>

          item._id === id

            ? {

                ...item,

                status: "rejected",

              }

            : item

        )

      );

    }

  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(

      "Delete this forum permanently?"

    );

    if (!confirmDelete) return;

    const res = await fetch(

      `http://localhost:5000/forums/${id}`,

      {

        method: "DELETE",

      }

    );

    const data = await res.json();

    if (data.deletedCount > 0) {

      toast.success("Forum Deleted");

      setForums(

        forums.filter(

          (item) => item._id !== id

        )

      );

      setSelectedPost(null);

    }

  };

  if (loading) {

    return (

      <div className="text-white text-xl">

        Loading...

      </div>

    );

  }

  return (

    <div className="w-full">

      <h1 className="text-3xl font-bold text-white mb-8">

        Forum Management

      </h1>

      <div className="overflow-x-auto rounded-[28px] border border-white/10 bg-[#0A0A18]">

        <table className="w-full">

          <thead className="border-b border-white/10">

            <tr className="text-left text-gray-400">

              <th className="px-6 py-5">

                Post

              </th>

              <th>

                Author

              </th>

              <th>

                Role

              </th>

              <th>

                Status

              </th>

              <th className="text-center">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {forums.map((item) => (

              <tr

                key={item._id}

                className="border-b border-white/5"

              >

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden">

                      <Image

                        src={item.image}

                        alt={item.title}

                        fill

                        className="object-cover"

                      />

                    </div>

                    <div>

                      <h3 className="text-white font-semibold">

                        {item.title}

                      </h3>

                      <p className="text-gray-400 text-sm">

                        {item.description?.slice(

                          0,

                          55

                        )}...

                      </p>

                    </div>

                  </div>

                </td>

                <td>

                  <div className="flex items-center gap-3">

                    {item.authorImage ? (

                      <Image

                        src={item.authorImage}

                        alt={item.author}

                        width={40}

                        height={40}

                        className="rounded-full border-2 border-[#D9FF3F]"

                      />

                    ) : (

                      <div className="w-10 h-10 rounded-full border-2 border-[#D9FF3F] flex items-center justify-center">

                        <UserCircle2

                          size={22}

                          className="text-[#D9FF3F]"

                        />

                      </div>

                    )}

                    <div>

                      <p className="text-white">

                        {item.author}

                      </p>

                      <p className="text-gray-400 text-sm">

                        {item.authorEmail}

                      </p>

                    </div>

                  </div>

                </td>

                <td className="capitalize text-white">

                  {item.role}

                </td>

                <td>

                  <span

                    className={`font-semibold capitalize ${
                      item.status === "approved"

                        ? "text-green-400"

                        : item.status === "rejected"

                        ? "text-red-400"

                        : "text-yellow-400"
                    }`}
                  >

                    {item.status}

                  </span>

                </td>

                <td>

                  <div className="flex justify-center gap-2">

                    <button

                      onClick={() =>
                        setSelectedPost(item)
                      }

                      className="w-10 h-10 rounded-xl bg-[#D9FF3F]/15 text-[#D9FF3F] flex items-center justify-center cursor-pointer"

                    >

                      <Eye size={18} />

                    </button>

                    {item.status === "pending" && (

                      <>

                        <button

                          onClick={() =>
                            handleApprove(item._id)
                          }

                          className="w-10 h-10 rounded-xl bg-green-500/15 text-green-400 flex items-center justify-center cursor-pointer"

                        >

                          <CheckCircle size={18} />

                        </button>

                        <button

                          onClick={() =>
                            handleReject(item._id)
                          }

                          className="px-3 rounded-xl bg-red-500/15 text-red-400 text-sm cursor-pointer"

                        >

                          Reject

                        </button>

                      </>

                    )}

                    <button

                      onClick={() =>
                        handleDelete(item._id)
                      }

                      className="w-10 h-10 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center cursor-pointer"

                    >

                      <Trash2 size={18} />

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {selectedPost && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="w-[700px] bg-[#0A0A18] border border-white/10 rounded-[35px] p-8 relative">

            <button

              onClick={() =>
                setSelectedPost(null)
              }

              className="top-6 right-6 text-gray-400 cursor-pointer"

            >

              <X size={26} />

            </button>

            <div className="relative h-[280px] rounded-3xl overflow-hidden">

              <Image

                src={selectedPost.image}

                alt={selectedPost.title}

                fill

                className="object-cover"

              />

            </div>

            <h1 className="text-4xl font-bold text-white mt-8">

              {selectedPost.title}

            </h1>

            <p className="text-gray-400 mt-6 leading-9">

              {selectedPost.description}

            </p>

          </div>

        </div>

      )}

    </div>

  );

}