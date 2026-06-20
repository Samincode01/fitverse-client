"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Image from "next/image";
import { UserCircle2, Pencil, Trash2, Users, X } from "lucide-react";

export default function MyClasses() {

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user || session?.data?.user;

  const [classes, setClasses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editModal, setEditModal] = useState(false);

  const [studentsModal, setStudentsModal] = useState(false);

  const [selectedClass, setSelectedClass] = useState(null);

  const [formData, setFormData] = useState({

    title: "",

    image: "",

    category: "",

    level: "",

    duration: "",

    schedule: "",

    price: "",

    description: "",

  });

  const students = [

    {

      id: 1,

      name: "John Doe",

      email: "john@gmail.com",

    },

    {

      id: 2,

      name: "Sarah Wilson",

      email: "sarah@gmail.com",

    },

    {

      id: 3,

      name: "Michael Brown",

      email: "michael@gmail.com",

    },

  ];

  useEffect(() => {

    if (!user?.email) return;

    fetch(`http://localhost:5000/trainer-classes/${user.email}`)

      .then((res) => res.json())

      .then((data) => {

        setClasses(data);

        setLoading(false);

      })

      .catch(() => {

        toast.error("Failed to load classes");

        setLoading(false);

      });

  }, [user?.email]);

  const openEditModal = (item) => {

    setSelectedClass(item);

    setFormData({

      title: item.title,

      image: item.image,

      category: item.category,

      level: item.level,

      duration: item.duration,

      schedule: item.schedule,

      price: item.price,

      description: item.description,

    });

    setEditModal(true);

  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

const handleUpdate = async (e) => {

 e.preventDefault();

  if (!selectedClass) return;

  const res = await fetch(

    `http://localhost:5000/classes/${selectedClass._id}`,

    {

      method: "PATCH",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify(formData),

    }

  );

  const data = await res.json();

  if (data.modifiedCount > 0) {

    toast.success("Class Updated");

    setClasses(

      classes.map((item) =>

        item._id === selectedClass._id

          ? {

              ...item,

              ...formData,

            }

          : item

      )

    );

    setEditModal(false);

    setSelectedClass(null);

  }

};

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(

      "Are you sure you want to delete this class?"

    );

    if (!confirmDelete) return;

    const res = await fetch(

      `http://localhost:5000/classes/${id}`,

      {

        method: "DELETE",

      }

    );

    const data = await res.json();

    if (data.deletedCount > 0) {

      toast.success("Class Deleted");

      setClasses(

        classes.filter((item) => item._id !== id)

      );

    }

  };

  if (isPending || loading) {

    return (

      <div className="text-white text-2xl">

        Loading...

      </div>

    );

  }

  return (

    <div className="w-full">

      <h1 className="text-4xl font-bold text-white mb-8 mt-9">

        My Classes

      </h1>

      <div className="overflow-x-auto rounded-[30px] border border-white/10 bg-[#0A0A18]">

        <table className="w-full">

          <thead className="border-b border-white/10">

            <tr className="text-gray-400 text-left">

              <th className="px-8 py-5">

                Class

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

                <td className="text-white">

                  {item.category}

                </td>

                <td className="text-[#D9FF3F] font-bold">

                  ${item.price}

                </td>

                <td>

                  <span

                    className={`capitalize font-semibold ${
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

                  <div className="flex justify-center gap-3">

                    <button

                      onClick={() => openEditModal(item)}

                      className="w-10 h-10 rounded-xl bg-[#D9FF3F]/15 text-[#D9FF3F] flex items-center justify-center"

                    >

                      <Pencil size={18} />

                    </button>

                    <button

                      onClick={() => handleDelete(item._id)}

                      className="w-10 h-10 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center"

                    >

                      <Trash2 size={18} />

                    </button>

                    <button

                      onClick={() => {

                        setSelectedClass(item);

                        setStudentsModal(true);

                      }}

                      className="px-4 rounded-xl bg-blue-500/15 text-blue-400 flex items-center gap-2"

                    >

                      <Users size={18} />

                      Students

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
            {/* Edit Modal */}

      {editModal && selectedClass && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="w-[700px] bg-[#0A0A18] rounded-[35px] border border-white/10 p-8 relative">

            <button
              onClick={() => setEditModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl font-bold text-white mb-8">

              Update Class

            </h2>

            <form
              onSubmit={handleUpdate}
              className="space-y-6"
            >

              <input

                type="text"

                name="title"

                value={formData.title}

                onChange={handleChange}

                placeholder="Class Name"

                className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white"

              />

              <input

                type="text"

                name="image"

                value={formData.image}

                onChange={handleChange}

                placeholder="Image URL"

                className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white"

              />

              <div className="grid md:grid-cols-2 gap-5">

                <input

                  type="text"

                  name="category"

                  value={formData.category}

                  onChange={handleChange}

                  placeholder="Category"

                  className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white"

                />

                <input

                  type="text"

                  name="level"

                  value={formData.level}

                  onChange={handleChange}

                  placeholder="Difficulty"

                  className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white"

                />

              </div>

              <div className="grid md:grid-cols-3 gap-5">

                <input

                  type="text"

                  name="duration"

                  value={formData.duration}

                  onChange={handleChange}

                  placeholder="Duration"

                  className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white"

                />

                <input

                  type="text"

                  name="schedule"

                  value={formData.schedule}

                  onChange={handleChange}

                  placeholder="Schedule"

                  className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white"

                />

                <input

                  type="number"

                  name="price"

                  value={formData.price}

                  onChange={handleChange}

                  placeholder="Price"

                  className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white"

                />

              </div>

              <textarea

                rows={5}

                name="description"

                value={formData.description}

                onChange={handleChange}

                placeholder="Description"

                className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white resize-none"

              />

              <button

                type="submit"

                className="w-full py-4 rounded-2xl bg-[#D9FF3F] text-black font-bold cursor-pointer"

              >

                Save Changes

              </button>

            </form>

          </div>

        </div>

      )}


      {/* Students Modal */}

      {studentsModal && selectedClass && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="w-[550px] bg-[#0A0A18] rounded-[35px] border border-white/10 p-8 relative">

            <button

              onClick={() => setStudentsModal(false)}

              className="absolute top-6 right-6 text-gray-400 hover:text-white"

            >

              <X size={24} />

            </button>

            <h2 className="text-3xl font-bold text-white mb-8">

              Students Enrolled

            </h2>

            <div className="space-y-4">

              {students.map((student) => (

                <div

                  key={student.id}

                  className="bg-[#111122] rounded-2xl p-5 border border-white/5"

                >

                  <h3 className="text-white font-semibold">

                    {student.name}

                  </h3>

                  <p className="text-gray-400 text-sm mt-1">

                    {student.email}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      )}

    </div>

  );

}