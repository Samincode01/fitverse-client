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

  const [selectedTrainer, setSelectedTrainer] = useState(null);
  useEffect(() => {

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/trainer-applications`)
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

  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/trainer-applications/approve/${id}`,
    {
      method: "PATCH",
    }
  );

  setApplications((prev) =>
    prev.map((item) =>
      item._id === id
        ? {
            ...item,
            status: "approved",
            feedback: "",
          }
        : item
    )
  );

};
  const handleReject = async () => {

    if (!feedback.trim()) {

      toast.error("Please write feedback");

      return;

    }

    const res = await fetch(

      `${process.env.NEXT_PUBLIC_API_URL}/trainer-applications/reject/${selectedId}`,

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

                      <div className="flex justify-center gap-3">

  <button
    onClick={() => setSelectedTrainer(app)}
    className="px-5 py-2 rounded-xl bg-[#D9FF3F]/15 text-[#D9FF3F] font-semibold cursor-pointer"
  >
    View
  </button>

  <button
    onClick={() => handleApprove(app._id)}
    className="px-5 py-2 rounded-xl bg-green-500/15 text-green-400 font-semibold cursor-pointer"
  >
    Approve
  </button>

  <button
    onClick={() => setSelectedId(app._id)}
    className="px-5 py-2 rounded-xl bg-red-500/15 text-red-400 font-semibold cursor-pointer"
  >
    Reject
  </button>

</div>

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
{selectedTrainer && (

<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

  <div className="w-[550px] bg-[#0A0A18] border border-white/10 rounded-[30px] p-8">

    <div className="flex justify-between items-center mb-8">

      <h2 className="text-3xl font-bold text-white">

        Trainer Details

      </h2>

      <button
        onClick={() => setSelectedTrainer(null)}
        className="text-gray-400 hover:text-white text-2xl cursor-pointer"
      >

        ✕

      </button>

    </div>

    <div className="flex items-center gap-6 mb-8">

      {selectedTrainer.image ? (

        <Image
          src={selectedTrainer.image}
          alt={selectedTrainer.name}
          width={90}
          height={90}
          className="rounded-full border-4 border-[#D9FF3F]"
        />

      ) : (

        <div className="w-[90px] h-[90px] rounded-full border-4 border-[#D9FF3F] bg-[#D9FF3F]/10 flex items-center justify-center">

          <UserCircle2
            size={55}
            className="text-[#D9FF3F]"
          />

        </div>

      )}

      <div>

        <h3 className="text-2xl font-bold text-white">

          {selectedTrainer.name}

        </h3>

        <p className="text-gray-400">

          {selectedTrainer.email}

        </p>

      </div>

    </div>

    <div className="space-y-4">

      <div className="bg-[#111122] rounded-2xl p-5">

        <p className="text-gray-400 text-sm">

          Experience

        </p>

        <h3 className="text-white text-xl font-semibold">

          {selectedTrainer.experience} Years

        </h3>

      </div>

      <div className="bg-[#111122] rounded-2xl p-5">

        <p className="text-gray-400 text-sm">

          Specialty

        </p>

        <h3 className="text-white text-xl font-semibold">

          {selectedTrainer.specialty}

        </h3>

      </div>

      <div className="bg-[#111122] rounded-2xl p-5">

        <p className="text-gray-400 text-sm">

          Status

        </p>

        <h3 className={`font-bold capitalize ${
          selectedTrainer.status === "approved"
            ? "text-green-400"
            : selectedTrainer.status === "rejected"
            ? "text-red-400"
            : "text-yellow-400"
        }`}>

          {selectedTrainer.status}

        </h3>

      </div>

      {selectedTrainer.feedback && (

        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">

          <p className="text-red-300 font-semibold mb-2">

            Admin Feedback

          </p>

          <p className="text-gray-300">

            {selectedTrainer.feedback}

          </p>

        </div>

      )}

    </div>

  </div>

</div>

)}
    </div>

  );

}