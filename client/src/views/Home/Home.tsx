import CardTree from "@/assets/card-tree.jpg";
import MainSection from "@/components/Sections/MainSection/MainSection";
import MissionSection from "@/components/Sections/MissionSection/MissionSection";
import AboutUsSection from "@/components/Sections/AboutUsSection/AboutUsSection";
import EnterpriseSection from "@/components/Sections/EnterpriseSection/EnterpriseSection";

const Home = () => {
  const professionals = [
    {
      name: "John Doe",
      position: "CEO",
      image: CardTree,
    },
    {
      name: "Jane Smith",
      position: "CTO",
      image: CardTree,
    },
    {
      name: "Alice Johnson",
      position: "CFO",
      image: CardTree,
    },
  ];

  return (
    <div>
      <MainSection />

      <MissionSection />

      <AboutUsSection />

      <EnterpriseSection professionals={professionals} />
    </div>
  );
};

export default Home;
