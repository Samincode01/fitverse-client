"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function AddClass() {

  const { data: session } = authClient.useSession();

  const user = session?.user || session?.data?.user;

  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };
const handleImageUpload = async (e) => {

  const image = e.target.files[0];

  if (!image) return;

  const imageData = new FormData();

  imageData.append("image", image);

  try {

    const res = await fetch(

      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,

      {

        method: "POST",

        body: imageData,

      }

    );

    const data = await res.json();

    if (data.success) {

      setFormData({

        ...formData,

        image: data.data.url,

      });

      toast.success("Image Uploaded");

    }

  }

  catch {

    toast.error("Image Upload Failed");

  }

};

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    const classData = {

      ...formData,

      trainerName: user?.name,

      trainerEmail: user?.email,

      trainerImage: user?.image,

      students: 0,

      price: Number(formData.price),

      status: "pending",

      createdAt: new Date(),

    };

    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes`, {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify(classData),

      });

      const data = await res.json();

      if (data.insertedId) {

        toast.success("Class Added Successfully");

        setFormData({

          title: "",

          image: "",

          category: "",

          level: "",

          duration: "",

          schedule: "",

          price: "",

          description: "",

        });

      }

    } catch {

      toast.error("Failed to Add Class");

    }

    setLoading(false);

  };

  return (

    <div className="min-h-screen bg-[#030312] py-12">

      <div className="max-w-4xl mx-auto">

        <div className="mb-12">

          <h1 className="text-5xl font-bold text-white">

            Add New

            <span className="text-[#D9FF3F]">

              {" "}Fitness Class

            </span>

          </h1>

          <p className="text-gray-400 mt-4">

            Create a new training program for Fitverse.

          </p>

        </div>

        <form

          onSubmit={handleSubmit}

          className="bg-[#0A0A18] border border-white/10 rounded-[35px] p-10 space-y-8"

        >

          <div className="grid md:grid-cols-2 gap-7">

            <div>

              <label className="block text-white mb-3">

                Class Name

              </label>

              <input

                type="text"

                name="title"

                required

                value={formData.title}

                onChange={handleChange}

                placeholder="Power Yoga"

                className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white outline-none focus:border-[#D9FF3F]"

              />

            </div>

<div>

  <label className="block text-white mb-3">

    Upload Class Image

  </label>

  <input

    type="file"

    accept="image/*"

    onChange={handleImageUpload}

    className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white"

  />

  {

    formData.image && (

      <div className="mt-4">

        <img

          src={formData.image}

          alt="Preview"

          className="w-36 h-24 rounded-2xl object-cover border border-white/10"

        />

        <p className="text-green-400 text-sm mt-2">

          Image uploaded successfully

        </p>

      </div>

    )

  }

</div>

          </div>

          <div className="grid md:grid-cols-2 gap-7">

            <div>

              <label className="block text-white mb-3">

                Category

              </label>

              <select

                name="category"

                required

                value={formData.category}

                onChange={handleChange}

                className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white"

              >

                <option value="">Select Category</option>

                <option value="Yoga">Yoga</option>

                <option value="Cardio">Cardio</option>

                <option value="Strength">Strength</option>

                <option value="Crossfit">Crossfit</option>

                <option value="Weight Loss">Weight Loss</option>

              </select>

            </div>

            <div>

              <label className="block text-white mb-3">

                Difficulty Level

              </label>

              <select

                name="level"

                required

                value={formData.level}

                onChange={handleChange}

                className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white"

              >

                <option value="">Select Level</option>

                <option value="Beginner">Beginner</option>

                <option value="Intermediate">Intermediate</option>

                <option value="Advanced">Advanced</option>

              </select>

            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-7">

            <div>

              <label className="block text-white mb-3">

                Duration

              </label>

              <input

                type="text"

                name="duration"

                required

                value={formData.duration}

                onChange={handleChange}

                placeholder="60 Minutes"

                className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white"

              />

            </div>

            <div>

              <label className="block text-white mb-3">

                Schedule

              </label>

              <input

                type="text"

                name="schedule"

                required

                value={formData.schedule}

                onChange={handleChange}

                placeholder="Mon-Wed-Fri 7PM"

                className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white"

              />

            </div>

            <div>

              <label className="block text-white mb-3">

                Price

              </label>

              <input

                type="number"

                name="price"

                required

                value={formData.price}

                onChange={handleChange}

                placeholder="25"

                className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white"

              />

            </div>

          </div>

          <div>

            <label className="block text-white mb-3">

              Description

            </label>

            <textarea

              rows={6}

              name="description"

              required

              value={formData.description}

              onChange={handleChange}

              placeholder="Write class description..."

              className="w-full px-5 py-4 rounded-3xl bg-[#111122] border border-white/10 text-white resize-none"

            />

          </div>

          <button

            type="submit"

            disabled={loading}

            className="w-full py-5 rounded-2xl bg-[#D9FF3F] text-black font-bold text-lg hover:bg-[#E6FF66] transition-all duration-300 cursor-pointer"

          >

            {

              loading

                ? "Adding Class..."

                : "Add Class"

            }

          </button>

        </form>

      </div>

    </div>

  );

}