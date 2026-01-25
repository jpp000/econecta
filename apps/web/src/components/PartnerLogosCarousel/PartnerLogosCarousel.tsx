import "./PartnerLogosCarousel.css";
import Logo1 from '@/assets/climate-company.png';
import Logo2 from '@/assets/lab-inv-fin.jpg';
import Logo3 from '@/assets/logo-unifor.png';
import Logo4 from '@/assets/weesg.png';

const logos = [Logo1, Logo2, Logo3, Logo4, Logo2, Logo3];

const PartnerLogosCarousel = () => {
  return (
    <div className="w-[80%] m-auto overflow-hidden py-6 bg-trasparent">
      <div className="flex animate-slide whitespace-nowrap">
        {[...logos, ...logos].map((logo, i) => (
          <img
            key={i}
            src={logo}
            alt={`Logo ${i}`}
            className="h-14 mx-8 opacity-60 hover:opacity-100 transition-opacity duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default PartnerLogosCarousel;
