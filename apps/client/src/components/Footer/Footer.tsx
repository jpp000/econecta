import { Separator } from "@/components/ui/separator";

interface FooterProps {
  bgColor?: string;
  textColor?: string;
}

const Footer = ({ bgColor, textColor }: FooterProps) => {
  return (
    <footer>
      <Separator className="" />
      <div
        className={`${bgColor ? bgColor : `bg-green-100/30`} ${
          textColor ? textColor : `text-slate-600`
        } py-3`}
      >
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Econecta. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
