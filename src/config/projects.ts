export const projectCategories = [
  "Suspended Ceiling",
  "Renovation project",
  "Drywall",
  "Steel Frame",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectImage = {
  /** Path under `public/`. */
  src: string;
  width: number;
  height: number;
  title: string;
  alt: string;
  category: ProjectCategory;
};

/** Images shown in the homepage "Latest Projects" gallery, in display order. */
export const projectImages: ProjectImage[] = [
  {
    src: "/images/projects/suspended-ceiling-round-opening-framing.jpeg",
    width: 1600,
    height: 1200,
    title: "Round Ceiling Opening — Framing",
    alt: "Steel stud framing around a round opening in a suspended ceiling",
    category: "Suspended Ceiling",
  },
  {
    src: "/images/projects/drywall-round-bulkhead-detail.jpeg",
    width: 1600,
    height: 1200,
    title: "Round Drywall Bulkhead",
    alt: "Curved drywall bulkhead suspended below an exposed ceiling",
    category: "Drywall",
  },
  {
    src: "/images/projects/steel-frame-exterior-wall.jpeg",
    width: 1200,
    height: 1600,
    title: "Exterior Steel Stud Walls",
    alt: "Multi-storey exterior steel stud wall framing with a scissor lift",
    category: "Steel Frame",
  },
  {
    src: "/images/projects/renovation-house-exterior.jpeg",
    width: 1500,
    height: 2000,
    title: "Residential Renovation",
    alt: "Exterior of a single-storey house before renovation",
    category: "Renovation project",
  },
  {
    src: "/images/projects/suspended-ceiling-round-opening-finished.jpeg",
    width: 1200,
    height: 1600,
    title: "Round Ceiling Opening — Finished",
    alt: "Finished round opening in a drywall ceiling",
    category: "Suspended Ceiling",
  },
  {
    src: "/images/projects/steel-frame-soffit-grid.jpeg",
    width: 1500,
    height: 2000,
    title: "Soffit Framing Grid",
    alt: "Steel framing grid installed under a concrete parkade ceiling",
    category: "Steel Frame",
  },
  {
    src: "/images/projects/drywall-round-bulkhead.jpeg",
    width: 1200,
    height: 1600,
    title: "Curved Bulkhead",
    alt: "Large circular drywall bulkhead below exposed ductwork",
    category: "Drywall",
  },
  {
    src: "/images/projects/steel-frame-soffit-sheathing.jpeg",
    width: 1500,
    height: 2000,
    title: "Soffit Sheathing",
    alt: "Exterior soffit sheathing installed over steel framing",
    category: "Steel Frame",
  },
  {
    src: "/images/projects/steel-frame-exterior-wall-lift.jpeg",
    width: 1200,
    height: 1600,
    title: "Exterior Framing in Progress",
    alt: "Crew on a scissor lift framing an exterior steel stud wall",
    category: "Steel Frame",
  },
];
