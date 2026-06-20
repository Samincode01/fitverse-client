"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { UserCircle2 } from "lucide-react";
import { toast } from "react-toastify";

export default function AppliedTrainers() {

  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedId, setSelectedId] = useState(null);

  const [feedback, setFeedback] = useState("");

  useEffect(() => {

    fetch("http://localhost:5000/trainer-applications")
      .then((res) => res.json())
      .then((data) => {

        setApplications(data);

        setLoading(false);

      })
      .catch(() => {

        toast.error("Failed to load");

        setLoading(false);

      });

  }, []);

  const handleApprove = async (id) => {

    const res = await fetch(

      `http://localhost:5000/trainer-applications/approve/${id}`,

      {

        method: "PATCH",

      }

    );

    const data = await res.json();

    if (data.modifiedCount > 0) {

      toast.success("Trainer Approved");

      setApplications(

        applications.map((item) =>

          item._id === id

            ? {

                ...item,

                status: "approved",

                feedback: "",

              }

            : item

        )

      );

    }

  };

  const handleReject = async () => {

    if (!feedback.trim()) {

      toast.error("Please write feedback");

      return;

    }

    const res = await fetch(

      `http://localhost:5000/trainer-applications/reject/${selectedId}`,

      {

        method: "PATCH",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          feedback,

        }),

      }

    );

    const data = await res.json();

    if (data.modifiedCount > 0) {

      toast.success("Application Rejected");

      setApplications(

        applications.map((item) =>

          item._id === selectedId

            ? {

                ...item,

                status: "rejected",

                feedback,

              }

            : item

        )

      );

      setSelectedId(null);

      setFeedback("");

    }

  };

  if (loading) {

    return (

      <div className="text-white">

        Loading...

      </div>

    );

  }

  return (

    <div className="w-full mt-9">

      <h1 className="text-3xl font-bold text-white mb-8">

        Applied Trainers

      </h1>

      <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#0A0A18]">

        <table className="w-full">

          <thead className="border-b border-white/10">

            <tr className="text-left text-gray-400">

              <th className="px-8 py-5">

                Trainer

              </th>

              <th>

                Experience

              </th>

              <th>

                Specialty

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

            {applications.map((app) => (

              <tr

                key={app._id}

                className="border-b border-white/5"

              >

                <td className="px-8 py-6">

                  <div className="flex items-center gap-4">

                    {app.image ? (

                      <Image

                        src={app.image}

                        alt={app.name}

                        width={55}

                        height={55}

                        className="rounded-full border-2 border-[#D9FF3F]"

                      />

                    ) : (

                      <div className="w-[55px] h-[55px] rounded-full border-2 border-[#D9FF3F] bg-[#D9FF3F]/10 flex items-center justify-center">

                        <UserCircle2

                          size={32}

                          className="text-[#D9FF3F]"

                        />

                      </div>

                    )}

                    <div>

                      <h3 className="text-white font-semibold">

                        {app.name}

                      </h3>

                      <p className="text-gray-400 text-sm">

                        {app.email}

                      </p>

                    </div>

                  </div>

                </td>

                <td className="text-white">

                  {app.experience} Years

                </td>

                <td className="text-white">

                  {app.specialty}

                </td>

                <td>

                  <span

                    className={`font-semibold capitalize ${
                      app.status === "approved"
                        ? "text-green-400"
                        : app.status === "rejected"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >

                    {app.status}

                  </span>

                </td>

                <td className="text-center">

                  {app.status === "unapproved" ? (

                    <div className="flex justify-center gap-3">

                      <button

                        onClick={() =>
                          handleApprove(app._id)
                        }

                        className="px-5 py-2 rounded-xl bg-green-500/15 text-green-400 font-semibold cursor-pointer"

                      >

                        Approve

                      </button>

                      <button

                        onClick={() =>
                          setSelectedId(app._id)
                        }

                        className="px-5 py-2 rounded-xl bg-red-500/15 text-red-400 font-semibold cursor-pointer"

                      >

                        Reject

                      </button>

                    </div>

                  ) : (

                    <span className="text-gray-500">

                      Completed

                    </span>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {selectedId && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="w-[500px] rounded-3xl bg-[#0A0A18] border border-white/10 p-8">

            <h2 className="text-2xl font-bold text-white mb-5">

              Reject Application

            </h2>

            <textarea

              value={feedback}

              onChange={(e) =>
                setFeedback(e.target.value)
              }

              placeholder="Write rejection feedback..."

              className="w-full h-32 rounded-2xl bg-[#111122] border border-white/10 p-4 text-white outline-none"

            />

            <div className="flex gap-4 mt-6">

              <button

                onClick={handleReject}

                className="flex-1 h-12 rounded-2xl bg-red-500 text-white font-semibold"

              >

                Confirm Reject

              </button>

              <button

                onClick={() => {

                  setSelectedId(null);

                  setFeedback("");

                }}

                className="flex-1 h-12 rounded-2xl bg-gray-700 text-white"

              >

                Cancel

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}