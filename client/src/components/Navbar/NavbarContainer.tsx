import { useAuthStore } from "@/store/useAuthStore";
import Navbar from "./Navbar";

const NavbarContainer = () => {
  const { isAuthenticated } = useAuthStore();

  return <Navbar authUser={isAuthenticated} />;
};

export default NavbarContainer;
