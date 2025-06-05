import CardTree from "@/assets/card-tree.jpg";
import MainSection from "@/components/Sections/MainSection/MainSection";
import MissionSection from "@/components/Sections/MissionSection/MissionSection";
import AboutUsSection from "@/components/Sections/AboutUsSection/AboutUsSection";
import EnterpriseSection from "@/components/Sections/EnterpriseSection/EnterpriseSection";

const Home = () => {
  const professionals = [
    {
      name: "Ana Silva",
      position: "Especialista em Finanças Sustentáveis",
      image: CardTree,
    },
    {
      name: "Carlos Pereira",
      position: "Consultor de Inovação Financeira",
      image: CardTree,
    },
    {
      name: "Mariana Costa",
      position: "Analista de Sustentabilidade",
      image: CardTree,
    },
  ];

  return (
    <div>
      <MainSection />

      <div id="mission">
        <MissionSection />
      </div>

      <div id="about">
        <AboutUsSection />
      </div>

      <div id="enterprise">
        <EnterpriseSection professionals={professionals} />
      </div>
    </div>
  );
};

export default Home;
