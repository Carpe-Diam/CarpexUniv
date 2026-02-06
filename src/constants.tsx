import React from 'react';
import { type SlideData } from './types';

export const SLIDES: SlideData[] = [
  {
    id: 'catalogue',
    label: 'Ready Catalogue',
    title: <>Ready Catalogue – <br className="hidden lg:block" />Pick. Order. Deliver.</>,
    description: 'Choose from our curated jewellery catalogue, designed keeping market demand and commercial viability in mind. Simply select the design, place your order directly through our portal, and get it delivered to you.',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80',
    srcset: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=3840&q=80 3840w, https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80 1920w',
  },
  {
    id: 'custom',
    label: 'Custom Jewellery',
    title: <>Custom Jewellery – <br className="hidden lg:block" />From Idea to Execution</>,
    description: 'Place custom made-to-order requests through a dedicated portal, making it easy to specify your jewelry needs and manage bespoke orders seamlessly.',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1920&q=80',
    srcset: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=3840&q=80 3840w, https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1920&q=80 1920w',
  },
  {
    id: 'growth',
    label: 'Brand Growth',
    title: <>Brand Growth Systems</>,
    description: 'We don\'t just make jewellery. We help you run the business. Our backend and digital ecosystem is built to simplify operations, streamline selling, and support scalable growth for jewellery businesses.',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1920&q=80',
    srcset: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=3840&q=80 3840w, https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1920&q=80 1920w',
  },
];