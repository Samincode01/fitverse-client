"use client";

import { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";
import { toast } from "react-toastify";

export default function TransactionsPage() {

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch("http://localhost:5000/transactions")

      .then((res) => res.json())

      .then((data) => {

        setTransactions(data);

        setLoading(false);

      })

      .catch((error) => {

        console.log(error);

        toast.error("Failed to load transactions");

        setLoading(false);

      });

  }, []);

  if (loading) {

    return (

      <div className="min-h-screen bg-[#030312] flex items-center justify-center">

        <h1 className="text-white text-3xl font-bold">

          Loading...

        </h1>

      </div>

    );

  }

  return (

    <section className="min-h-screen bg-[#030312] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="mb-12">

          <h1 className="text-5xl font-bold text-white">

            Transaction History

          </h1>

          <p className="text-gray-400 mt-4">

            View all Stripe payment records across the platform.

          </p>

        </div>

        {/* Summary Card */}

        <div className="mb-10">

          <div className="w-fit rounded-[30px] border border-white/10 bg-white/[0.03] p-8">

            <div className="flex items-center gap-5">

              <div className="w-16 h-16 rounded-full bg-[#D9FF3F]/10 flex items-center justify-center">

                <CreditCard

                  className="text-[#D9FF3F]"

                  size={30}

                />

              </div>

              <div>

                <p className="text-gray-400">

                  Total Transactions

                </p>

                <h1 className="text-white text-5xl font-bold mt-2">

                  {transactions.length}

                </h1>

              </div>

            </div>

          </div>

        </div>

        {/* Table */}

        <div className="overflow-x-auto rounded-[30px] border border-white/10 bg-white/[0.03]">

          <table className="w-full">

            <thead>

              <tr className="border-b border-white/10 bg-white/[0.02]">

                <th className="px-8 py-6 text-left text-[#D9FF3F] font-bold">

                  User Email

                </th>

                <th className="px-8 py-6 text-left text-[#D9FF3F] font-bold">

                  Class

                </th>

                <th className="px-8 py-6 text-left text-[#D9FF3F] font-bold">

                  Amount

                </th>

                <th className="px-8 py-6 text-left text-[#D9FF3F] font-bold">

                  Date

                </th>

                <th className="px-8 py-6 text-left text-[#D9FF3F] font-bold">

                  Transaction ID

                </th>

              </tr>

            </thead>

            <tbody>

              {

                transactions.length === 0 ? (

                  <tr>

                    <td

                      colSpan="5"

                      className="text-center py-20 text-gray-400"

                    >

                      No Transactions Found

                    </td>

                  </tr>

                ) : (

                  transactions.map((item) => (

                    <tr

                      key={item._id}

                      className="border-b border-white/5 hover:bg-white/[0.03] transition"

                    >

                      <td className="px-8 py-6 text-white">

                        {item.userEmail}

                      </td>

                      <td className="px-8 py-6 text-white">

                        {item.classTitle}

                      </td>

                      <td className="px-8 py-6">

                        <span className="px-4 py-2 rounded-full bg-[#D9FF3F]/10 text-[#D9FF3F] font-semibold">

                          ${item.price}

                        </span>

                      </td>

                      <td className="px-8 py-6 text-gray-300">

                        {

                          new Date(

                            item.createdAt

                          ).toLocaleDateString()

                        }

                      </td>

                      <td className="px-8 py-6">

                        <span className="text-gray-400 text-sm break-all">

                          {item.paymentId}

                        </span>

                      </td>

                    </tr>

                  ))

                )

              }

            </tbody>

          </table>

        </div>

      </div>

    </section>

  );

}