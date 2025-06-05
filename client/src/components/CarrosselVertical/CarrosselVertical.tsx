import { useEffect, useRef, useState } from "react";
import BgImage from "@/assets/bg-image.jpg";

const cards = [
  {
    image: BgImage,
    title: "Capacitação em Finanças Sustentáveis",
    text: "Oferecemos cursos e treinamentos especializados para formar líderes que promovam práticas financeiras responsáveis e sustentáveis. Nosso objetivo é capacitar profissionais para enfrentar os desafios do mercado financeiro com ética e inovação.",
  },
  {
    image: BgImage,
    title: "Conexão entre Profissionais e Organizações",
    text: "Criamos uma rede de networking que conecta especialistas e organizações para impulsionar a inovação no mercado financeiro. Nossa plataforma facilita a troca de ideias e a construção de parcerias estratégicas.",
  },
  {
    image: BgImage,
    title: "Iniciativas de Impacto Positivo e Sustentável",
    text: "Apoiamos projetos que promovem mudanças reais e alinhados aos princípios de sustentabilidade e responsabilidade social. Trabalhamos para criar soluções que beneficiem tanto o meio ambiente quanto a sociedade.",
  },
];

export function CarrosselVertical() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[650px] overflow-hidden w-1/2">
      {/* Container dos cards */}
      <div
        ref={containerRef}
        className="flex flex-col transition-transform duration-700 ease-in-out shadow-2xl"
        style={{
          transform: `translateY(-${index * 650}px)`,
        }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className="h-[650px] w-full flex-shrink-0 px-4 py-6 flex flex-col justify-between gap-4 bg-white rounded-xl"
          >
            <div className="flex flex-col gap-2">
              <h4 className="text-green-950 text-4xl font-medium max-w-120">{card.title}</h4>
              <p className="text-gray-500 max-w-150">{card.text}</p>
            </div>
            <img
              src={card.image}
              alt={card.title}
              className="rounded-xl shadow-md w-160 h-fit mt-5 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Barra de progresso */}
      <div className="absolute bottom-6 left-10 flex gap-2">
        {cards.map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === i ? "bg-green-950 w-20" : "bg-gray-300 w-10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
