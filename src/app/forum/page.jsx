async function getForums() {

  try {

    const res = await fetch(
      "http://localhost:5000/forums",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {

      return [];

    }

    return await res.json();

  } catch (error) {

    console.log(error);

    return [];

  }

}

export default async function ForumPage() {

  const forums = await getForums();

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

        {forums.length === 0 ? (

          <div className="text-center py-24 text-white">

            No Forum Posts Yet

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {forums.map((item) => (

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

                    {item.description}

                  </p>

                  <a

                    href={`/forum/${item._id}`}

                    className="inline-block mt-8 px-7 py-3 rounded-xl bg-[#D9FF3F] text-black font-semibold"

                  >

                    Read More

                  </a>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>

  );

}