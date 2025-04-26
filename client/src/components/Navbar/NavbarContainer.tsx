import { useAuthStore } from "@/store/useAuthStore";
import Navbar from "./Navbar";
import { useNavbarStore } from "@/store/useNavbarStore";
import { useState } from "react";

const NavbarContainer = () => {
  const { isAuthenticated, logout } = useAuthStore();

  const { variant } = useNavbarStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Navbar
      authUser={isAuthenticated}
      logout={logout}
      variant={variant}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
    />
  );
};

export default NavbarContainer;
