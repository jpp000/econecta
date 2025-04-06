import WorldGreen from "../../assets/world-green.png";

import { Sprout } from "lucide-react";
import { CarrosselVertical } from "../CarrosselVertical/CarrosselVertical";
import { Button } from "../ui/button";

const MissionSection = () => {
  return (
    <section className="bg-white text-green-950 overflow-hidden">
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
            <Sprout className="size-12 inline-block" /> Acreditamos que pequenas
            ações podem fazer uma grande diferença.
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
  );
};

export default MissionSection;
