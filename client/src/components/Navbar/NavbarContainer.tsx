import Navbar from "./Navbar"

const NavbarContainer = () => {
    const authUser = false;

    return <Navbar authUser={authUser}  />
}

export default NavbarContainer;