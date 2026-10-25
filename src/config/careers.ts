export type Job = {
  slug: string;
  title: string;
  type: "Full Time" | "Part Time" | "Contract";
  location: string;
  summary: string;
  /** Trades knowledge the role requires. */
  skills: string[];
  details: string[];
};

/** Open positions shown on the Careers page. Remove a job here to take it down. */
export const jobs: Job[] = [
  {
    slug: "drywall-installer-steel-framer-helper",
    title: "Drywall Installer · Steel Framer · Drywall Helper",
    type: "Full Time",
    location: "Saskatoon, SK",
    summary:
      "SkyLand Enterprises is currently hiring. Knowledge of steel stud framing, drywall boarding, taping and acoustic trades is required.",
    skills: ["Steel stud framing", "Drywall boarding", "Taping", "Acoustic ceilings"],
    details: [
      "Work on commercial and residential projects across Saskatoon.",
      "Wage depends on experience and qualifications.",
      "Installers, framers and helpers are all welcome to apply.",
    ],
  },
];

export const jobTypes = ["Full Time", "Part Time", "Contract"] as const;
