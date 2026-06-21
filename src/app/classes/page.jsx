"use client";

import { useEffect, useState } from "react";
import ClassCard from "@/component/ClassCard/ClassCard";

export default function ClassesPage() {

  const [classes, setClasses] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

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

      `http://localhost:5000/classes?page=${page}&limit=6&search=${search}&category=${category}`

    )

      .then((res) => res.json())

      .then((data) => {

        setClasses(data.classes);

        setTotalPages(data.totalPages);

      });

  }, [page, search, category]);

  // Reset to first page when searching/filtering

  useEffect(() => {

    setPage(1);

  }, [search, category]);

  return (

    <section className="min-h-screen bg-[#030312] pt-36 pb-24 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="text-center mb-16">

          <h1 className="text-5xl font-bold text-white">

            Explore Our

            <span className="text-[#D9FF3F]">

              {" "}Fitness Classes

            </span>

          </h1>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">

            Discover expert-led training programs designed

            to help you achieve your fitness goals.

          </p>

        </div>

        {/* Search & Filter */}

        <div className="flex flex-col md:flex-row gap-5 mb-14">

          <input

            type="text"

            placeholder="Search class..."

            value={search}

            onChange={(e) =>

              setSearch(e.target.value)

            }

            className="flex-1 px-6 py-4 rounded-2xl bg-[#0A0A18] border border-white/10 text-white outline-none focus:border-[#D9FF3F]"

          />

          <select

            value={category}

            onChange={(e) =>

              setCategory(e.target.value)

            }

            className="px-6 py-4 rounded-2xl bg-[#0A0A18] border border-white/10 text-white outline-none focus:border-[#D9FF3F]"

          >

            {

              categories.map((cat) => (

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

        {

          classes?.length > 0 ? (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

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

            <div className="text-center py-24">

              <h2 className="text-4xl font-bold text-white">

                No Classes Found

              </h2>

            </div>

          )

        }

        {/* Pagination */}

        {

          totalPages > 1 && (

            <div className="flex justify-center gap-3 mt-16">

              {

                [...Array(totalPages)].map((_, index) => (

                  <button

                    key={index}

                    onClick={() =>

                      setPage(index + 1)

                    }

                    className={`

                    w-12 h-12 rounded-full font-semibold transition

                    ${

                      page === index + 1

                      ? "bg-[#D9FF3F] text-black"

                      : "bg-[#0A0A18] text-white border border-white/10 hover:border-[#D9FF3F]"

                    }

                    `}

                  >

                    {index + 1}

                  </button>

                ))

              }

            </div>

          )

        }

      </div>

    </section>

  );

}