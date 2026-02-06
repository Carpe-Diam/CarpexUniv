import React from 'react';

export interface SlideData {
    id: string;
    label: string;
    title: React.ReactNode;
    description: string;
    type: 'image' | 'video';
    src: string; // URL for image or video
    srcset?: string; // For images
    smallVideo?: string; // For the first slide which has a PIP video
    videoWidth?: number;
    videoHeight?: number;
}