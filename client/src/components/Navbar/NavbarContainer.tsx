import { useAuthStore } from "@/store/useAuthStore";
import Navbar from "./Navbar";
import { useNavbarStore } from "@/store/useNavbarStore";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const NavbarContainer = () => {
  const { isAuthenticated, logout } = useAuthStore();

  const { variant } = useNavbarStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const isInHomePage = location.pathname === "/home";

  return (
    <Navbar
      authUser={isAuthenticated}
      logout={logout}
      variant={variant}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
      isInHomePage={isInHomePage}
    />
  );
};

export default NavbarContainer;
