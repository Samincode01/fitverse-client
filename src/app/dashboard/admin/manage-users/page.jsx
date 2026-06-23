"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function ManageUsers() {

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)

      .then(res => res.json())

      .then(data => {

        setUsers(data);

        setLoading(false);

      })

      .catch(error => {

        console.log(error);

        toast.error("Failed to load users");

        setLoading(false);

      });

  }, []);

  const updateUser = (id, fields) => {

    setUsers(prev =>

      prev.map(user =>

        user._id === id

          ? { ...user, ...fields }

          : user

      )

    );

  };

  // MAKE ADMIN

  const handleMakeAdmin = async (id) => {

    const result = await Swal.fire({

      title: "Make Admin?",

      text: "This user will become an admin.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#D9FF3F",

      background: "#0A0A18",

      color: "#fff",

    });

    if (!result.isConfirmed) return;

    const res = await fetch(

      `${process.env.NEXT_PUBLIC_API_URL}/users/make-admin/${id}`,

      {

        method: "PATCH",

      }

    );

    const data = await res.json();

    if (data.modifiedCount > 0) {

      updateUser(id, {

        role: "admin",

      });

      toast.success("Admin Created");

    }

  };

  // DEMOTE ADMIN

  const handleDemoteAdmin = async (id) => {

    const result = await Swal.fire({

      title: "Demote Admin?",

      text: "Admin privileges will be removed.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#ef4444",

      background: "#0A0A18",

      color: "#fff",

    });

    if (!result.isConfirmed) return;

    const res = await fetch(

      `${process.env.NEXT_PUBLIC_API_URL}/users/demote-admin/${id}`,

      {

        method: "PATCH",

      }

    );

    const data = await res.json();

    if (data.modifiedCount > 0) {

      updateUser(id, {

        role: "user",

      });

      toast.success("Admin Demoted");

    }

  };

  // BLOCK USER

  const handleBlock = async (id) => {

    const result = await Swal.fire({

      title: "Block User?",

      text: "This user cannot perform actions.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#ef4444",

      background: "#0A0A18",

      color: "#fff",

    });

    if (!result.isConfirmed) return;

    const res = await fetch(

      `${process.env.NEXT_PUBLIC_API_URL}/users/block/${id}`,

      {

        method: "PATCH",

      }

    );

    const data = await res.json();

    if (data.modifiedCount > 0) {

      updateUser(id, {

        status: "blocked",

      });

      toast.success("User Blocked");

    }

  };

  // UNBLOCK USER

  const handleUnblock = async (id) => {

    const res = await fetch(

      `${process.env.NEXT_PUBLIC_API_URL}/users/unblock/${id}`,

      {

        method: "PATCH",

      }

    );

    const data = await res.json();

    if (data.modifiedCount > 0) {

      updateUser(id, {

        status: undefined,

      });

      toast.success("User Unblocked");

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

          Manage Users

        </h1>

        <div className="overflow-x-auto rounded-[30px] border border-white/10">

          <table className="w-full">

            <thead className="bg-[#0A0A18]">

              <tr>

                <th className="text-left px-6 py-5 text-gray-400">

                  User

                </th>

                <th className="text-left text-gray-400">

                  Role

                </th>

                <th className="text-left text-gray-400">

                  Status

                </th>

                <th className="text-center text-gray-400">

                  Actions

                </th>

              </tr>

            </thead>

            <tbody>

              {

                users.map(user => (

                  <tr

                    key={user._id}

                    className="border-t border-white/10"

                  >

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        {

                          user.image &&

                          <Image

                            src={user.image}

                            alt={user.name}

                            width={55}

                            height={55}

                            className="rounded-full"

                          />

                        }

                        <div>

                          <h3 className="text-white font-semibold">

                            {user.name}

                          </h3>

                          <p className="text-gray-400">

                            {user.email}

                          </p>

                        </div>

                      </div>

                    </td>

                    <td>

                      <span className="text-[#D9FF3F]">

                        {user.role || "user"}

                      </span>

                    </td>

                    <td>

                      {

                        user.status === "blocked"

                          ?

                          <span className="text-red-400">

                            Blocked

                          </span>

                          :

                          <span className="text-green-400">

                            Active

                          </span>

                      }

                    </td>

                    <td>

                      <div className="flex gap-3 justify-center">

                        {

                          user.role === "admin"

                            ?

                            <button

                              onClick={() =>

                                handleDemoteAdmin(user._id)

                              }

                              className="px-4 py-2 rounded-xl bg-red-500 text-white"

                            >

                              Demote

                            </button>

                            :

                            <button

                              onClick={() =>

                                handleMakeAdmin(user._id)

                              }

                              className="px-4 py-2 rounded-xl bg-[#D9FF3F] text-black font-semibold"

                            >

                              Make Admin

                            </button>

                        }

                        {

                          user.status === "blocked"

                            ?

                            <button

                              onClick={() =>

                                handleUnblock(user._id)

                              }

                              className="px-4 py-2 rounded-xl bg-green-500 text-white"

                            >

                              Unblock

                            </button>

                            :

                            <button

                              onClick={() =>

                                handleBlock(user._id)

                              }

                              className="px-4 py-2 rounded-xl bg-red-500 text-white"

                            >

                              Block

                            </button>

                        }

                      </div>

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </div>

      </div>

    </section>

  );

}