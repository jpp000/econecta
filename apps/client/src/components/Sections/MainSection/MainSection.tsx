import { useNavbarStore } from "@/store/useNavbarStore";
import { useEffect } from "react";
import { useSectionInView } from "@/hooks/useSectionInView";

const MainSection = () => {
  const { setVariant } = useNavbarStore();
  const { ref, isInView } = useSectionInView(0.3);

  useEffect(() => {
    if (isInView) {
      setVariant("dark");
    }
  }, [isInView, setVariant]);

  return (
    <section
      ref={ref}
      className="h-screen flex flex-col items-center justify-center text-center text-white bg-[#1E3A3A] bg-fixed bg-cover bg-center"
    >
      <div className="mt-30 mb-50 flex flex-col items-center justify-center text-center z-10">
        <h1 className="text-7xl font-medium max-w-6xl">
          Transformando o futuro com finanças sustentáveis.
        </h1>
        <p className="mt-4 text-lg text-gray-200 max-w-2xl">
          A BRASFI conecta pessoas, conhecimento e inovação para promover um mercado financeiro mais sustentável e responsável.
        </p>
        <a href="#mission" className="mt-6 bg-[#ece94c] text-black text-md font-medium rounded-full hover:bg-[#ece94c]/90 px-4 py-2 cursor-pointer">
          Saiba Mais →
        </a>
      </div>
    </section>
  );
};

export default MainSection;
