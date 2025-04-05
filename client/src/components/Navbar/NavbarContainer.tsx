import { useState } from "react";
import Navbar from "./Navbar"

const NavbarContainer = () => {
    const [authUser, setAuthUser] = useState(false);

    const logout = () => {
        setAuthUser(!authUser);
    };

    return <Navbar authUser={authUser} logout={logout}  />
}

export default NavbarContainer;