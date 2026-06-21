"use client";

import { useEffect, useState } from "react";
import ClassCard from "@/component/ClassCard/ClassCard";

export default function ClassesPage() {

  const [classes, setClasses] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const categories = [

    "All",

    "Yoga",

    "Pilates",

    "Cycling",

    "Fitness",

    "HIIT",

    "Dance",

    "Boxing",

    "Strength",

  ];

  useEffect(() => {

    fetch(

      `http://localhost:5000/classes?search=${search}&category=${category}`

    )

      .then(res => res.json())

      .then(data => setClasses(data));

  }, [search, category]);

  return (

    <section className="min-h-screen bg-[#030312] pt-36 pb-20 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <h1 className="text-5xl font-bold text-white">

            Explore Our

            <span className="text-[#D9FF3F]">

              {" "}Fitness Classes

            </span>

          </h1>

        </div>

        {/* Search + Filter */}

        <div className="flex flex-col md:flex-row gap-5 mb-14">

          <input

            type="text"

            placeholder="Search by class name..."

            value={search}

            onChange={(e) =>

              setSearch(e.target.value)

            }

            className="flex-1 px-6 py-4 rounded-2xl bg-[#0A0A18] border border-white/10 text-white outline-none"

          />

          <select

            value={category}

            onChange={(e) =>

              setCategory(e.target.value)

            }

            className="px-6 py-4 rounded-2xl bg-[#0A0A18] border border-white/10 text-white"

          >

            {

              categories.map(cat => (

                <option

                  key={cat}

                  value={cat}

                >

                  {cat}

                </option>

              ))

            }

          </select>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {

            classes.length > 0 ? (

              classes.map(item => (

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

            ) : (

              <div className="col-span-full text-center py-20">

                <h2 className="text-4xl text-white font-bold">

                  No Classes Found

                </h2>

              </div>

            )

          }

        </div>

      </div>

    </section>

  );

}