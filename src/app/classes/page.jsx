import ClassCard from "@/component/ClassCard/ClassCard";

async function getClasses() {
  const res = await fetch("http://localhost:5000/classes", {
    cache: "no-store",

  });

  if (!res.ok) {
    throw new Error("Failed to fetch classes");
  }

  return res.json();
}

export default async function ClassesPage() {
  const classes = await getClasses();
      console.log(classes)

  return (
    <section className="min-h-screen bg-[#030312] pt-36 pb-20 px-6">
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
            to help you achieve your goals.
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {classes.length > 0 ? (

            classes.map((item) => (

              <ClassCard
                key={item._id}
                image={item.image}
                title={item.title}
                category={item.category}
                level={item.level}
                price={item.price}
                duration={item.duration}
                students={item.students}
                description={item.description}
              />

            ))

          ) : (

            <div className="col-span-full text-center py-24">

              <h2 className="text-4xl font-bold text-white">
                No Classes Available
              </h2>

              <p className="text-gray-400 mt-4 text-lg">
                New fitness classes will be added soon.
              </p>

            </div>

          )}

        </div>

      </div>
    </section>
  );
}