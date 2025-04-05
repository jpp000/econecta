import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  linkText?: string;
  linkHref?: string;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  imageSrc,
  linkText = "Saiba mais",
  linkHref = "#",
  className = "",
}: FeatureCardProps) {
  return (
    <Card
      className={`relative h-[300px] w-full rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl text-white border border-white/10 shadow-lg ${className}`}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/30 z-0 rounded-2xl" />

      <CardContent className="relative z-10 p-6 flex flex-col justify-between items-center text-center">
        <div className="w-full h-24 rounded-xl overflow-hidden">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-white/80 text-sm">{description}</p>

        <Link
          to={linkHref}
          className="text-yellow-300 hover:text-yellow-400 text-sm underline underline-offset-4 transition-colors"
        >
          {linkText}
        </Link>
      </CardContent>
    </Card>
  );
}
