"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function AddForum() {

  const { data: session } = authClient.useSession();

  const user = session?.user || session?.data?.user;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    title: "",

    image: "",

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

   const forumData = {

  title: formData.title,

  image: formData.image,

  description: formData.description,

  author: user?.name,

  authorEmail: user?.email,

  authorImage: user?.image,

  role: user?.role,

  status: "pending", // important

  likes: 0,

  dislikes: 0,

  comments: [],

  createdAt: new Date(),

};

    try {

      const res = await fetch(

        "http://localhost:5000/forums",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify(forumData),

        }

      );

      const data = await res.json();

      if (data.insertedId) {

        toast.success("Forum post created successfully");

        setFormData({

          title: "",

          image: "",

          description: "",

        });

      }

    } catch {

      toast.error("Failed to create forum");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-[#030312] py-10">

      <div className="max-w-4xl mx-auto">

        <div className="bg-[#0A0A18] border border-white/10 rounded-[35px] p-10">

          <h1 className="text-5xl font-bold text-white">

            Add Forum Post

          </h1>

          <p className="text-gray-400 mt-3">

            Share your fitness tips and experiences with the community.

          </p>

          <form

            onSubmit={handleSubmit}

            className="space-y-7 mt-10"

          >

            <div>

              <label className="block text-white mb-3">

                Forum Title

              </label>

              <input

                type="text"

                required

                name="title"

                value={formData.title}

                onChange={handleChange}

                placeholder="Enter forum title"

                className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white outline-none focus:border-[#D9FF3F]"

              />

            </div>

<div>

  <label className="block text-white mb-3">

    Upload Forum Image

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

          className="w-32 h-32 object-cover rounded-2xl border border-white/10"

        />

        <p className="text-green-400 text-sm mt-2">

          Image uploaded successfully

        </p>

      </div>

    )

  }

</div>

            <div>

              <label className="block text-white mb-3">

                Description

              </label>

              <textarea

                required

                rows={8}

                name="description"

                value={formData.description}

                onChange={handleChange}

                placeholder="Write your forum content..."

                className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white outline-none resize-none focus:border-[#D9FF3F]"

              />

            </div>

            <button

              type="submit"

              disabled={loading}

              className="w-full py-4 rounded-2xl bg-[#D9FF3F] text-black font-bold hover:bg-[#E3FF5E] transition-all duration-300 cursor-pointer disabled:opacity-50"

            >

              {loading ? "Publishing..." : "Publish Forum"}

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}