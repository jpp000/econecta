import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function InfiniteCarousel({
  children,
}: {
  children: React.ReactNode[];
}) {
  return (
    <div className="w-full flex justify-center">
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 3000 })]}
        className="w-full max-w-4xl"
      >
        <CarouselContent>
          {children.map((child, index) => (
            <CarouselItem key={index} className="p-2">
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
