import Link from "next/link";
import ClassCard from "@/component/ClassCard/ClassCard";

async function getFeaturedClasses() {

  const res = await fetch(

    "http://localhost:5000/classes?page=1&limit=4",

    {

      cache: "no-store",

    }

  );

  if (!res.ok) {

    return [];

  }

  const data = await res.json();

  return data.classes;

}

export default async function FeaturedClasses() {

  const classes = await getFeaturedClasses();

  return (

    <section className="bg-[#030312] py-24 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row items-center justify-between mb-16">

          <div>

            <p className="text-[#D9FF3F] font-semibold uppercase tracking-widest mb-3">

              Featured Programs

            </p>

            <h2 className="text-5xl font-bold text-white">

              Featured

              <span className="text-[#D9FF3F]">

                {" "}Classes

              </span>

            </h2>

            <p className="text-gray-400 mt-5 max-w-2xl">

              Discover our most popular fitness programs designed to help you transform your body and achieve your goals.

            </p>

          </div>

          <Link

            href="/classes"

            className="mt-8 md:mt-0 px-8 py-4 rounded-full bg-[#D9FF3F] text-black font-bold transition-all duration-300 hover:scale-105 hover:bg-[#c9ef39]"

          >

            View More

          </Link>

        </div>

        {

          classes.length > 0 ? (

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

              {

                classes.map((item) => (

                  <ClassCard

                    key={item._id}

                    id={item._id}

                    image={item.image}

                    title={item.title}

                    category={item.category}

                    level={item.level}

                    price={item.price}

                    students={item.students}

                    description={item.description}

                  />

                ))

              }

            </div>

          ) : (

            <div className="text-center py-20">

              <h3 className="text-3xl font-bold text-white">

                No Featured Classes Available

              </h3>

              <p className="text-gray-400 mt-4">

                New classes will be available soon.

              </p>

            </div>

          )

        }

      </div>

    </section>

  );

}