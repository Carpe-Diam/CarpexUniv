import { type SlideData } from './types';

export const SLIDES: SlideData[] = [
  {
    id: 'design',
    label: 'Design',
    title: <>Design – <br className="hidden lg:block" />Structured Creativity.</>,
    headline: <>Structured<br />Creativity.</>,
    description: 'Curated collections alongside custom and bespoke capabilities — streamlined through modern, collaborative tools to make creativity predictable and scalable, while preserving the artistry behind every piece.',
    buttonText: 'View More',
    type: 'image',
    src: '/Design1.png',
  },
  {
    id: 'manufacture',
    label: 'Manufacture',
    title: <>Manufacture – <br className="hidden lg:block" />Operational Precision.</>,
    headline: <>Operational<br />Precision.</>,
    description: 'Structured, transparent processes and defined quality standards guiding every stage of production — delivering craftsmanship with speed and value, without compromise.',
    buttonText: 'View More',
    type: 'image',
    src: '/manufacture.png',
  },
  {
    id: 'deliver',
    label: 'Deliver',
    title: <>Deliver – <br className="hidden lg:block" />Beyond the Showroom.</>,
    headline: <>Beyond the<br />Showroom.</>,
    description: 'From branded packaging to direct-to-consumer drop shipping, we extend your brand beyond the showroom — enabling independent retailers to operate with the capabilities of larger brands while preserving their identity.',
    buttonText: 'View More',
    type: 'image',
    src: '/Deliver.png',
  },
];