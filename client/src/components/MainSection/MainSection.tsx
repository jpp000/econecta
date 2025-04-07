import { Button } from "../ui/button";
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
        <Button className="mt-6 bg-[#ece94c] text-black text-md font-medium rounded-full hover:bg-[#ece94c]/90 cursor-pointer">
          Get Started →
        </Button>
      </div>
    </section>
  );
};

export default MainSection;
