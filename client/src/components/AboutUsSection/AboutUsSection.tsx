import BgSecondary from "@/assets/bg-secondary.jpg";
import { Button } from "../ui/button";
import { FeatureCard } from "../SustentableCard/SustentableCard";

const AboutUsSection = () => {
  return (
    <>
      <section
        className="h-[90vh] flex flex-col px-10 text-white bg-cover bg-center relative"
        style={{ backgroundImage: `url(${BgSecondary})` }}
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
            <Button className="mt-8 bg-yellow-400 text-black text-lg font-semibold rounded-full p-8 hover:bg-yellow-500">
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
      <section className="h-[70vh] bg-white"></section>
    </>
  );
};

export default AboutUsSection;
