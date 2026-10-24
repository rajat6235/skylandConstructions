"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/icons";
import type { ProjectCategory, ProjectImage } from "@/config/projects";
import { cn } from "@/lib/utils";

type Filter = ProjectCategory | "All";

type ProjectGalleryProps = {
  categories: readonly ProjectCategory[];
  images: ProjectImage[];
  /** Maximum number of images shown per filter. */
  limit?: number;
};

export function ProjectGallery({ categories, images, limit = 6 }: ProjectGalleryProps) {
  const [filter, setFilter] = useState<Filter>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible = (filter === "All" ? images : images.filter((image) => image.category === filter)).slice(0, limit);
  const open = openIndex === null ? null : visible[openIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const step = (delta: number) =>
    setOpenIndex((index) => (index === null ? null : (index + delta + visible.length) % visible.length));

  return (
    <div className="pt-5 md:px-6 md:pt-0 md:pb-6">
      <ul className="mt-[7px] flex flex-wrap justify-center gap-x-[28px] gap-y-2 text-[15px] leading-[28px] font-bold max-md:gap-x-5 max-md:text-[14px]">
        {(["All", ...categories] as const).map((category) => (
          <li key={category}>
            <button
              type="button"
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
              className={cn(
                "border-b-2 transition-colors hover:text-white",
                filter === category ? "border-accent text-white" : "border-transparent text-[#aaaaaa]",
              )}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      <ul
        key={filter}
        className="mt-5 grid grid-cols-2 gap-3 motion-safe:animate-[fade-in_0.4s_ease-out] sm:gap-5 md:mt-[15px] lg:grid-cols-3 lg:gap-[30px]"
      >
        {visible.map((image, i) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group relative block aspect-[3/2] w-full overflow-hidden bg-black/20"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1024px) 354px, 50vw"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Caption is always visible so touch users see it too. */}
              <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-colors duration-500 group-hover:bg-black/30" />
              <span className="absolute inset-x-0 bottom-0 p-2.5 text-left transition-transform duration-500 group-hover:-translate-y-1 sm:p-5">
                <span className="block text-[9px] leading-3 font-bold tracking-[0.08em] text-accent uppercase sm:text-[12px] sm:leading-4 sm:tracking-[0.15em]">
                  {image.category}
                </span>
                <span className="mt-0.5 block font-heading text-[12px] leading-4 font-semibold sm:mt-1 sm:text-[18px] sm:leading-6">
                  {image.title}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setOpenIndex(null)}
        onClick={(event) => event.target === event.currentTarget && setOpenIndex(null)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") step(-1);
          if (event.key === "ArrowRight") step(1);
        }}
        aria-label={open?.title}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/90"
      >
        {open && (
          <figure className="relative flex h-[100svh] w-screen flex-col items-center justify-center px-4 py-14 sm:px-20">
            <div className="relative size-full">
              <Image src={open.src} alt={open.alt} fill sizes="90vw" className="object-contain" />
            </div>
            <figcaption className="mt-4 text-center text-[15px] text-white">
              {open.title} <span className="text-white/60">· {open.category}</span>
            </figcaption>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpenIndex(null)}
              className="absolute top-4 right-4 flex size-11 items-center justify-center text-white hover:text-accent"
            >
              <CloseIcon className="h-6" />
            </button>
            {visible.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() => step(-1)}
                  className="absolute top-1/2 left-2 flex size-11 -translate-y-1/2 items-center justify-center text-white hover:text-accent sm:left-6"
                >
                  <ChevronLeftIcon className="h-6" />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() => step(1)}
                  className="absolute top-1/2 right-2 flex size-11 -translate-y-1/2 items-center justify-center text-white hover:text-accent sm:right-6"
                >
                  <ChevronRightIcon className="h-6" />
                </button>
              </>
            )}
          </figure>
        )}
      </dialog>
    </div>
  );
}
