import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import { Button } from "../../ui/button";
import { useCallback, useEffect } from "react";
import { useSectionInView } from "@/hooks/useSectionInView";
import { useNavbarStore } from "@/store/useNavbarStore";
import { useNavigate } from "react-router-dom";

import Image1 from "@/assets/card-tree.jpg";
import { Quote } from "lucide-react";

const slides = [
  {
    image: Image1,
    text: "Educação Sustentável para um Futuro Melhor",
    desc: "Capacitamos profissionais com cursos e treinamentos que promovem práticas financeiras responsáveis e sustentáveis. Nosso objetivo é formar líderes que transformem o mercado financeiro com inovação e ética.",
  },
  {
    image: Image1,
    text: "Conexão e Colaboração Global",
    desc: "Facilitamos a troca de ideias e experiências entre especialistas e organizações do setor financeiro. Nossa rede global promove parcerias estratégicas para impulsionar a inovação e a sustentabilidade.",
  },
  {
    image: Image1,
    text: "Projetos de Impacto Positivo e Real",
    desc: "Apoiamos iniciativas que geram mudanças reais e sustentáveis no mercado financeiro. Trabalhamos para criar soluções que beneficiem tanto o meio ambiente quanto a sociedade.",
  },
  {
    image: Image1,
    text: "Inovação Sustentável como Pilar do Futuro",
    desc: "Integramos tecnologia e sustentabilidade para transformar o mercado financeiro. Nossas soluções inovadoras são projetadas para atender às demandas de um mundo em constante evolução.",
  },
];

const groupedSlides = slides.reduce((acc, _, i) => {
  if (i % 2 === 0) acc.push([slides[i], slides[i + 1]]);
  return acc;
}, [] as [(typeof slides)[0], (typeof slides)[0]][]);

const AboutUsSection = () => {
  const { setVariant } = useNavbarStore();
  const { ref, isInView } = useSectionInView(0.3);
  const navigate = useNavigate();

  const navigateToApp = useCallback(() => {
    navigate("/chats");
  }, [navigate]);

  useEffect(() => {
    isInView ? setVariant("dark") : setVariant("light");
  }, [isInView, setVariant]);

  return (
    <>
      <section
        ref={ref}
        className="h-[50vh] flex flex-col px-10 text-white bg-[#1E3A3A] bg-cover bg-center relative"
      >
        <div className="w-full flex justify-around mt-20">
          <h1 className="max-w-xl text-6xl font-bold leading-tight">
            BRASFI: <span className="text-yellow-300">Inovação Sustentável</span>
            <br />
            para um futuro responsável.
          </h1>
          <div>
            <p className="mt-6 text-xl max-w-xl leading-8">
              Nossa missão é liderar o caminho em finanças sustentáveis, promovendo soluções inovadoras para proteger o planeta.
            </p>
            <Button
              onClick={navigateToApp}
              className="mt-8 bg-[#ece94c] text-black text-lg font-semibold rounded-full p-6 hover:bg-[#ece94c]/90 cursor-pointer"
            >
              Conheça Nossos Serviços
            </Button>
          </div>
        </div>
      </section>
      <section className="h-[80vh] bg-white">
        <div className="flex justify-between items-center px-10 pt-20 pb-10">
          <h2 className="text-5xl font-semibold text-green-950">Como Contribuímos</h2>
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
                    <p className="text-3xl text-green-950 text-center">
                      <Quote className="size-10 bg-green-900/60 p-2 rounded-full text-white ml-3 mb-1" />
                      {left.text}
                    </p>
                  </div>

                  {right && (
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
                  )}
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
