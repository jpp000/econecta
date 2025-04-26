import { Link } from "react-router-dom";
import { HandCoins, Leaf, User, Menu, LogOut } from "lucide-react";
import { Button } from "../ui/button";
interface NavbarProps {
  authUser: boolean;
  logout: () => void;
  variant: "transparent" | "light" | "dark";
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Navbar = ({
  authUser,
  logout,
  variant,
  mobileMenuOpen,
  setMobileMenuOpen,
}: NavbarProps) => {
  const styles = {
    navbar: {
      transparent: "bg-transparent",
      light: "bg-white",
      dark: "bg-[#1E3A3A]",
    },
    logo: {
      transparent: "text-[#2F4F4F]",
      light: "text-[#2F4F4F]",
      dark: "text-white",
    },
    logoIcon: {
      transparent: "bg-[#2F4F4F] text-white",
      light: "bg-[#2F4F4F] text-white",
      dark: "bg-white text-[#2F4F4F]",
    },
    logoIconBlur: {
      transparent: "bg-[#2F4F4F] opacity-20",
      light: "bg-[#2F4F4F] opacity-20",
      dark: "bg-white opacity-20",
    },
    navLink: {
      transparent: "text-[#2F4F4F] hover:text-[#3E6B6B]",
      light: "text-[#2F4F4F] hover:text-[#3E6B6B]",
      dark: "text-white hover:text-gray-300",
    },
    navLinkUnderline: {
      transparent: "bg-[#2F4F4F]",
      light: "bg-[#2F4F4F]",
      dark: "bg-white",
    },
    loginButton: {
      transparent:
        "border border-[#2F4F4F] bg-white/10 text-[#2F4F4F] hover:bg-gray-200/40",
      light:
        "border border-[#2F4F4F] bg-white text-[#2F4F4F] hover:bg-gray-100",
      dark: "border border-white bg-transparent text-white hover:bg-white/10",
    },
    profileButton: {
      transparent: "border bg-base-100 rounded-lg hover:bg-gray-100",
      light: "border bg-white rounded-lg hover:bg-gray-100",
      dark: "border border-white bg-transparent rounded-lg hover:bg-white/10",
    },
    profileIcon: {
      transparent: "text-black",
      light: "text-black",
      dark: "text-white",
    },
    mobileMenuButton: {
      transparent: "text-[#2F4F4F]",
      light: "text-[#2F4F4F]",
      dark: "text-white",
    },
  };

  return (
    <header
      className={`fixed px-14 w-full top-0 z-40 transition-colors duration-300 ${styles.navbar[variant]}`}
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <Link
            to={"/"}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              <div
                className={`absolute inset-0 rounded-full transition-opacity blur-md ${styles.logoIconBlur[variant]}`}
              ></div>
              <div
                className={`relative p-2.5 rounded-full transition-colors ${styles.logoIcon[variant]}`}
              >
                <Leaf className="w-5 h-5" strokeWidth={1.5} />
              </div>
            </div>
            <span
              className={`font-serif text-xl font-medium transition-colors ${styles.logo[variant]}`}
            >
              Econecta
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { to: "/about", label: "Sobre Nós" },
              { to: "/calendar", label: "Agende" },
              { to: "/courses", label: "Cursos" },
              { to: "/chats", label: "Chats" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`group relative text-sm font-medium transition-colors ${styles.navLink[variant]}`}
              >
                {label}
                <span
                  className={`absolute left-0 -bottom-1 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out ${styles.navLinkUnderline[variant]}`}
                ></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to={"/donations"} className="hidden sm:block">
              <Button className="bg-[#ece94c] hover:bg-[#ece94c]/90 text-black rounded-full px-6 py-2 h-auto text-sm font-medium transition-colors cursor-pointer">
                <HandCoins className="size-5" strokeWidth={1.5} />
                Faça sua doação
              </Button>
            </Link>

            {!authUser && (
              <Link to={"/login"}>
                <Button
                  className={`transition-all cursor-pointer ${styles.loginButton[variant]}`}
                >
                  Entrar
                </Button>
              </Link>
            )}

            {authUser && (
              <>
                <Link to={"/profile"}>
                  <Button
                    className={`transition-all cursor-pointer ${styles.profileButton[variant]}`}
                  >
                    <User className={`size-5 ${styles.profileIcon[variant]}`} />
                  </Button>
                </Link>

                <Button
                  className={`transition-all cursor-pointer ${styles.profileButton[variant]}`}
                  onClick={logout}
                >
                  <LogOut className={`size-5 ${styles.profileIcon[variant]}`} />
                </Button>
              </>
            )}

            {/* Mobile menu button */}
            <button
              className={`lg:hidden ${styles.mobileMenuButton[variant]}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden py-4 px-2 ${
              variant === "dark" ? "bg-[#1E3A3A]" : "bg-white"
            }`}
          >
            <nav className="flex flex-col space-y-4">
              {[
                { to: "/about", label: "Sobre Nós" },
                { to: "/calendar", label: "Agende" },
                { to: "/courses", label: "Cursos" },
                { to: "/chats", label: "Chats" },
                { to: "/donations", label: "Faça sua doação" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-4 py-2 rounded-md ${styles.navLink[variant]}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
