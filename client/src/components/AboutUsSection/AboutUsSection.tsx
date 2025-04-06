import BgSustentable from "@/assets/bg-image.jpg";

const AboutUsSection = () => {
  return (
    <section
      className="h-screen relative flex flex-col items-center justify-center text-center text-white bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${BgSustentable})` }}
    >
      <div className="absolute inset-0 bg-green-900/50 backdrop-blur-xl z-0"></div>

      <div className="relative z-10 px-4">
        <h2 className="text-5xl font-bold">Join the Green Revolution</h2>
        <p className="mt-4 text-lg text-gray-200 max-w-2xl">
          Every small action counts! Be part of the movement that changes the
          world.
        </p>
      </div>
    </section>
  );
};

export default AboutUsSection;
