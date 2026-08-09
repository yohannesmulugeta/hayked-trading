import site from '../content/site.json';
import home from '../content/pages/home.json';
import about from '../content/pages/about.json';
import quality from '../content/pages/quality.json';
import sustainability from '../content/pages/sustainability.json';
import type { IconName } from '../components/Icon';

export type SiteContent = typeof site;
export type HomeContent = typeof home;
export type AboutContent = typeof about;
export type QualityContent = typeof quality;
export type SustainabilityContent = typeof sustainability;

export type Coffee = {
  slug: string;
  name: string;
  origin: string;
  region: string;
  process: string;
  summary: string;
  image: string;
  featured: boolean;
  published: boolean;
  status: string;
  details: string[];
};

export type Service = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  icon: IconName;
};

export type GalleryItem = {
  title: string;
  caption: string;
  image: string;
  alt: string;
  order: number;
};

function loadCollection<T>(modules: Record<string, unknown>): T[] {
  return Object.values(modules).map((module) => {
    const wrapped = module as { default?: T };
    return (wrapped.default ?? module) as T;
  });
}

const coffees = loadCollection<Coffee>(import.meta.glob('../content/coffees/*.json', { eager: true }))
  .filter((coffee) => coffee.published);

export const content = {
  site,
  home,
  about,
  quality,
  sustainability,
  coffees,
  services: loadCollection<Service>(import.meta.glob('../content/services/*.json', { eager: true })).sort((a, b) => a.number.localeCompare(b.number)),
  gallery: loadCollection<GalleryItem>(import.meta.glob('../content/gallery/*.json', { eager: true })).sort((a, b) => a.order - b.order),
};

export const processSteps = [
  'Requirement review',
  'Receiving and lot identification',
  'Sampling and physical review',
  'Processing and sorting',
  'Quality evaluation',
  'Warehousing and lot control',
  'Bagging and documentation',
  'Shipment coordination',
];

export const qualityStages = [
  ['Receiving', 'Identify the coffee, source information and buyer requirement before preparation begins.'],
  ['Sampling', 'Take a representative sample and record the agreed physical and quality checks.'],
  ['Preparation', 'Process and sort coffee using the approved service scope and buyer specification.'],
  ['Evaluation', 'Review the prepared coffee and coordinate samples or approvals with the buyer.'],
  ['Storage', 'Keep lots clearly separated and labelled while they await dispatch.'],
  ['Release', 'Confirm packaging, documentation and shipment coordination before release.'],
] as const;
