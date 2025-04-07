import "./PartnerLogosCarousel.css";
import LogoImage from "@/assets/company1-logo.png";

const logos = [LogoImage, LogoImage, LogoImage, LogoImage, LogoImage];

const PartnerLogosCarousel = () => {
  return (
    <div className="w-[50%] m-auto overflow-hidden py-6 bg-trasparent">
      <div className="flex animate-slide whitespace-nowrap">
        {[...logos, ...logos].map((logo, i) => (
          <img
            key={i}
            src={logo}
            alt={`Logo ${i}`}
            className="h-10 mx-8 opacity-60 hover:opacity-100 transition-opacity duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default PartnerLogosCarousel;
