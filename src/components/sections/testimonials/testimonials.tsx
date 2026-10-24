import { GoogleIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { googleReviews, reviews } from "@/config/reviews";

import { ReviewCarousel } from "./review-carousel";
import { Stars } from "./stars";

export function Testimonials() {
  const { rating, count, url } = googleReviews;

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative isolate overflow-x-clip bg-[url('/images/home/testimonials-bg-dining-room.jpg')] bg-cover bg-center px-[30px] py-16 md:px-5 md:py-[70px] lg:bg-fixed lg:px-0"
    >
      <div className="absolute inset-0 -z-10 bg-[#f9b300]/80" />
      <div className="mx-auto max-w-[1170px]">
        <Reveal animation="fade-in-up" className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="text-ink">
            <p className="text-[13px] leading-5 font-bold tracking-[0.3em] uppercase">Client Reviews</p>
            <h2
              id="testimonials-heading"
              className="mt-1 font-heading text-[28px] leading-[38px] font-semibold md:text-[36px] md:leading-[46px]"
            >
              What Our Clients Say
            </h2>
            <p className="mt-1 max-w-[520px] text-[15px] leading-[26px] text-ink/80">
              Real reviews from real clients — straight from our Google Business profile.
            </p>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3.5 self-start bg-white px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-transform hover:-translate-y-0.5 lg:self-auto"
          >
            <GoogleIcon className="size-8 shrink-0" />
            <span>
              <span className="flex items-center gap-2">
                <span className="font-heading text-[24px] leading-none font-semibold text-ink">
                  {rating.toFixed(1)}
                </span>
                <Stars rating={rating} className="h-4" />
              </span>
              <span className="mt-1.5 block text-[13px] leading-none text-[#555] group-hover:text-ink">
                Based on <strong className="font-bold text-ink">{count} Google reviews</strong>
              </span>
            </span>
          </a>
        </Reveal>

        <Reveal animation="fade-in" duration="slow">
          <ReviewCarousel reviews={reviews} reviewsUrl={url} />
        </Reveal>
      </div>
    </section>
  );
}
