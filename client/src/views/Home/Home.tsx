import { FeatureCard } from "@/components/SustentableCard/SustentableCard";
import BgSustentable from "../../assets/bg-image.jpg";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div>
      <section
        className="h-screen flex flex-col items-center justify-center text-center text-white bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${BgSustentable})` }}
      >
        <div className="mt-30 mb-50 flex flex-col items-center justify-center text-center z-10">
          <h1 className="text-7xl font-medium max-w-6xl">
            Green solutions and recycling for a sustainable future.
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl">
            From cutting-edge green designs to recycling programs, we're
            dedicated to transforming the world.
          </p>
          <Button className="mt-6 bg-yellow-400 text-black text-md font-medium rounded-full hover:bg-yellow-500 cursor-pointer">
            Get Started →
          </Button>
        </div>

        <section className="px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Reciclagem Inteligente"
              description="Soluções que otimizam o descarte de resíduos, promovendo a economia circular."
              linkText="Donations"
              linkHref="/donations"
            />

            <FeatureCard
              title="Energia Limpa"
              description="Investimos em energia solar e eólica para um futuro mais verde."
              linkText="Explorar"
              linkHref="/energy"
            />

            <FeatureCard
              title="Educação Ambiental"
              description="Capacitação de comunidades para práticas ecológicas no dia a dia."
              linkText="Ver mais"
              linkHref="/education"
            />
          </div>
        </section>
      </section>

      <section className="h-screen flex items-center justify-center bg-white text-green-950">
        <div className="max-w-4xl text-center">
          <h2 className="text-5xl font-bold">About Us</h2>
          <p className="mt-4 text-lg text-gray-300">
            We believe in a sustainable future and work tirelessly to develop
            eco-friendly solutions.
          </p>
        </div>
      </section>

      <section
        className="h-screen relative flex flex-col items-center justify-center text-center text-white bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${BgSustentable})` }}
      >
        <div className="absolute inset-0 bg-green-900/50 backdrop-blur-xl z-0"></div>

        <div className="relative z-10 px-4">
          <h2 className="text-5xl font-bold">Join the Green Revolution</h2>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl">
            Every small action counts! Be part of the movement that changes the
            world.
          </p>
        </div>
      </section>

      <section className="h-screen flex items-center justify-center bg-white text-green-950">
        <div className="max-w-4xl text-center">
          <h2 className="text-5xl font-bold">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-300">
            Want to know more? Get in touch and lets create a better world
            together.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
