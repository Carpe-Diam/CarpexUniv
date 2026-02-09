import React from 'react';
import { type SlideData } from './types';

export const SLIDES: SlideData[] = [
  {
    id: 'catalogue',
    label: 'Ready Catalogue',
    title: <>Ready Catalogue – <br className="hidden lg:block" />Pick. Order. Deliver.</>,
    headline: <>Pick. Order.<br />Deliver.</>,
    description: 'Choose from our curated jewellery catalogue, designed keeping market demand and commercial viability in mind.',
    buttonText: 'View Catalogue',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&q=80',
    srcset: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=3840&q=80 3840w, https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&q=80 1920w',
  },
  {
    id: 'custom',
    label: 'Custom Jewellery',
    title: <>Custom Jewellery – <br className="hidden lg:block" />From Idea to Execution</>,
    headline: <>From Idea<br />to Execution.</>,
    description: 'Place custom made-to-order requests through a dedicated portal, making it easy to specify your jewelry needs and manage bespoke orders seamlessly.',
    buttonText: 'Start Custom Order',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1920&q=80',
    srcset: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=3840&q=80 3840w, https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1920&q=80 1920w',
  },
  {
    id: 'growth',
    label: 'Brand Growth',
    title: <>Brand Growth Systems</>,
    headline: <>Grow Your<br />Business.</>,
    description: 'We don\'t just make jewellery. We help you run the business. Our backend and digital ecosystem is built to simplify operations and support scalable growth.',
    buttonText: 'Explore Solutions',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=80',
    srcset: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=3840&q=80 3840w, https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=80 1920w',
  },
];