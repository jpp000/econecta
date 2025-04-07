import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import { Button } from "../ui/button";
import { FeatureCard } from "../SustentableCard/SustentableCard";
import { useEffect } from "react";
import { useSectionInView } from "@/hooks/useSectionInView";
import { useNavbarStore } from "@/store/useNavbarStore";

import Image1 from "@/assets/card-tree.jpg";
import { Quote } from "lucide-react";

const slides = [
  {
    image: Image1,
    text: "Leading the Way in Eco-Friendly Innovation",
    desc: "At GreenPark, we are committed to pioneering solutions that reduce environmental impact and promote sustainable living.",
  },
  {
    image: Image1,
    text: "Empowering Communities",
    desc: "Our mission is to inspire and empower individuals to make environmentally responsible decisions.",
  },
  {
    image: Image1,
    text: "Smart Energy for All",
    desc: "We deliver smart solar solutions that make clean energy accessible to everyone.",
  },
  {
    image: Image1,
    text: "Sustainable Design",
    desc: "Our innovative designs are at the forefront of eco-conscious development.",
  },
];

const groupedSlides = slides.reduce((acc, _, i) => {
  if (i % 2 === 0) acc.push([slides[i], slides[i + 1]]);
  return acc;
}, [] as [(typeof slides)[0], (typeof slides)[0]][]);

const AboutUsSection = () => {
  const { setVariant } = useNavbarStore();
  const { ref, isInView } = useSectionInView(0.3);

  useEffect(() => {
    isInView ? setVariant("dark") : setVariant("light");
  }, [isInView, setVariant]);

  return (
    <>
      <section
        ref={ref}
        className="h-[90vh] flex flex-col px-10 text-white bg-[#1E3A3A] bg-cover bg-center relative"
      >
        <div className="w-full flex justify-around mt-20">
          <h1 className="max-w-xl text-6xl font-bold leading-tight">
            Green <span className="text-yellow-300">solutions</span>
            <br />
            for a sustainable future.
          </h1>
          <div>
            <p className="mt-6 text-xl max-w-xl leading-8">
              At GreenPark, our mission is to lead the way in sustainability
              through a range of innovative solutions designed to protect our
              planet.
            </p>
            <Button className="mt-8 bg-[#ece94c] text-black text-lg font-semibold rounded-full p-8 hover:bg-[#ece94c]/90 cursor-pointer">
              Our Services
            </Button>
          </div>
        </div>

        <section className="px-8 mt-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section className="h-[90vh] bg-white">
        <div className="flex justify-between items-center px-10 pt-20 pb-10">
          <h2 className="text-5xl font-semibold text-green-950">How we help</h2>
        </div>

        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 3000 })]}
          className="w-full overflow-hidden"
        >
          <CarouselContent>
            {groupedSlides.map(([left, right], index) => (
              <CarouselItem key={index}>
                <div className="flex justify-between gap-16 px-10 pb-20">
                  <div className="flex flex-col">
                    <div className="relative w-[500px] h-[400px] rounded-xl overflow-hidden">
                      <img
                        src={left.image}
                        alt={left.text}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="mt-4 max-w-[500px] text-gray-700">
                      {left.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-center w-[300px]">
                    <p className="text-4xl text-green-950 text-center">
                      <Quote className="size-10 bg-green-900/60 p-2 rounded-full text-white ml-3 mb-1" />
                      {left.text}
                    </p>
                  </div>

                  <div className="flex flex-col items-start mt-20">
                    <div className="w-[500px] h-[400px] rounded-xl overflow-hidden">
                      <img
                        src={right.image}
                        alt={right.text}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="mt-4 max-w-[500px] text-gray-700">
                      {right.desc}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </>
  );
};

export default AboutUsSection;
