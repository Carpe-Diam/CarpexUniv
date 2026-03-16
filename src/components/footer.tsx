import React from 'react';
import type { SlideData } from '../types';

interface FooterProps {
    slides: SlideData[];
    currentSlideIndex: number;
    slideProgress: number;
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
            className="relative z-10 flex gap-2.5 w-full bg-[#F9F7F2]"
            style={{
                background: '#F9F7F2',
                // Muted border top for sophisticated definition
                borderTop: '1px solid rgba(140, 133, 125, 0.1)',
                padding: 'clamp(1rem,4vw,2.5rem)',
                paddingBottom: 'clamp(1rem,4vw,2.5rem)',
            }}
        >
            {slides.map((slide, index) => {
                const isActive = index === currentSlideIndex;
                const isPast = index < currentSlideIndex;
                const progressWidth = isActive ? `${slideProgress * 100}%` : (isPast ? '100%' : '0%');

                return (
                    <button
                        key={slide.id}
                        onClick={() => onNavigate(index)}
                        className="relative flex-1 text-left pt-6 pb-2 group outline-none cursor-pointer transition-colors duration-300"
                        style={{ 
                            // Static grey background line for the track
                            backgroundColor: 'transparent',
                        }}
                    >
                        {/* Static Track Line */}
                        <div
                            className="absolute top-0 left-0 w-full h-[1px] pointer-events-none"
                            style={{
                                background: 'rgba(42, 39, 37, 0.1)' // #2a2725 at 10%
                            }}
                        />

                        {/* Animated Progress line */}
                        <div
                            className="absolute left-0 h-[1.5px] pointer-events-none shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                            style={{
                                width: progressWidth,
                                top: '-0.25px',
                                transition: 'width 75ms linear',
                                background: '#D4AF37', // Gold 
                            }}
                        />

                        {/* Container for alignment scaling */}
                        <div className={`transition-all duration-300 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-60 hover:opacity-100'}`}>
                            {/* Number - Desktop & Mobile */}
                            <span
                                className="block mb-2 font-serif italic"
                                style={{
                                    color: isActive ? '#2a2725' : '#8c857d',
                                    fontSize: isActive ? '16px' : '14px',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            
                            {/* Label - desktop */}
                            <div className="hidden lg:block overflow-hidden">
                                <span
                                    className="block transition-all duration-500 transform"
                                    style={{
                                        color: isActive ? '#2a2725' : '#8c857d',
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontSize: isActive ? '13px' : '11px',
                                        fontWeight: isActive ? 500 : 400,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.2em',
                                    }}
                                >
                                    {slide.label}
                                </span>
                            </div>
                        </div>
                    </button>
                );
            })}
            
            {/* Mobile active label (Cleaned up) */}
            <div
                className="lg:hidden absolute right-4 bottom-6 transition-all duration-300"
                style={{
                    color: '#2a2725',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '11px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                }}
            >
                {slides[currentSlideIndex]?.label}
            </div>
        </footer>
    );
};