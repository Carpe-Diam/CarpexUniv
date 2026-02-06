import React from 'react';
import { type SlideData } from '../types';

interface FooterProps {
    slides: SlideData[];
    currentSlideIndex: number;
    slideProgress: number; // 0 to 1 for current slide
    onNavigate: (index: number) => void;
}

export const Footer: React.FC<FooterProps> = ({
    slides,
    currentSlideIndex,
    slideProgress,
    onNavigate,
}) => {
    return (
        <footer
            className="relative z-10 flex gap-2.5 lg:gap-5 w-full text-white"
            style={{ padding: 'clamp(1rem,4vw,2.5rem)', paddingBottom: 'clamp(1rem,4vw,2.5rem)' }}
        >
            {slides.map((slide, index) => {
                // Calculate the width of the progress line for this button
                let progressWidth = '0%';
                if (index < currentSlideIndex) {
                    progressWidth = '100%';
                } else if (index === currentSlideIndex) {
                    progressWidth = `${slideProgress * 100}%`;
                }

                return (
                    <button
                        key={slide.id}
                        onClick={() => onNavigate(index)}
                        className="relative flex-1 text-left border-t-2 pt-4 lg:pt-6 border-white/20 leading-none group outline-none cursor-pointer"
                    >
                        {/* The active progress line overlay */}
                        <div
                            className="absolute left-0 h-[2px] bg-white pointer-events-none"
                            style={{
                                width: progressWidth,
                                top: '-2px',
                                transition: 'width 75ms linear'
                            }}
                        />

                        {/* Label - visible on desktop, hidden on mobile */}
                        <div className="hidden lg:block">
                            <span aria-hidden="true" className="font-mono text-sm mr-1 opacity-60">
                                0{index + 1}.
                            </span>
                            <span className="text-sm font-medium">
                                {slide.label}
                            </span>
                        </div>
                    </button>
                );
            })}

            {/* Mobile active label indicator */}
            <div
                aria-hidden="true"
                className="absolute lg:hidden text-sm font-medium pointer-events-none"
                style={{
                    bottom: 'clamp(1rem,4vw,2.5rem)',
                    left: 'clamp(1rem,4vw,2.5rem)'
                }}
            >
                <span className="opacity-60 font-mono mr-1">0{currentSlideIndex + 1}.</span>
                {slides[currentSlideIndex]?.label}
            </div>
        </footer>
    );
};