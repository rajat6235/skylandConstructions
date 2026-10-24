export const googleReviews = {
  rating: 5.0,
  count: 14,
  // Google search result showing the business profile and its reviews.
  url: "https://www.google.com/search?q=skyland+construction+sasktoon",
};

export type Review = {
  /** Shown as first name and last initial. */
  name: string;
  rating: number;
  text: string;
  /** True when Google shows the review shortened; the card links to the full review. */
  truncated?: boolean;
  /** "Positive" highlights from the Google review. */
  highlights?: string[];
  /** Background colour for the initial avatar. */
  color: string;
};

/** Client reviews from the Skyland Construction Google listing, in display order. */
export const reviews: Review[] = [
  {
    name: "Jaswinder T.",
    rating: 5,
    text: "They are professionals. They know what they are doing. I would really recommend their services if anyone needs. They are very good tradesmen.",
    highlights: ["Professionalism"],
    color: "#7e57c2",
  },
  {
    name: "Ali A.",
    rating: 5,
    text: "Skyland is a professional, responsible and done job on time. I like to use services.",
    highlights: ["Punctuality", "Professionalism"],
    color: "#c4441f",
  },
  {
    name: "Kamal V.",
    rating: 5,
    text: "Installed suspended ceiling was well done.",
    highlights: ["Quality", "Professionalism"],
    color: "#1e5a4a",
  },
  {
    name: "Zohaib A.",
    rating: 5,
    text: "Excellent work done by professionals. Keep it up guys.",
    highlights: ["Responsiveness", "Punctuality", "Quality", "Professionalism", "Value"],
    color: "#d84a6b",
  },
  {
    name: "Leap Lp",
    rating: 5,
    text: "Great service highly recommended and professional thx.",
    highlights: ["Responsiveness", "Punctuality", "Quality", "Professionalism", "Value"],
    color: "#1f3c88",
  },
  {
    name: "Ataul S.",
    rating: 5,
    text: "Very professional and sincere with his work.",
    color: "#6aa84f",
  },
  {
    name: "Jagjeet R.",
    rating: 5,
    text: "Excellent work and also on time. I must recommend you, go with skylend enterprises",
    truncated: true,
    color: "#5b8c3a",
  },
  {
    name: "Jawad U.",
    rating: 5,
    text: "I got 10/10 service in a professional manner. Highly recommended",
    truncated: true,
    color: "#00838f",
  },
];
