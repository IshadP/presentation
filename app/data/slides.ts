export interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  highlights?: string[];
  imageUrl: string;
  imageAlt?: string;
  imageCaption?: string;
  layout?: "split" | "hero" | "card";
  badge?: string;
}

export interface Topic {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  coverImage: string;
  slideCount: number;
  slides: Slide[];
  thankYouMessage: string;
}

export interface AboutMeSlide {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  bio: string;
  highlights: string[];
  stats: { label: string; value: string }[];
  imageUrl: string;
}

export const ABOUT_ME_SLIDES: AboutMeSlide[] = [
  {
    id: "about-1",
    title: "PRODUCT DESIGNER WHO CODES.",
    subtitle: "I ship end-to-end, creating apps with Flutter and web interactions with Framer Motion and TailwindCSS.",
    role: "Lead Product Designer & Systems Architect",
    bio: "I craft thoughtful digital experiences, scalable design systems, and complex product interfaces. Bridging the gap between high-craft UI/UX and resilient production code.",
    highlights: [
      "Specializing in SaaS, kiosk workflows, and design systems",
      "Obsessed with typography micro-details, interaction polish, and performance",
      "Full-stack design capabilities with Next.js, React, and Tailwind CSS",
    ],
    stats: [
      { label: "Experience", value: "4+ Years" },
      { label: "Projects Shipped", value: "18+" },
      { label: "Design Systems", value: "5 Built" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "about-2",
    title: "DESIGN PHILOSOPHY & CRAFT.",
    subtitle: "Functionality first, enhanced by uncompromising visual craft.",
    role: "Core Values",
    bio: "Great product design is not just how it looks, but how fast users complete their tasks with absolute confidence and delight.",
    highlights: [
      "Clarity over complexity — eliminate friction at every touchpoint",
      "Strict design tokens — consistent typography, spacing, and accessibility",
      "Iterative validation — rapid prototyping with real user testing",
    ],
    stats: [
      { label: "User Satisfaction", value: "94%" },
      { label: "Task Speedup", value: "3.2x" },
      { label: "Design Parity", value: "100%" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "about-3",
    title: "INTERACTIVE PRESENTATIONS.",
    subtitle: "Explore detailed case study decks and systems documentation.",
    role: "Overview",
    bio: "Welcome to this interactive presentation deck. From here, you can access individual topic modules covering end-to-end design case studies, design systems, and interaction workflows.",
    highlights: [
      "15 to 20 detailed slides per topic module",
      "Interactive topic navigation hub",
      "Comprehensive visual breakdowns and wireframes",
    ],
    stats: [
      { label: "Total Topics", value: "3 Modules" },
      { label: "Total Slides", value: "50+ Slides" },
      { label: "Navigation", value: "Instant Jump" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
  },
];

// TOPIC 1: Printhub Kiosk Redesign (15 slides)
const printhubSlides: Slide[] = [
  { id: "printhub-1", title: "", description: "", imageUrl: "/printhub/printhub-1.png" },
  { id: "printhub-2", title: "", description: "", imageUrl: "/printhub/printhub-2.png" },
  { id: "printhub-3", title: "", description: "", imageUrl: "/printhub/printhub-3.png" },
  { id: "printhub-4", title: "", description: "", imageUrl: "/printhub/printhub-4.png" },
  { id: "printhub-5", title: "", description: "", imageUrl: "/printhub/printhub-5.png" },
  { id: "printhub-6", title: "", description: "", imageUrl: "/printhub/printhub-6.png" },
  { id: "printhub-7", title: "", description: "", imageUrl: "/printhub/printhub-7.png" },
  { id: "printhub-8", title: "", description: "", imageUrl: "/printhub/printhub-8.png" },
  { id: "printhub-9", title: "", description: "", imageUrl: "/printhub/printhub-9.png" },
  { id: "printhub-10", title: "", description: "", imageUrl: "/printhub/printhub-10.png" },
  { id: "printhub-11", title: "", description: "", imageUrl: "/printhub/printhub-11.png" },
  { id: "printhub-12", title: "", description: "", imageUrl: "/printhub/printhub-12.png" },
  { id: "printhub-13", title: "", description: "", imageUrl: "/printhub/printhub-13.png" },
  { id: "printhub-14", title: "", description: "", imageUrl: "/printhub/printhub-14.png" },
  { id: "printhub-15", title: "", description: "", imageUrl: "/printhub/printhub-15.png" },
  { id: "printhub-16", title: "", description: "", imageUrl: "/printhub/printhub-16.png" },
  { id: "printhub-17", title: "", description: "", imageUrl: "/printhub/printhub-17.png" },
];



// TOPIC 2: YouTube Redesign (17 slides)
const youtubeSlides: Slide[] = [
  { id: "yt-1", title: "", description: "", imageUrl: "/youtube/yt-1.png" },
  { id: "yt-2", title: "", description: "", imageUrl: "/youtube/yt-2.png" },
  { id: "yt-3", title: "", description: "", imageUrl: "/youtube/yt-3.png" },
  { id: "yt-4", title: "", description: "", imageUrl: "/youtube/yt-4.png" },
  { id: "yt-5", title: "", description: "", imageUrl: "/youtube/yt-5.png" },
  { id: "yt-6", title: "", description: "", imageUrl: "/youtube/yt-6.png" },
  { id: "yt-7", title: "", description: "", imageUrl: "/youtube/yt-7.png" },
  { id: "yt-8", title: "", description: "", imageUrl: "/youtube/yt-8.png" },
  { id: "yt-9", title: "", description: "", imageUrl: "/youtube/yt-9.png" },
  { id: "yt-10", title: "", description: "", imageUrl: "/youtube/yt-10.png" },
  { id: "yt-11", title: "", description: "", imageUrl: "/youtube/yt-11.png" },
  { id: "yt-12", title: "", description: "", imageUrl: "/youtube/yt-12.png" },
  { id: "yt-13", title: "", description: "", imageUrl: "/youtube/yt-13.png" },
  { id: "yt-14", title: "", description: "", imageUrl: "/youtube/yt-14.png" },
  { id: "yt-15", title: "", description: "", imageUrl: "/youtube/yt-15.png" },
  { id: "yt-16", title: "", description: "", imageUrl: "/youtube/yt-16.png" },
  { id: "yt-17", title: "", description: "", imageUrl: "/youtube/yt-17.png" },
];

// TOPIC 3: Well Played Internship (18 slides)
const wellplayedSlides: Slide[] = [
  { id: "wp-1", title: "", description: "", imageUrl: "/wellplayed/wp-1.png" },
  { id: "wp-2", title: "", description: "", imageUrl: "/wellplayed/wp-2.png" },
  { id: "wp-3", title: "", description: "", imageUrl: "/wellplayed/wp-3.png" },
  { id: "wp-4", title: "", description: "", imageUrl: "/wellplayed/wp-4.png" },
  { id: "wp-5", title: "", description: "", imageUrl: "/wellplayed/wp-5.png" },
  { id: "wp-6", title: "", description: "", imageUrl: "/wellplayed/wp-6.png" },
  { id: "wp-7", title: "", description: "", imageUrl: "/wellplayed/wp-7.png" },
  { id: "wp-8", title: "", description: "", imageUrl: "/wellplayed/wp-8.png" },
  { id: "wp-9", title: "", description: "", imageUrl: "/wellplayed/wp-9.png" },
  { id: "wp-10", title: "", description: "", imageUrl: "/wellplayed/wp-10.png" },
  { id: "wp-11", title: "", description: "", imageUrl: "/wellplayed/wp-11.png" },
  { id: "wp-12", title: "", description: "", imageUrl: "/wellplayed/wp-12.png" },
  { id: "wp-13", title: "", description: "", imageUrl: "/wellplayed/wp-13.png" },
  { id: "wp-14", title: "", description: "", imageUrl: "/wellplayed/wp-14.png" },
  { id: "wp-15", title: "", description: "", imageUrl: "/wellplayed/wp-15.png" },
  { id: "wp-16", title: "", description: "", imageUrl: "/wellplayed/wp-16.png" },
  { id: "wp-17", title: "", description: "", imageUrl: "/wellplayed/wp-17.png" },
  { id: "wp-18", title: "", description: "", imageUrl: "/wellplayed/wp-18.png" },
];

export const TOPICS: Topic[] = [
  {
    id: "printhub",
    title: "Printhub Kiosk Redesign",
    subtitle: "Redesigning a kiosk printing app that was costing users time and money",
    category: "Case Study 01 • Product Design",
    coverImage: "/printhub/printhub-1.png",
    slideCount: printhubSlides.length,
    slides: printhubSlides,
    thankYouMessage: "Thank You! You have completed Topic 01: Printhub Kiosk Redesign.",
  },
  {
    id: "youtube",
    title: "YouTube Redesign",
    subtitle: "Rethinking content discovery, video watching experience, and navigation UX",
    category: "Case Study 02 • Product Design",
    coverImage: "/youtube/yt-1.png",
    slideCount: youtubeSlides.length,
    slides: youtubeSlides,
    thankYouMessage: "Thank You! You have completed Topic 02: YouTube Redesign.",
  },
  {
    id: "wellplayed",
    title: "Well Played Internship",
    subtitle: "Designing gaming interfaces, user engagement features, and product flows",
    category: "Case Study 03 • Product Design",
    coverImage: "/wellplayed/wp-1.png",
    slideCount: wellplayedSlides.length,
    slides: wellplayedSlides,
    thankYouMessage: "Thank You! You have completed Topic 03: Well Played Internship.",
  },
];
