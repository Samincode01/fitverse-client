"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { UserCog } from "lucide-react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function ManageTrainers() {

  const [trainers, setTrainers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchTrainers = async () => {

      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/trainers`
        );

        const data = await res.json();

        setTrainers(data);

      }

      catch (error) {

        console.log(error);

        toast.error("Failed to load trainers");

      }

      finally {

        setLoading(false);

      }

    };

    fetchTrainers();

  }, []);

  const handleDemote = async (id) => {

    const result = await Swal.fire({

      title: "Demote Trainer?",

      text: "This trainer will become a normal user.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Yes, Demote",

      cancelButtonText: "Cancel",

      confirmButtonColor: "#D9FF3F",

      background: "#0A0A18",

      color: "#fff",

    });

    if (!result.isConfirmed) return;

    try {

      const res = await fetch(

        `${process.env.NEXT_PUBLIC_API_URL}/trainers/${id}`,

        {

          method: "PATCH",

        }

      );

      const data = await res.json();

      if (data.modifiedCount > 0) {

        Swal.fire({

          title: "Success",

          text: "Trainer demoted successfully.",

          icon: "success",

          confirmButtonColor: "#D9FF3F",

          background: "#0A0A18",

          color: "#fff",

        });

        setTrainers((prev) =>

          prev.filter(

            (trainer) => trainer._id !== id

          )

        );

      }

    }

    catch (error) {

      console.log(error);

      Swal.fire({

        title: "Error",

        text: "Failed to demote trainer",

        icon: "error",

        background: "#0A0A18",

        color: "#fff",

      });

    }

  };

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

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

          Manage Trainers

        </h1>

        {

          trainers.length === 0 ? (

            <div className="text-center py-20 text-white">

              No Trainers Found

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {

                trainers.map((trainer) => (

                  <div

                    key={trainer._id}

                    className="rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8"

                  >

                    <div className="flex flex-col items-center">

                      {

                        trainer.image ? (

                          <Image

                            src={trainer.image}

                            alt={trainer.name}

                            width={110}

                            height={110}

                            className="w-[110px] h-[110px] rounded-full object-cover border-4 border-[#D9FF3F]"

                          />

                        ) : (

                          <div className="w-[110px] h-[110px] rounded-full border-4 border-[#D9FF3F] flex items-center justify-center">

                            <UserCog

                              size={50}

                              className="text-[#D9FF3F]"

                            />

                          </div>

                        )

                      }

                      <h2 className="text-white text-2xl font-bold mt-6">

                        {trainer.name}

                      </h2>

                      <p className="text-gray-400 mt-2">

                        {trainer.email}

                      </p>

                      <span className="mt-4 px-5 py-2 rounded-full bg-[#D9FF3F]/10 text-[#D9FF3F]">

                        Trainer

                      </span>

                      <button

                        onClick={() =>

                          handleDemote(trainer._id)

                        }

                        className="mt-8 px-8 py-4 rounded-2xl bg-red-500 text-white font-semibold hover:opacity-90 transition"

                      >

                        Demote To User

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