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

  const formDataImg = new FormData();

  formDataImg.append("image", image);

  try {

    const res = await fetch(

      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,

      {

        method: "POST",

        body: formDataImg,

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

      role: "admin",

      status: "approved",

      likes: 0,

      dislikes: 0,

      likedUsers: [],

      dislikedUsers: [],

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

        toast.success("Forum Published");

        setFormData({

          title: "",

          image: "",

          description: "",

        });

      }

    }

    catch {

      toast.error("Failed to publish");

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-[#030312] py-10">

      <div className="max-w-4xl mx-auto">

        <div className="bg-[#0A0A18] border border-white/10 rounded-[35px] p-10">

          <h1 className="text-5xl font-bold text-white">

            Publish Forum

          </h1>

          <p className="text-gray-400 mt-3">

            Create and publish community posts instantly.

          </p>

          <form

            onSubmit={handleSubmit}

            className="space-y-7 mt-10"

          >

            <input

              type="text"

              name="title"

              required

              value={formData.title}

              onChange={handleChange}

              placeholder="Forum Title"

              className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white"

            />

           <div>

  <input

    type="file"

    accept="image/*"

    onChange={handleImageUpload}

    className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white"

  />

  {

    formData.image && (

      <p className="text-green-400 text-sm mt-2">

        Image Uploaded Successfully

      </p>

    )

  }

</div>

            <textarea

              rows={8}

              required

              name="description"

              value={formData.description}

              onChange={handleChange}

              placeholder="Write forum content..."

              className="w-full px-5 py-4 rounded-2xl bg-[#111122] border border-white/10 text-white resize-none"

            />

            <button

              type="submit"

              disabled={loading}

              className="w-full py-4 rounded-2xl bg-[#D9FF3F] text-black font-bold"

            >

              {

                loading

                  ? "Publishing..."

                  : "Publish Forum"

              }

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}