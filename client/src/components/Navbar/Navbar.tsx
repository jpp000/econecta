import { Link } from "react-router-dom";
import { HandCoins, Leaf, LogOut, User } from "lucide-react";
import { Button } from "../ui/button";

interface NavbarProps {
  logout: () => void;
  authUser: boolean;
}

const Navbar = ({ logout, authUser }: NavbarProps) => {
  return (
    <header className="fixed w-full top-0 z-40 bg-transparent">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-around h-full">
          <Link to={"/"} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <div className="absolute inset-0 bg-[#2F4F4F] rounded-full opacity-20 transition-opacity blur-md"></div>
              <div className="relative bg-[#2F4F4F] text-white p-2.5 rounded-full">
                <Leaf className="w-5 h-5" strokeWidth={1.5} />
              </div>
            </div>
            <span className="font-serif text-xl font-medium text-[#2F4F4F]">
              Econecta
            </span>
          </Link>

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
                className="group relative text-[#2F4F4F] hover:text-[#3E6B6B] text-sm font-medium transition-colors"
              >
                {label}
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#2F4F4F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to={"/donations"} className="hidden sm:block">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-full px-6 py-2 h-auto text-sm font-medium transition-colors cursor-pointer">
                <HandCoins className="size-5" strokeWidth={1.5} />
                Faça sua doação
              </Button>
            </Link>

            {authUser && (
              <>
                <Button className="border bg-base-100 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <Link to={"/profile"}>
                    <User className="size-5 text-black" />
                  </Link>
                </Button>

                <Link to={"/donations"} className="hidden sm:block">
                  <Button className="bg-[#2F4F4F] hover:bg-[#3E6B6B] text-white rounded-md h-auto text-sm font-medium transition-colors cursor-pointer" onClick={logout}>
                    <LogOut className="size-5" strokeWidth={1.5} />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
