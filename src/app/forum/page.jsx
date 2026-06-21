"use client";

import { useEffect, useState } from "react";

export default function ForumPage() {

  const [forums, setForums] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {

    fetch(

      `http://localhost:5000/forums?page=${page}&limit=6`

    )

      .then(res => res.json())

      .then(data => {

        setForums(data.forums);

        setTotalPages(data.totalPages);

      });

  }, [page]);

  return (

    <section className="min-h-screen bg-[#030312] pt-36 pb-20 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <h1 className="text-5xl font-bold text-white">

            Community

            <span className="text-[#D9FF3F]">

              {" "}Forum

            </span>

          </h1>

          <p className="text-gray-400 mt-5">

            Explore posts from trainers and admins.

          </p>

        </div>

        {

          forums.length === 0 ? (

            <div className="text-center py-24 text-white">

              No Forum Posts Yet

            </div>

          ) : (

            <>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {

                  forums.map((item) => (

                    <div

                      key={item._id}

                      className="bg-[#0A0A18] rounded-[30px] overflow-hidden border border-white/10"

                    >

                      <img

                        src={item.image}

                        alt={item.title}

                        className="w-full h-[250px] object-cover"

                      />

                      <div className="p-7">

                        <p className="text-[#D9FF3F] text-sm font-semibold">

                          By {item.author}

                        </p>

                        <h2 className="text-white text-3xl font-bold mt-3">

                          {item.title}

                        </h2>

                        <p className="text-gray-400 mt-5 leading-8">

                          {

                            item.description.slice(0, 120)

                          }...

                        </p>

                        <a

                          href={`/forum/${item._id}`}

                          className="inline-block mt-8 px-7 py-3 rounded-xl bg-[#D9FF3F] text-black font-semibold"

                        >

                          Read More

                        </a>

                      </div>

                    </div>

                  ))

                }

              </div>

              <div className="flex justify-center gap-3 mt-16">

                {

                  [...Array(totalPages)].map((_, index) => (

                    <button

                      key={index}

                      onClick={() =>

                        setPage(index + 1)

                      }

                      className={`

                        w-12 h-12 rounded-full font-semibold

                        ${

                          page === index + 1

                          ? "bg-[#D9FF3F] text-black"

                          : "bg-[#0A0A18] text-white border border-white/10"

                        }

                      `}

                    >

                      {index + 1}

                    </button>

                  ))

                }

              </div>

            </>

          )

        }

      </div>

    </section>

  );

}