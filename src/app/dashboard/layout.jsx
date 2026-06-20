"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  UserCircle2,
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

    try {

      await authClient.signOut();

      toast.success("Logged out successfully");

      router.push("/");

      router.refresh();

    } catch {

      toast.error("Logout failed");

    }

  };

  // USER LINKS

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

  // TRAINER LINKS

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
      name: "Add Forum",
      href: "/dashboard/trainer/add-forum",
      icon: MessageSquare,
    },

    {
      name: "My Forum Posts",
      href: "/dashboard/trainer/my-forums",
      icon: MessageSquare,
    },

  ];

  // ADMIN LINKS

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
        className="fixed top-5 left-5 z-[60] lg:hidden bg-[#D9FF3F] p-3 rounded-xl"
      >

        <Menu className="text-black" />

      </button>

      {/* Sidebar */}

      <aside
        className={`

        fixed lg:static

        top-0 left-0

        z-50

        w-[290px]

        min-h-screen

        bg-[#0A0A18]

        border-r border-white/10

        flex flex-col

        transition-all duration-300

        ${sidebarOpen
          ? "translate-x-0"
          : "-translate-x-full lg:translate-x-0"}

      `}
      >

        {/* Header */}

        <div className="p-6 border-b border-white/10">

          <div className="flex justify-between items-center">

            <Link
              href="/"
              className="text-white text-3xl font-bold"
            >

              Fitverse

            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white"
            >

              <X />

            </button>

          </div>

        </div>

        {/* Profile */}

        <div className="px-6 py-8 flex flex-col items-center border-b border-white/10">

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

              <UserCircle2
                size={60}
                className="text-[#D9FF3F]"
              />

            </div>

          )}

          <h2 className="text-white text-2xl font-bold mt-5">

            {user?.name}

          </h2>

          <p className="text-gray-400 text-center mt-1">

            {user?.email}

          </p>

          <span className="mt-5 px-5 py-2 rounded-full bg-[#D9FF3F] text-black font-bold capitalize">

            {user?.role}

          </span>

        </div>

        {/* Links */}

        <div className="flex-1 overflow-y-auto px-4 py-6">

          <div className="flex flex-col gap-3">

            {links.map((item) => {

              const Icon = item.icon;

              return (

                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`

                  flex items-center gap-4

                  px-6 py-5

                  rounded-3xl

                  transition-all

                  ${pathname === item.href

                      ? "bg-[#D9FF3F] text-black font-semibold"

                      : "text-gray-300 hover:bg-white/5"}

                `}
                >

                  <Icon size={22} />

                  {item.name}

                </Link>

              );

            })}

          </div>

        </div>

        {/* Logout */}

        <div className="p-6 border-t border-white/10">

          <button
            onClick={handleLogout}
            className="

            w-full

            flex items-center justify-center gap-3

            py-4

            rounded-2xl

            bg-red-500/20

            text-red-400

            font-semibold

            hover:bg-red-500/30

            transition

            cursor-pointer

          "
          >

            <LogOut size={20} />

            Logout

          </button>

        </div>

      </aside>

      {/* Main Content */}

      <main className="flex-1 overflow-x-hidden p-8 lg:p-12">

        {children}

      </main>

    </div>

  );

}