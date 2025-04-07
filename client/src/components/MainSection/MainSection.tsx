import { Button } from "../ui/button";
import { FeatureCard } from "../SustentableCard/SustentableCard";
import { useNavbarStore } from "@/store/useNavbarStore";
import { useEffect } from "react";
import { useSectionInView } from "@/hooks/useSectionInView";

const MainSection = () => {
  const { setVariant } = useNavbarStore();
  const { ref, isInView } = useSectionInView();

  useEffect(() => {
    if (isInView) {
      setVariant("dark");
    }
  }, [isInView, setVariant]);

  return (
    <section ref={ref}
      className="h-screen flex flex-col items-center justify-center text-center text-white bg-[#1E3A3A] bg-fixed bg-cover bg-center"
    >
      <div className="mt-30 mb-50 flex flex-col items-center justify-center text-center z-10">
        <h1 className="text-7xl font-medium max-w-6xl">
          Green solutions and recycling for a sustainable future.
        </h1>
        <p className="mt-4 text-lg text-gray-200 max-w-2xl">
          From cutting-edge green designs to recycling programs, we're dedicated
          to transforming the world.
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
  );
};

export default MainSection;
