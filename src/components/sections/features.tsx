import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Sustainable System",
    icon: { src: "/images/home/feature-excavator.png", width: 173, height: 150 },
    // Column paddings follow the original Elementor layout.
    columnClassName: "md:pr-5",
    titleClassName: "font-heading text-[18px] font-semibold md:mt-[16px]",
  },
  {
    title: "Honest Service",
    icon: { src: "/images/home/feature-hard-hat.png", width: 178, height: 150 },
    columnClassName: "pt-10 md:px-2.5 md:pt-0",
    // The original site renders this title in Lato, unlike the other two.
    titleClassName: "font-sans text-[20px] font-bold md:mt-[16.5px]",
  },
  {
    title: "Remodeling Experts",
    icon: { src: "/images/home/feature-crane.png", width: 150, height: 150 },
    columnClassName: "pt-10 md:pl-5 md:pt-0",
    titleClassName: "font-heading text-[18px] font-semibold md:mt-[16px]",
  },
];

export function Features() {
  return (
    <section className="overflow-x-clip bg-ink px-[30px] pt-20 pb-[83px] text-white min-[1230px]:px-0">
      <div className="mx-auto grid max-w-[1170px] md:grid-cols-3">
        {features.map((feature, i) => (
          <div key={feature.title} className={feature.columnClassName}>
            <Reveal animation="fade-in-up" delay={200 * (i + 1)}>
              <div className="text-center md:flex md:items-start md:gap-[15px] md:text-left lg:gap-[25px]">
                <Image
                  src={feature.icon.src}
                  alt=""
                  width={feature.icon.width}
                  height={feature.icon.height}
                  className="mx-auto mb-[15px] h-auto w-[69px] shrink-0 md:mx-0 md:mb-0"
                />
                <h3 className={cn("leading-[28px] md:max-lg:text-[20px]", feature.titleClassName)}>
                  {feature.title}
                </h3>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
