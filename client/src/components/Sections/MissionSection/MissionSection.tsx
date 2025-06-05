import WorldGreen from "../../../assets/world-green.png";

import { Sprout } from "lucide-react";
import { CarrosselVertical } from "../../CarrosselVertical/CarrosselVertical";
import PartnerLogosCarousel from "../../PartnerLogosCarousel/PartnerLogosCarousel";
import { useEffect } from "react";
import { useNavbarStore } from "@/store/useNavbarStore";

import { useSectionInView } from "@/hooks/useSectionInView";
import { Link } from "react-router-dom";

const MissionSection = () => {
  const { setVariant } = useNavbarStore();
  const { ref, isInView } = useSectionInView(0.3);

  useEffect(() => {
    if (isInView) {
      setVariant("transparent");
    }
  }, [isInView, setVariant]);
  
  return (
    <section ref={ref} className="bg-white text-green-950 overflow-hidden">
      <div className="relative h-screen flex items-center justify-center">
        <img
          src={WorldGreen}
          alt="Ilustração de sustentabilidade"
          className="absolute top-10 left-10 w-70"
        />
        <img
          src={WorldGreen}
          alt="Ilustração de sustentabilidade"
          className="absolute top-10 right-10 w-70"
        />
        <img
          src={WorldGreen}
          alt="Ilustração de sustentabilidade"
          className="absolute bottom-10 left-10 w-70"
        />
        <img
          src={WorldGreen}
          alt="Ilustração de sustentabilidade"
          className="absolute bottom-10 right-10 w-70"
        />
        <div className="h-full flex flex-col items-center justify-center">
          <h2 className="text-5xl max-w-5xl text-center">
            Plataforma BRASFI: Centralizando conhecimento para um futuro sustentável.
            <Sprout className="size-12 inline-block" /> Promovendo finanças e investimentos responsáveis.
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-sm text-center">
            Acesse conteúdos exclusivos, conecte-se com especialistas e participe de eventos transformadores.
          </p>
          <div className="mt-8">
            <Link to={'/chats'} className="bg-[#ece94c] text-black text-md font-medium rounded-full hover:bg-[#ece94c]/90 px-4 py-2 cursor-pointer">
              Conheça a Plataforma
            </Link>
          </div>
        </div>
      </div>

      <div className="h-[200px]">
        <h2 className="text-4xl text-green-950 m-10 text-center">
          Parceiros que fazem a diferença
        </h2>

        <PartnerLogosCarousel />
      </div>

      <div className="m-20 h-min-screen">
        {/* <div className="relative flex justify-around bg-green-100/30 px-10 py-6 rounded-lg shadow-lg gap-16">
          <div className="flex flex-col gap-8 w-1/2 items-start">
            <h3 className="text-6xl font-semibold">
              Capacitando profissionais para liderar a transformação sustentável.
            </h3>
            <p className="mt-2 text-gray-500 max-w-130 font-light leading-7">
              A BRASFI oferece conteúdos exclusivos, como cursos e webinars, para fomentar o conhecimento em finanças sustentáveis e inovação.
            </p>
          </div>

          <CarrosselVertical />
        </div>
        <div className="relative flex justify-around bg-green-100/30 px-10 py-6 rounded-lg shadow-lg gap-16 mt-10">
          <div className="flex flex-col gap-8 w-1/2 items-start">
            <h3 className="text-6xl font-semibold">
              Conectando pessoas e organizações para um impacto positivo.
            </h3>
            <p className="mt-2 text-gray-500 max-w-130 font-light leading-7">
              Promovemos a colaboração entre membros e parceiros para criar soluções inovadoras no mercado financeiro sustentável.
            </p>
          </div>

          <CarrosselVertical />
        </div> */}
        <div className="relative flex justify-around bg-green-100/30 px-10 py-6 rounded-lg shadow-lg gap-16 mt-10">
          <div className="flex flex-col gap-8 w-1/2 items-start">
            <h3 className="text-6xl font-semibold">
              Inspirando mudanças através de conhecimento e engajamento.
            </h3>
            <p className="mt-2 text-gray-500 max-w-130 font-light leading-7">
              Nosso objetivo é criar uma comunidade engajada que compartilhe experiências e boas práticas em sustentabilidade.
            </p>
          </div>

          <CarrosselVertical />
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
