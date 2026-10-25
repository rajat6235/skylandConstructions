import { readdirSync } from "node:fs";
import path from "node:path";

import { Reveal } from "@/components/ui/reveal";

import { PhotoCarousel, type GalleryPhoto } from "./photo-carousel";
import { PhotoViewer } from "./photo-viewer";

/** Above this many photos the gallery switches to the larger viewer with thumbnails. */
const THUMBNAIL_VIEWER_THRESHOLD = 10;

const GALLERY_DIR = "/images/about-gallery";
const IMAGE_FILE = /\.(jpe?g|png|webp|avif)$/i;

/** "03-ceiling-opening-framing.jpeg" -> "Ceiling opening framing" */
function altFromFileName(file: string) {
  const words = file.replace(IMAGE_FILE, "").replace(/^\d+[-_\s]*/, "").replace(/[-_]+/g, " ").trim();
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : "Skyland Construction project photo";
}

/** Every image in `public/images/about-gallery/` is shown, sorted by file name. */
function getPhotos(): GalleryPhoto[] {
  try {
    return readdirSync(path.join(process.cwd(), "public", GALLERY_DIR))
      .filter((file) => IMAGE_FILE.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => ({ src: `${GALLERY_DIR}/${file}`, alt: altFromFileName(file) }));
  } catch {
    return [];
  }
}

export function PhotoGallery() {
  const photos = getPhotos();
  if (photos.length === 0) return null;

  return (
    <section aria-labelledby="gallery-heading" className="overflow-x-clip bg-ink px-[30px] py-20 text-white md:py-24 lg:px-0">
      <div className="mx-auto max-w-[1170px]">
        <Reveal animation="fade-in-up" className="mb-10 text-center">
          <p className="text-[13px] leading-5 font-bold tracking-[0.3em] text-brand uppercase">On the job</p>
          <h2 id="gallery-heading" className="mt-2 font-heading text-[30px] leading-[40px] font-semibold md:text-[40px] md:leading-[52px]">
            Our Work in Pictures
          </h2>
          <span aria-hidden="true" className="mx-auto mt-5 block h-[3px] w-14 bg-accent" />
          <p className="mt-5 text-[16px] leading-[28px] text-white/70">
            A look at recent projects from our crews — kitchens, suites, commercial fit-outs and more.
          </p>
        </Reveal>
        <Reveal animation="fade-in" duration="slow">
          {photos.length > THUMBNAIL_VIEWER_THRESHOLD ? <PhotoViewer photos={photos} /> : <PhotoCarousel photos={photos} />}
        </Reveal>
      </div>
    </section>
  );
}
