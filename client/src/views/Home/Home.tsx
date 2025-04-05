import { FeatureCard } from "@/components/SustentableCard/SustentableCard";
import BgSustentable from "../../assets/bg-image.jpg";
import WorldGreen from "../../assets/world-green.png";
import CardTree from "@/assets/card-tree.jpg";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Facebook,
  Hop,
  Linkedin,
  Loader,
  Sprout,
  Twitter,
  Youtube,
} from "lucide-react";
import { CarrosselVertical } from "@/components/CarrosselVertical/CarrosselVertical";
import { Input } from "@/components/ui/input";
import { InfiniteCarousel } from "@/components/InfiniteCarousel/InfiniteCarousel";

const Home = () => {
  const professionals = [
    {
      name: "John Doe",
      position: "CEO",
      image: CardTree,
    },
    {
      name: "Jane Smith",
      position: "CTO",
      image: CardTree,
    },
    {
      name: "Alice Johnson",
      position: "CFO",
      image: CardTree,
    },
  ];

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

        <div className="m-20 h-min-screen">
          <div className="relative flex justify-around bg-green-100/30 px-10 py-6 rounded-lg shadow-lg gap-16">
            <div className="flex flex-col gap-8 w-1/2 items-start">
              <h3 className="text-6xl font-semibold">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </h3>
              <p className="mt-2 text-gray-500 max-w-130 font-light leading-7">
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

      <section className="min-h-screen flex flex-col items-center bg-green-100/30 text-green-950">
        <div className="max-w-4xl text-center mt-30">
          <h2 className="text-5xl font-semibold">
            Our teams the <Hop className="size-12 inline-block" /> driving force
            behind our mission to create a more sustainable world
            (Profissionais)
          </h2>
        </div>

        <div className="m-30 flex justify-center items-center">
          <InfiniteCarousel>
            {professionals.map((professional, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-4 mx-4"
              >
                <img
                  src={professional.image}
                  alt={professional.name}
                  className="rounded-full w-40 h-40 object-cover shadow-lg"
                />
                <h3 className="text-xl font-semibold">{professional.name}</h3>
                <p className="text-gray-500">{professional.position}</p>
              </div>
            ))}
          </InfiniteCarousel>
        </div>

        <div className="m-10 w-full flex justify-center">
          <div className="flex w-9/10 bg-green-900/60 p-10 rounded-lg shadow-lg">
            <div className="flex flex-col gap-8 items-start text-white">
              <h3 className="text-6xl font-semibold max-w-full">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </h3>
              <p className="mt-2 max-w-100 font-light leading-7">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
                natus vero tempore hic nesciunt quisquam, qui dolorum laboriosam
                perferendis voluptas.
              </p>

              <Button className="bg-white p-6 text-black text-md font-medium rounded-full hover:bg-gray-200 cursor-pointer">
                Lets Get Started
              </Button>

              <div className="flex gap-2">
                <div className="flex items-center gap-2 bg-gray-200/20 p-4 text-white text-md font-medium rounded-full hover:bg-gray-200/40 transition-all">
                  <Loader className="size-5 inline-block" /> Be part of the
                  change
                </div>
                <div className="flex items-center gap-2 bg-gray-200/20 p-4 text-white text-md font-medium rounded-full hover:bg-gray-200/40 transition-all">
                  <Loader className="size-5 inline-block" /> Join the Green
                  Revolution
                </div>
                <div className="flex items-center gap-2 bg-gray-200/20 p-4 text-white text-md font-medium rounded-full hover:bg-gray-200/40 transition-all">
                  <Loader className="size-5 inline-block" /> Stay Connected!
                </div>
              </div>
            </div>

            <div className="w-1/2 flex justify-end">
              <img
                src={CardTree}
                alt="Imagem de árvore"
                className="w-85 rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="w-full p-14 flex justify-around mb-10">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-medium">
              Subscribe to our newsletter
            </h3>
            <p className="text-sm text-gray-500 max-w-80 font-light leading-7">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              voluptatem.
            </p>

            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-full placeholder:text-gray-500"
              />
              <ArrowRight className="size-5 absolute top-1/4 right-4 cursor-pointer" />
            </div>

            <div className="flex gap-4 mt-4">
              <Button
                variant="ghost"
                className="bg-[#F3F5F4] p-3 rounded-full hover:bg-[#D8EDE1] transition-all"
              >
                <Youtube className="size-5 text-black" />
              </Button>
              <Button
                variant="ghost"
                className="bg-[#F3F5F4] p-3 rounded-full hover:bg-[#D8EDE1] transition-all"
              >
                <Facebook className="size-5 text-black" />
              </Button>
              <Button
                variant="ghost"
                className="bg-[#F3F5F4] p-3 rounded-full hover:bg-[#D8EDE1] transition-all"
              >
                <Twitter className="size-5 text-black" />
              </Button>
              <Button
                variant="ghost"
                className="bg-[#F3F5F4] p-3 rounded-full hover:bg-[#D8EDE1] transition-all"
              >
                <Linkedin className="size-5 text-black" />
              </Button>
            </div>
          </div>

          <div className="flex gap-30 text-gray-500 text-lg">
            <div className="flex flex-col gap-4">
              <h3 className="text-green-900/80 text-2xl mb-5">Service</h3>
              <p>About Us</p>
              <p>About Us</p>
              <p>About Us</p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-green-900/80 text-2xl mb-5">Service</h3>
              <p>About Us</p>
              <p>About Us</p>
              <p>About Us</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
