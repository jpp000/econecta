import CardTree from "@/assets/card-tree.jpg";
import { ArrowRight, Facebook, Hop, Linkedin, Loader, Twitter, Youtube } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { InfiniteCarousel } from "../../InfiniteCarousel/InfiniteCarousel";
import { useCallback, useEffect } from "react";
import { useSectionInView } from "@/hooks/useSectionInView";
import { useNavbarStore } from "@/store/useNavbarStore";
import { useNavigate } from "react-router-dom";

interface Professional {
  name: string;
  position: string;
  image: string;
}

interface EnterpriseSectionProps {
  professionals: Professional[];
}

const EnterpriseSection = ({ professionals }: EnterpriseSectionProps) => {
  const { setVariant } = useNavbarStore();
  const { ref, isInView } = useSectionInView(0.4);

  const navigate = useNavigate();

  const navigateToApp = useCallback(() => {
    navigate("/chats");
  }, [navigate]);

  useEffect(() => {
    if (isInView) {
      setVariant("transparent");
    }
  }, [isInView, setVariant]);

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center bg-green-100/30 text-green-950">
      <div className="max-w-4xl text-center mt-30">
        <h2 className="text-5xl font-semibold">
          Nossa equipe é o <Hop className="size-12 inline-block" /> motor que impulsiona nossa missão de transformar o mercado financeiro sustentável.
        </h2>
      </div>

      <div className="m-30 flex justify-center items-center">
        <InfiniteCarousel>
          {professionals.map((professional, index) => (
            <div key={index} className="flex flex-col items-center gap-4 mx-4">
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
              Junte-se a nós para construir um futuro mais sustentável.
            </h3>
            <p className="mt-2 max-w-100 font-light leading-7">
              A BRASFI conecta profissionais e organizações para promover inovação, colaboração e impacto positivo no mercado financeiro.
            </p>

            <Button onClick={navigateToApp} className="bg-white p-6 text-black text-md font-medium rounded-full hover:bg-gray-200 cursor-pointer">
              Faça Parte da Mudança
            </Button>

            <div className="flex gap-2">
              <div className="flex items-center gap-2 bg-gray-200/20 p-4 text-white text-md font-medium rounded-full hover:bg-gray-200/40 transition-all">
                <Loader className="size-5 inline-block" /> Seja um Voluntário
              </div>
              <div className="flex items-center gap-2 bg-gray-200/20 p-4 text-white text-md font-medium rounded-full hover:bg-gray-200/40 transition-all">
                <Loader className="size-5 inline-block" /> Contribua com a BRASFI
              </div>
              <div className="flex items-center gap-2 bg-gray-200/20 p-4 text-white text-md font-medium rounded-full hover:bg-gray-200/40 transition-all">
                <Loader className="size-5 inline-block" /> Conecte-se Conosco
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
          <h3 className="text-2xl font-medium">Assine nossa newsletter</h3>
          <p className="text-sm text-gray-500 max-w-80 font-light leading-7">
            Receba atualizações sobre nossas iniciativas e eventos diretamente no seu e-mail.
          </p>

          <div className="relative">
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              className="w-full rounded-full placeholder:text-gray-500"
            />
            <ArrowRight className="size-5 absolute top-1/4 right-4 cursor-pointer" />
          </div>

          <div className="flex gap-4 mt-4">
            <Button
              variant="ghost"
              className="bg-[#F3F5F4] p-3 rounded-full hover:bg-[#F3F5F4]/60 transition-all cursor-pointer"
            >
              <Youtube className="size-5 text-black" />
            </Button>
            <Button
              variant="ghost"
              className="bg-[#F3F5F4] p-3 rounded-full hover:bg-[#F3F5F4]/60 transition-all cursor-pointer"
            >
              <Facebook className="size-5 text-black" />
            </Button>
            <Button
              variant="ghost"
              className="bg-[#F3F5F4] p-3 rounded-full hover:bg-[#F3F5F4]/60 transition-all cursor-pointer"
            >
              <Twitter className="size-5 text-black" />
            </Button>
            <Button
              variant="ghost"
              className="bg-[#F3F5F4] p-3 rounded-full hover:bg-[#F3F5F4]/60 transition-all cursor-pointer"
            >
              <Linkedin className="size-5 text-black" />
            </Button>
          </div>
        </div>

        <div className="flex gap-30 text-gray-500 text-lg">
          <div className="flex flex-col gap-4">
            <h3 className="text-green-900/80 text-2xl mb-5">Serviços</h3>
            <p>Sobre Nós</p>
            <p>Iniciativas</p>
            <p>Parcerias</p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-green-900/80 text-2xl mb-5">Contato</h3>
            <p>Fale Conosco</p>
            <p>Seja Voluntário</p>
            <p>Contribua</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseSection;
