"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, ImageIcon } from "lucide-react";
import { FaReact, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
  const formData = new FormData();

  formData.append("image", image);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  console.log(data);

  if (!data.success) {
    throw new Error(data.error?.message || "Image upload failed");
  }

  return data.data.url;
};

  const handleRegister = async (e) => {
    e.preventDefault();
    const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;

if (!passwordRegex.test(password)) {
  toast.error(
    "Password must be at least 8 characters and include uppercase, lowercase, number and special character."
  );
  return;
}

if (password !== confirmPassword) {
  toast.error("Passwords do not match");
  return;
}
    try {
      setLoading(true);

      let imageUrl = "";

      if (image) {
        imageUrl = await uploadImage();
      }

      const { error } = await authClient.signUp.email({
        name,
        email,
        password,

        image: imageUrl,

        role: "user",
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      // Sign out immediately in case Better Auth auto signs in
      await authClient.signOut();

      toast.success(
        "Registration successful! Please login to continue.",
        {
          position: "top-right",
          autoClose: 2000,
        }
      );

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setImage(null);

      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (err) {
      console.log(err);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
const handleGoogleSignin = async() =>
{
  const data = await authClient.signIn.social({
    provider: "google",
  });
};
  return (
    <section className="relative min-h-screen bg-[#030312] overflow-hidden flex items-center justify-center px-6 py-20">

      {/* Background */}

      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#030312]/70 via-[#030312]/85 to-[#030312]" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#D9FF3F]/20 blur-[130px]" />

      {/* Card */}

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md rounded-[35px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-10 shadow-[0_20px_60px_rgba(0,0,0,.5)]"
      >

        {/* Logo */}

        <div className="flex flex-col items-center">

          <div className="w-16 h-16 rounded-full border border-[#D9FF3F]/30 bg-[#D9FF3F]/10 flex items-center justify-center">

            <FaReact className="text-[#D9FF3F] text-4xl" />

          </div>

          <h1 className="text-white text-4xl font-bold mt-6">
            Create Account
          </h1>

          <p className="text-gray-400 text-center mt-3">
            Start your fitness journey with Fitverse today.
          </p>

        </div>

        {/* Google */}

        <button onClick={handleGoogleSignin} className="mt-8 w-full h-14 rounded-2xl border border-white/10 bg-white/[0.04] text-white flex items-center justify-center gap-4 transition-all duration-300 hover:border-[#D9FF3F] hover:bg-white/[0.08] hover:scale-[1.02] cursor-pointer">

          <FaGoogle className="text-[#D9FF3F] text-xl" />

          Continue with Google

        </button>

        {/* Divider */}

        <div className="flex items-center gap-4 my-8">

          <div className="flex-1 h-[1px] bg-white/10" />

          <span className="text-gray-500 text-sm">
            OR
          </span>

          <div className="flex-1 h-[1px] bg-white/10" />

        </div>

        {/* Form */}

        <form onSubmit={handleRegister} className="space-y-6">

          {/* Image */}

          <div>

            <label className="text-gray-300 mb-3 block">
              Profile Image
            </label>

            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/10 bg-white/[0.03]">

              <ImageIcon className="text-[#D9FF3F]" />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="text-gray-300 text-sm"
              />

            </div>

          </div>

          {/* Name */}

          <div>

            <label className="text-gray-300 mb-3 block">
              Full Name
            </label>

            <div className="flex items-center gap-3 px-5 h-14 rounded-2xl border border-white/10 bg-white/[0.03]">

              <User className="text-[#D9FF3F]" size={20} />

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500"
              />

            </div>

          </div>

          {/* Email */}

          <div>

            <label className="text-gray-300 mb-3 block">
              Email Address
            </label>

            <div className="flex items-center gap-3 px-5 h-14 rounded-2xl border border-white/10 bg-white/[0.03]">

              <Mail className="text-[#D9FF3F]" size={20} />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="text-gray-300 mb-3 block">
              Password
            </label>

            <div className="flex items-center gap-3 px-5 h-14 rounded-2xl border border-white/10 bg-white/[0.03]">

              <Lock className="text-[#D9FF3F]" size={20} />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
                required
                className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500"
              />

            </div>
<div>

  <label className="text-gray-300 mb-3 block">
    Confirm Password
  </label>

  <div className="flex items-center gap-3 px-5 h-14 rounded-2xl border border-white/10 bg-white/[0.03]">

    <Lock className="text-[#D9FF3F]" size={20} />

    <input
      type="password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      placeholder="Confirm password"
      required
      className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500"
    />

  </div>

</div>
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-full bg-[#D9FF3F] text-black font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:bg-[#c6ea37] hover:scale-[1.02] cursor-pointer"
          >

            {loading ? "Creating..." : "Create Account"}

            <ArrowRight size={20} />

          </button>

        </form>

        {/* Footer */}

        <p className="text-center text-gray-400 mt-8">

          Already have an account?

          <Link
            href="/login"
            className="text-[#D9FF3F] ml-2 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </motion.div>

    </section>
  );
}