import { useAuthStore } from "@/store/useAuthStore";
import Navbar from "./Navbar"

const NavbarContainer = () => {
    const { user } = useAuthStore();

    return <Navbar authUser={!!user}  />
}

export default NavbarContainer;