"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [

  {
    id: 1,
    name: "Sarah Johnson",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300",
    rating: 5,
    review:
      "Fitverse completely changed my fitness journey. The trainers are amazing and the classes are incredibly motivating.",
  },

  {
    id: 2,
    name: "Michael Brown",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300",
    rating: 5,
    review:
      "I joined for strength training and ended up loving every class. Great environment and excellent instructors.",
  },

  {
    id: 3,
    name: "Emily Davis",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300",
    rating: 5,
    review:
      "The yoga and meditation sessions helped me improve both physically and mentally. Highly recommended.",
  },

  {
    id: 4,
    name: "David Wilson",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300",
    rating: 5,
    review:
      "The trainers genuinely care about your progress. I feel stronger, healthier and more confident every day.",
  },

  {
    id: 5,
    name: "Sophia Miller",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300",
    rating: 5,
    review:
      "From Zumba to Yoga, every class is energetic and enjoyable. The atmosphere at Fitverse is absolutely amazing.",
  },

  {
    id: 6,
    name: "James Anderson",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=300",
    rating: 5,
    review:
      "I never imagined fitness could be this enjoyable. Fitverse keeps me motivated and excited for every session.",
  },

];

export default function UserReviews() {

  return (

    <section className="bg-[#030312] py-28 px-6">

      <div className="max-w-7xl mx-auto">

        <motion.div

          initial={{ opacity: 0, y: 40 }}

          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.8 }}

          viewport={{ once: true }}

          className="text-center mb-20"

        >

          <p className="text-[#D9FF3F] uppercase tracking-[0.3em] font-semibold">

            Testimonials

          </p>

          <h2 className="text-5xl md:text-6xl font-bold text-white mt-5">

            What Our

            <span className="text-[#D9FF3F]">

              {" "}Members Say

            </span>

          </h2>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">

            Real stories from our community who transformed their fitness journey with Fitverse.

          </p>

        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {

            reviews.map((item) => (

              <motion.div

                key={item.id}

                initial={{ opacity: 0, y: 50 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true }}

                transition={{

                  duration: 0.6,

                  delay: item.id * 0.1,

                }}

                whileHover={{

                  y: -10,

                  scale: 1.02,

                }}

                className="rounded-[35px] bg-white/[0.03] border border-white/10 p-8 hover:border-[#D9FF3F]/30 transition-all duration-300"

              >

                <div className="flex items-center gap-5">

                  <motion.div

                    whileHover={{

                      scale: 1.08,

                      rotate: 3,

                    }}

                  >

                    <Image

                      src={item.image}

                      alt={item.name}

                      width={75}

                      height={75}

                      className="rounded-full object-cover border-2 border-[#D9FF3F]"

                    />

                  </motion.div>

                  <div>

                    <h3 className="text-white text-xl font-bold">

                      {item.name}

                    </h3>

                    <div className="flex gap-1 mt-2">

                      {

                        [...Array(item.rating)].map((_, i) => (

                          <Star

                            key={i}

                            size={18}

                            fill="#D9FF3F"

                            className="text-[#D9FF3F]"

                          />

                        ))

                      }

                    </div>

                  </div>

                </div>

                <p className="text-gray-400 leading-8 mt-8">

                  "{item.review}"

                </p>

              </motion.div>

            ))

          }

        </div>

      </div>

    </section>

  );

}