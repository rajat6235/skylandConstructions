import { readdirSync } from "node:fs";
import path from "node:path";

import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

import { VideoTile, type ClipInfo } from "./video-tile";

const VIDEO_DIR = "/videos";

/** "03-high-wall-steel-framing.mp4" -> "High wall steel framing" */
function titleFromFileName(file: string) {
  const words = file.replace(/\.mp4$/i, "").replace(/^\d+[-_\s]*/, "").replace(/[-_]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/**
 * Every `.mp4` in `public/videos/` with a matching `.jpg` poster, sorted by file name.
 * Clips are web-optimised copies (2x speed, no audio) of the originals in `media-originals/videos/`.
 */
function getClips(): ClipInfo[] {
  try {
    const files = readdirSync(path.join(process.cwd(), "public", VIDEO_DIR));
    return files
      .filter((file) => /\.mp4$/i.test(file) && files.includes(file.replace(/\.mp4$/i, ".jpg")))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => ({
        src: `${VIDEO_DIR}/${file}`,
        poster: `${VIDEO_DIR}/${file.replace(/\.mp4$/i, ".jpg")}`,
        title: titleFromFileName(file),
      }));
  } catch {
    return [];
  }
}

export function VideoReel({ tone = "light" }: { tone?: "light" | "dark" }) {
  const clips = getClips();
  if (clips.length === 0) return null;
  const dark = tone === "dark";

  return (
    <section
      aria-labelledby="videos-heading"
      className={cn("overflow-x-clip px-[30px] py-16 md:py-20 lg:px-0", dark ? "bg-ink text-white" : "bg-white")}
    >
      <div className="mx-auto max-w-[1170px]">
        <Reveal animation="fade-in-up" className="mx-auto mb-8 max-w-[620px] text-center">
          <p className="text-[13px] leading-5 font-bold tracking-[0.3em] text-brand uppercase">Behind the scenes</p>
          <h2
            id="videos-heading"
            className={cn(
              "mt-2 font-heading text-[28px] leading-[38px] font-semibold md:text-[36px] md:leading-[46px]",
              dark ? "text-white" : "text-black",
            )}
          >
            See Our Crew at Work
          </h2>
          <span aria-hidden="true" className="mx-auto mt-4 block h-[3px] w-14 bg-accent" />
          <p className={cn("mt-4 text-[16px] leading-[28px]", dark ? "text-white/70" : "text-[#555]")}>
            Quick clips straight from our job sites — framing, boarding and ceilings in progress.
          </p>
        </Reveal>

        <ul className="-mx-[30px] flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[30px] px-[30px] pb-2 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
          {clips.map((clip, i) => (
            <li key={clip.src} className="w-[62%] shrink-0 snap-start sm:w-[calc((100%-32px)/3)] lg:w-auto">
              <Reveal animation="fade-in-up" delay={i * 100}>
                <VideoTile clip={clip} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
