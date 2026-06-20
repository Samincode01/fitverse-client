"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { UserCircle2 } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Heart,
  UserPlus,
  ClipboardList,
  MessageSquare,
  CreditCard,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function DashboardLayout({ children }) {

  const router = useRouter();

  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user || session?.data?.user;

  useEffect(() => {

    if (!isPending && !user) {

      router.push("/login");

    }

  }, [user, isPending, router]);

  const handleLogout = async () => {

    await authClient.signOut();

    toast.success("Logged out successfully");

    router.push("/");

    router.refresh();

  };

  const userLinks = [

    {
      name: "Overview",
      href: "/dashboard/user",
      icon: LayoutDashboard,
    },

    {
      name: "Booked Classes",
      href: "/dashboard/user/booked-classes",
      icon: BookOpen,
    },

    {
      name: "Apply as Trainer",
      href: "/dashboard/user/apply-trainer",
      icon: UserPlus,
    },

    {
      name: "Favourite Classes",
      href: "/dashboard/user/favourites",
      icon: Heart,
    },

  ];

  const trainerLinks = [

    {
      name: "Overview",
      href: "/dashboard/trainer",
      icon: LayoutDashboard,
    },

    {
      name: "Add Class",
      href: "/dashboard/trainer/add-class",
      icon: BookOpen,
    },

    {
      name: "My Classes",
      href: "/dashboard/trainer/my-classes",
      icon: ClipboardList,
    },

    {
      name: "Add Forum Post",
      href: "/dashboard/trainer/add-forum",
      icon: MessageSquare,
    },

    {
      name: "My Forum Posts",
      href: "/dashboard/trainer/my-forums",
      icon: MessageSquare,
    },

  ];

  const adminLinks = [

    {
      name: "Overview",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },

    {
      name: "Manage Users",
      href: "/dashboard/admin/manage-users",
      icon: Users,
    },

    {
      name: "Applied Trainers",
      href: "/dashboard/admin/applied-trainers",
      icon: UserPlus,
    },

    {
      name: "Manage Trainers",
      href: "/dashboard/admin/manage-trainers",
      icon: Users,
    },

    {
      name: "Manage Classes",
      href: "/dashboard/admin/manage-classes",
      icon: ClipboardList,
    },

    {
      name: "Add Forum",
      href: "/dashboard/admin/add-forum",
      icon: MessageSquare,
    },

    {
      name: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: CreditCard,
    },

    {
      name: "Forum Manage",
      href: "/dashboard/admin/forum-manage",
      icon: MessageSquare,
    },

  ];

  const links =
    user?.role === "admin"
      ? adminLinks
      : user?.role === "trainer"
      ? trainerLinks
      : userLinks;

  if (isPending) {

    return (

      <div className="min-h-screen bg-[#030312] flex items-center justify-center">

        <h1 className="text-white text-3xl">

          Loading...

        </h1>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#030312] flex">

      {/* Mobile Toggle */}

      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-5 left-5 z-50 lg:hidden bg-[#D9FF3F] p-3 rounded-xl"
      >

        <Menu className="text-black" />

      </button>

      {/* Sidebar */}

      <aside
        className={`fixed lg:static top-0 left-0 z-50 w-[290px] h-screen bg-[#0A0A18] border-r border-white/10 p-6 transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >

        <div className="flex justify-between items-center mb-10">

          <Link href="/" className="text-white text-3xl font-bold">

            Fitverse

          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white"
          >

            <X />

          </button>

        </div>

        {/* Profile */}

        <div className="flex flex-col items-center border-b border-white/10 pb-8">

          {user?.image ? (
  <Image
    src={user.image}
    alt={user.name}
    width={96}
    height={96}
    className="w-24 h-24 rounded-full object-cover border-4 border-[#D9FF3F]"
  />
) : (
  <div className="w-24 h-24 rounded-full border-4 border-[#D9FF3F] bg-[#D9FF3F]/10 flex items-center justify-center">
    <UserCircle2 size={60} className="text-[#D9FF3F]" />
  </div>
)}

          <h2 className="text-white text-xl font-bold mt-4">

            {user?.name}

          </h2>

          <p className="text-gray-400">

            {user?.email}

          </p>

          <span className="mt-4 px-4 py-1 rounded-full bg-[#D9FF3F] text-black font-semibold capitalize">

            {user?.role}

          </span>

        </div>

        {/* Links */}

        <div className="mt-8 flex flex-col gap-3">

          {links.map((item) => {

            const Icon = item.icon;

            return (

              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                  pathname === item.href
                    ? "bg-[#D9FF3F] text-black font-semibold"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >

                <Icon size={20} />

                {item.name}

              </Link>

            );

          })}

        </div>

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="absolute bottom-8 left-6 right-6 flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-500/20 text-red-400 font-semibold cursor-pointer"
        >

          <LogOut size={20} />

          Logout

        </button>

      </aside>

      {/* Main Content */}

      <main className="flex-1 p-8 lg:p-12 overflow-auto">

        {children}

      </main>

    </div>

  );
}