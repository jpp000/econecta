import { FeatureCard } from "@/components/SustentableCard/SustentableCard";
import BgSustentable from "../../assets/bg-image.jpg";
import WorldGreen from "../../assets/world-green.png";
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";
import { CarrosselVertical } from "@/components/CarrosselVertical/CarrosselVertical";

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              title="Reciclagem Inteligente"
              description="Soluções que otimizam o descarte de resíduos, promovendo a economia circular."
            />

            <FeatureCard
              title="Energia Limpa"
              description="Investimos em energia solar e eólica para um futuro mais verde."
            />

            <FeatureCard
              title="Educação Ambiental"
              description="Capacitação de comunidades para práticas ecológicas no dia a dia."
            />
          </div>
        </section>
      </section>

      <section className="bg-white text-green-950 overflow-hidden">
        {/* Imagens decorativas nos cantos */}
        <div className="relative h-screen flex items-center justify-center">
          <img
            src={WorldGreen}
            alt="Folha decorativa"
            className="absolute top-10 left-10 w-70"
          />
          <img
            src={WorldGreen}
            alt="Folha decorativa"
            className="absolute top-10 right-10 w-70"
          />
          <img
            src={WorldGreen}
            alt="Folha decorativa"
            className="absolute bottom-10 left-10 w-70"
          />
          <img
            src={WorldGreen}
            alt="Folha decorativa"
            className="absolute bottom-10 right-10 w-70"
          />
          <div className="h-full flex flex-col items-center justify-center">
            <h2 className="text-5xl max-w-5xl text-center">
              Junte-se a nós na luta por um futuro mais verde e sustentável.{" "}
              <Sprout className="size-12 inline-block" /> Acreditamos que
              pequenas ações podem fazer uma grande diferença.
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-sm text-center">
              Cada passo conta na construção de um mundo mais sustentável.
            </p>
            <div className="mt-8">
              <Button className="bg-yellow-400 text-black text-md font-medium rounded-full hover:bg-yellow-500 cursor-pointer">
                Sobre Nós
              </Button>
            </div>
          </div>
        </div>

        <div className="m-20">
          <div className="relative flex justify-around bg-green-100/30 px-10 py-6 rounded-lg shadow-lg h-[700px] gap-16">
            <div className="flex flex-col gap-8 w-1/2 items-start">
              <h3 className="text-6xl font-semibold max-w-100">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </h3>
              <p className="mt-2 text-gray-500 max-w-100 font-light leading-7">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
                natus vero tempore hic nesciunt quisquam, qui dolorum laboriosam
                perferendis voluptas.
              </p>
            </div>

            <CarrosselVertical />
          </div>
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

      <section className="h-screen flex items-center justify-center bg-green-100/30 text-green-950">
        <div className="max-w-4xl text-center">
          <h2 className="text-5xl font-bold">Contact Us</h2>
          <p className="mt-4 text-lg ">
            Want to know more? Get in touch and lets create a better world
            together.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
