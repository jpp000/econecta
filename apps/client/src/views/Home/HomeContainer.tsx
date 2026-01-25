import { useNavbarStore } from "@/store/useNavbarStore";
import Home from "./Home";
import { useEffect } from "react";

const HomeContainer = () => {
  const { setVariant } = useNavbarStore();

  useEffect(() => {
    setVariant("transparent");
  }, [setVariant]);

  return <Home />;
};

export default HomeContainer;
