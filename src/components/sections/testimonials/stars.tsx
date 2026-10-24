import { StarIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span role="img" aria-label={`${rating} out of 5 stars`} className={cn("flex w-max gap-0.5 text-[#fbbc04]", className)}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} className={cn("aspect-[9/8] h-full w-auto shrink-0", i >= Math.round(rating) && "opacity-25")} />
      ))}
    </span>
  );
}
