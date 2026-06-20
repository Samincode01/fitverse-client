"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Image from "next/image";
import { UserCircle2 } from "lucide-react";

export default function ApplyTrainer() {

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user || session?.data?.user;

  const [loading, setLoading] = useState(false);

  const [application, setApplication] = useState(null);

  const [formData, setFormData] = useState({
    experience: "",
    specialty: "",
  });

  useEffect(() => {

    if (isPending) return;

    if (!user?.email) return;

    setLoading(true);

    fetch(`http://localhost:5000/trainer-applications/${user.email}`)

      .then((res) => res.json())

      .then((data) => {

        if (data) {

          setApplication(data);

        }

        setLoading(false);

      })

      .catch(() => {

        setLoading(false);

      });

  }, [user?.email, isPending]);



  const handleSubmit = async (e) => {

    e.preventDefault();

    const trainerData = {

      userId: user?.id,

      name: user?.name,

      email: user?.email,

      image: user?.image,

      experience: Number(formData.experience),

      specialty: formData.specialty,

    };

    try {

      const res = await fetch(
        "http://localhost:5000/trainer-applications",
        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify(trainerData),

        }
      );

      const data = await res.json();

      if (data.insertedId) {

        toast.success("Application submitted successfully!");

        setApplication({

          ...trainerData,

          status: "unapproved",

        });

      }

    } catch {

      toast.error("Failed to submit application");

    }

  };



  if (isPending || loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#030312]">

        <h1 className="text-white text-2xl">

          Loading...

        </h1>

      </div>

    );

  }



  if (application) {

    return (

      <div className="min-h-screen bg-[#030312] py-24 px-6">

        <div className="max-w-xl mx-auto bg-[#0A0A18] border border-white/10 rounded-[32px] p-10">

          <h1 className="text-4xl font-bold text-white text-center mb-8">

            Trainer Application

          </h1>

          <div className="flex justify-center mb-6">

            {application.image ? (

              <Image

                src={application.image}

                alt={application.name}

                width={96}

                height={96}

                priority

                className="w-24 h-24 rounded-full object-cover border-4 border-[#D9FF3F]"

              />

            ) : (

              <div className="w-24 h-24 rounded-full border-4 border-[#D9FF3F] bg-[#D9FF3F]/10 flex items-center justify-center">

                <UserCircle2

                  size={60}

                  className="text-[#D9FF3F]"

                />

              </div>

            )}

          </div>

          <h2 className="text-2xl text-center font-bold text-white">

            {application.name}

          </h2>

          <p className="text-center text-gray-400 mb-8">

            {application.email}

          </p>

          <div className="space-y-4">

            <div className="bg-[#111122] rounded-2xl p-5">

              <p className="text-gray-400 text-sm">

                Experience

              </p>

              <h3 className="text-white text-lg font-semibold">

                {application.experience} Years

              </h3>

            </div>

            <div className="bg-[#111122] rounded-2xl p-5">

              <p className="text-gray-400 text-sm">

                Specialty

              </p>

              <h3 className="text-white text-lg font-semibold">

                {application.specialty}

              </h3>

            </div>

            <div className="bg-[#111122] rounded-2xl p-5">

              <p className="text-gray-400 text-sm">

                Status

              </p>

              <h3 className={`text-lg font-bold capitalize ${
                application.status === "approved"
                  ? "text-green-400"
                  : application.status === "rejected"
                  ? "text-red-400"
                  : "text-yellow-400"
              }`}>

                {application.status}

              </h3>

            </div>

          </div>

        </div>

      </div>

    );

  }



  return (

    <div className="min-h-screen bg-[#030312] py-24 px-6">

      <div className="max-w-xl mx-auto bg-[#0A0A18] border border-white/10 rounded-[32px] p-10">

        <h1 className="text-5xl font-bold text-white mb-3">

          Apply as Trainer

        </h1>

        <p className="text-gray-400 mb-10">

          Share your experience and specialty to become a Fitverse trainer.

        </p>

        <form onSubmit={handleSubmit} className="space-y-7">

          <input

            type="number"

            name="experience"

            required

            placeholder="Experience (Years)"

            value={formData.experience}

            onChange={(e) =>
              setFormData({
                ...formData,
                experience: e.target.value,
              })
            }

            className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white"

          />

          <select

            required

            value={formData.specialty}

            onChange={(e) =>
              setFormData({
                ...formData,
                specialty: e.target.value,
              })
            }

            className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white"

          >

            <option value="">

              Select Specialty

            </option>

            <option value="Yoga">Yoga</option>

            <option value="Weights">Weights</option>

            <option value="Cardio">Cardio</option>

            <option value="CrossFit">CrossFit</option>

            <option value="Strength Training">Strength Training</option>

          </select>

          <button

            type="submit"

            className="w-full py-4 rounded-2xl bg-[#D9FF3F] text-black font-bold cursor-pointer"

          >

            Submit Application

          </button>

        </form>

      </div>

    </div>

  );

}