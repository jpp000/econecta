import { Card, CardContent } from "@/components/ui/card";
import CardTree from "@/assets/card-tree.jpg";
import { Button } from "../ui/button";

interface FeatureCardProps {
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  className = "",
}: FeatureCardProps) {
  return (
    <Card
      className={`relative h-[300px] w-full rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl text-white border border-white/10 shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-black/20 z-0 rounded-2xl" />

      <CardContent className="z-10 flex items-start gap-4">
        <div className="flex flex-col items-start mt-4 gap-2">
          <h3 className="text-xl font-medium">{title}</h3>
          <p className="text-white/80 text-md text-start">{description}</p>
          <Button className="mt-6 bg-yellow-400 text-black text-md font-medium rounded-full hover:bg-yellow-500 cursor-pointer">
            Get Started →
          </Button>
        </div>

        <div className="w-full rounded-xl overflow-hidden">
          <img src={CardTree} alt={title} className="w-100 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  );
}
