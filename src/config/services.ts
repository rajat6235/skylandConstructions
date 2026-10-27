export type ServicePhoto = { src: string; alt: string };

export type Service = {
  /** Used for the `/services#slug` anchor. */
  slug: string;
  title: string;
  /** One line for cards and lists. */
  summary: string;
  description: string;
  includes: string[];
  /** Job-site photos; the first is the main image. Services without photos are shown as compact cards. */
  photos?: ServicePhoto[];
};

const G = "/images/about-gallery";

/** Services offered, as listed on the Skyland office window. Order is the display order. */
export const services: Service[] = [
  {
    slug: "steel-framing",
    title: "Steel Framing",
    summary: "Interior and exterior steel stud framing for commercial and residential builds.",
    description:
      "Every good wall starts with a straight, solid frame. Our crews lay out and build steel stud framing for partitions, exterior walls, high walls and curved features — plumb, square and ready for board.",
    includes: [
      "Interior partition walls",
      "Exterior steel stud walls and sheathing",
      "High walls and curved wall framing",
      "Door openings and bulkhead framing",
    ],
    photos: [
      { src: `${G}/14-steel-stud-corridor-framing.jpeg`, alt: "Long corridor of steel stud framing in a commercial build" },
      { src: `${G}/20-installing-steel-press-door-frame.jpeg`, alt: "Skyland crew installing a steel press door frame" },
    ],
  },
  {
    slug: "drywall",
    title: "Drywall",
    summary: "Hanging drywall on walls and ceilings — including curves and vaulted ceilings.",
    description:
      "From open warehouse fit-outs to tight residential rooms, we hang board cleanly and efficiently, with tight joints that make finishing easier and the result last longer.",
    includes: [
      "Walls and ceilings in any size space",
      "Curved walls and feature bulkheads",
      "Vaulted and sloped ceilings",
      "Commercial and residential fit-outs",
    ],
    photos: [
      { src: `${G}/17-curved-drywall-wall.jpeg`, alt: "Curved drywall wall boarded and ready for taping" },
      { src: `${G}/18-vaulted-ceiling-drywall.jpeg`, alt: "Drywall installed on a vaulted ceiling" },
    ],
  },
  {
    slug: "mud-taping",
    title: "Mud Taping",
    summary: "Taping, mudding and sanding for a smooth, ready-to-paint finish.",
    description:
      "Finishing is where quality shows. We tape, mud and sand every joint and corner so walls and ceilings are smooth, even and ready for paint.",
    includes: [
      "Taping and mudding all joints",
      "Corner bead and trim",
      "Sanding to a smooth finish",
      "Ready-for-paint surfaces",
    ],
    photos: [
      { src: `${G}/12-interior-drywall-finishing.jpg`, alt: "Drywall finishing around an interior stairwell opening" },
      { src: `${G}/11-commercial-warehouse-fit-out.jpg`, alt: "Finished walls inside a commercial fit-out" },
    ],
  },
  {
    slug: "t-bar",
    title: "T-Bar Ceilings",
    summary: "Suspended T-bar ceiling grids, tile, bulkheads and feature openings.",
    description:
      "We install suspended T-bar ceilings for offices, retail and commercial spaces — including round openings, bulkheads and feature ceilings that set a space apart.",
    includes: [
      "Suspended T-bar ceiling grids",
      "Ceiling tile installation",
      "Bulkheads and round ceiling openings",
      "Feature and decorative ceilings",
    ],
    photos: [
      { src: `${G}/19-round-bulkhead-under-wood-ceiling.jpeg`, alt: "Round bulkhead with ceiling grid below a wood plank ceiling" },
      { src: `${G}/02-circular-ceiling-feature.png`, alt: "Circular ceiling features framed below an open-web steel roof" },
    ],
  },
  {
    slug: "renovation",
    title: "Renovation",
    summary: "Kitchens, suites and complete interior renovations.",
    description:
      "We take care of renovations from start to finish — coordinating the trades, keeping to your budget and timeline, and delivering spaces you'll be proud of.",
    includes: [
      "Kitchen renovations",
      "Suite and room renovations",
      "Flooring, trim and finishing",
      "Commercial interior updates",
    ],
    photos: [
      { src: `${G}/01-modern-kitchen-renovation.jpg`, alt: "Renovated kitchen with grey cabinets and tile backsplash" },
      { src: `${G}/05-open-plan-suite-renovation.jpg`, alt: "Renovated open-plan suite with new flooring" },
    ],
  },
  {
    slug: "regdex-framing",
    title: "Regdex Framing",
    summary: "Regdex framing for commercial and residential projects.",
    description: "Talk to our team about Regdex framing for your project.",
    includes: [],
  },
  {
    slug: "basement-development",
    title: "Basement Development",
    summary: "Turn an unfinished basement into usable living space.",
    description:
      "We handle the framing, drywall, taping and finishing needed to turn an unfinished basement into a comfortable, finished space.",
    includes: ["Framing and drywall", "Taping and finishing", "Flooring and trim"],
  },
  {
    slug: "demolition",
    title: "Demolition",
    summary: "Interior demolition to prepare spaces for what comes next.",
    description: "We strip out existing interiors safely and cleanly so your renovation or new build can get started.",
    includes: ["Interior strip-outs", "Preparing spaces for renovation"],
  },
];
