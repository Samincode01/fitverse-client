"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, UserCircle2 } from "lucide-react";
import { toast } from "react-toastify";

export default function ManageClasses() {

  const [classes, setClasses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {

    fetch("http://localhost:5000/classes/all")

      .then((res) => res.json())

      .then((data) => {

        setClasses(data);

        setLoading(false);

      })

      .catch(() => {

        toast.error("Failed to load classes");

        setLoading(false);

      });

  }, []);

  const handleApprove = async (id) => {

    await fetch(

      `http://localhost:5000/classes/approve/${id}`,

      {

        method: "PATCH",

      }

    );

    setClasses((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              status: "approved",
            }
          : item
      )
    );

    setSelectedClass(null);

  };

  const handleReject = async (id) => {

    await fetch(

      `http://localhost:5000/classes/reject/${id}`,

      {

        method: "PATCH",

      }

    );

    setClasses((prev) =>
      prev.filter((item) => item._id !== id)
    );

    setSelectedClass(null);

  };

  const handleDelete = async (id) => {

    const confirmDelete = confirm(

      "Are you sure you want to delete this class?"

    );

    if (!confirmDelete) return;

    await fetch(

      `http://localhost:5000/classes/${id}`,

      {

        method: "DELETE",

      }

    );

    setClasses((prev) =>
      prev.filter((item) => item._id !== id)
    );

    toast.success("Class Deleted");

  };

  if (loading) {

    return (

      <div className="text-white text-2xl">

        Loading...

      </div>

    );

  }

  return (

    <div className="w-full mt-8">

      <h1 className="text-4xl font-bold text-white mb-8">

        Manage Classes

      </h1>

      <div className="overflow-x-auto rounded-[30px] border border-white/10 bg-[#0A0A18]">

        <table className="w-full">

          <thead className="border-b border-white/10">

            <tr className="text-left text-gray-400">

              <th className="px-8 py-5">

                Class

              </th>

              <th>

                Trainer

              </th>

              <th>

                Category

              </th>

              <th>

                Price

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

            {classes.map((item) => (

              <tr

                key={item._id}

                className="border-b border-white/5"

              >

                <td className="px-8 py-6">

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

                        {item.level}

                      </p>

                    </div>

                  </div>

                </td>

                <td>

                  <div className="flex items-center gap-3">

                    {item.trainerImage ? (

                      <Image

                        src={item.trainerImage}

                        alt={item.trainerName}

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

                        {item.trainerName}

                      </p>

                      <p className="text-gray-400 text-sm">

                        {item.trainerEmail}

                      </p>

                    </div>

                  </div>

                </td>

                <td className="text-white">

                  {item.category}

                </td>

                <td className="text-[#D9FF3F] font-bold">

                  ${item.price}

                </td>

                <td>

                  <span
                    className={`font-semibold capitalize ${
                      item.status === "approved"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >

                    {item.status}

                  </span>

                </td>

                <td>

                  <div className="flex justify-center gap-3">

                    <button

                      onClick={() =>
                        setSelectedClass(item)
                      }

                      className="px-4 py-2 rounded-xl bg-[#D9FF3F]/15 text-[#D9FF3F] cursor-pointer"

                    >

                      View

                    </button>

                    <button

                      onClick={() =>
                        handleDelete(item._id)
                      }

                      className="px-4 py-2 rounded-xl bg-red-500/15 text-red-400 cursor-pointer"

                    >

                      Delete

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {selectedClass && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="w-[650px] bg-[#0A0A18] rounded-[35px] border border-white/10 p-8">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold text-white">

                Class Details

              </h2>

              <button

                onClick={() =>
                  setSelectedClass(null)
                }

                className="text-gray-400 hover:text-white"

              >

                <X size={28} />

              </button>

            </div>

            <div className="relative h-[250px] rounded-3xl overflow-hidden">

              <Image

                src={selectedClass.image}

                alt={selectedClass.title}

                fill

                className="object-cover"

              />

            </div>

            <div className="mt-8 space-y-5">

              <h1 className="text-4xl font-bold text-white">

                {selectedClass.title}

              </h1>

              <p className="text-gray-400">

                {selectedClass.description}

              </p>

              <div className="grid grid-cols-2 gap-5">

                <div className="bg-[#111122] p-5 rounded-2xl">

                  <p className="text-gray-400">

                    Category

                  </p>

                  <h3 className="text-white">

                    {selectedClass.category}

                  </h3>

                </div>

                <div className="bg-[#111122] p-5 rounded-2xl">

                  <p className="text-gray-400">

                    Difficulty

                  </p>

                  <h3 className="text-white">

                    {selectedClass.level}

                  </h3>

                </div>

                <div className="bg-[#111122] p-5 rounded-2xl">

                  <p className="text-gray-400">

                    Duration

                  </p>

                  <h3 className="text-white">

                    {selectedClass.duration}

                  </h3>

                </div>

                <div className="bg-[#111122] p-5 rounded-2xl">

                  <p className="text-gray-400">

                    Schedule

                  </p>

                  <h3 className="text-white">

                    {selectedClass.schedule}

                  </h3>

                </div>

              </div>

              {selectedClass.status === "pending" && (

                <div className="flex gap-5 mt-8">

                  <button

                    onClick={() =>
                      handleApprove(
                        selectedClass._id
                      )
                    }

                    className="flex-1 py-4 rounded-2xl bg-green-500 text-white font-bold cursor-pointer"

                  >

                    Approve

                  </button>

                  <button

                    onClick={() =>
                      handleReject(
                        selectedClass._id
                      )
                    }

                    className="flex-1 py-4 rounded-2xl bg-red-500 text-white font-bold cursor-pointer"

                  >

                    Reject

                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      )}

    </div>

  );

}