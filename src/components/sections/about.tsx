import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { Tilt } from "@/components/ui/tilt";

export function About() {
  return (
    <section className="overflow-x-clip bg-white px-[30px] py-16 md:py-20 lg:py-24 lg:px-0">
      <div className="mx-auto max-w-[1170px] lg:flex">
        <Reveal animation="fade-in-left" className="lg:w-[45.043%] lg:shrink-0">
          <Image
            src="/images/home/decor-dashed-frame.png"
            alt=""
            width={158}
            height={203}
            className="h-auto w-[45%] md:w-[158px]"
          />
          <Tilt className="relative z-[5] mx-auto -mt-[150px] w-[90%] md:mt-[-130px] lg:-mt-[180px]">
            <Image
              src="/images/home/about-house-blueprints.jpg"
              alt="Model house and rolled blueprints on a construction floor plan"
              width={2000}
              height={1333}
              sizes="(min-width: 1230px) 474px, (min-width: 1024px) 40vw, 90vw"
              className="h-auto w-full border-4 border-white shadow-[4px_4px_10px_1px_rgba(0,0,0,0.2)]"
            />
          </Tilt>
          <Image
            src="/images/home/decor-dot-pattern.png"
            alt=""
            width={178}
            height={234}
            className="-mt-[140px] ml-auto h-auto w-[42%] md:-mt-[210px] md:w-[178px]"
          />
        </Reveal>

        <Reveal
          animation="fade-in-right"
          duration="slow"
          className="pt-5 md:pt-[50px] md:pl-5 lg:w-[54.957%] lg:pt-[11px] lg:pl-[30px]"
        >
          <h2 className="font-heading text-[30px] leading-[45px] font-semibold text-black md:text-[40px] md:leading-[55px]">
            Our goal then and now is to provide quality on time projects.
          </h2>
          <Reveal animation="fade-in-up">
            <div className="mt-5 py-0.5">
              <div className="h-[3px] w-[30%] bg-accent md:w-[10%]" />
            </div>
          </Reveal>
          <p className="mt-5 text-[15px] leading-[28px] text-[#555555]">
            Our team collaborates with you to understand your vision for the project. Then, we build a structure
            that closely aligns with your expectations. From designing a modern building to renovating an old one,
            no project is too big or too small for us. At Sky Land Enterprises., the customer’s budget and timeline
            are top priorities at every stage of the project. Let us work with you to construct the perfect space
            for your living and your business.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
