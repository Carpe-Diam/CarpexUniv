import React from 'react';

export interface SlideData {
    id: string;
    label: string;
    title: React.ReactNode;
    headline: React.ReactNode; // Large italic headline for the new design
    description: string;
    buttonText?: string; // CTA button text
    type: 'image' | 'video';
    src: string; // URL for image or video
    srcset?: string; // For images
    smallVideo?: string; // For the first slide which has a PIP video
    videoWidth?: number;
    videoHeight?: number;
}
