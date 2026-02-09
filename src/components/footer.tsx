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
            className="relative z-10 flex gap-2.5 lg:gap-5 w-full"
            style={{
                padding: 'clamp(1rem,4vw,2.5rem)',
                paddingBottom: 'clamp(1rem,4vw,2.5rem)',
                background: '#F9F7F2',
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
                        className="relative flex-1 text-left pt-4 lg:pt-6 leading-none group outline-none cursor-pointer"
                        style={{ borderTop: '2px solid rgba(212, 175, 55, 0.3)' }}
                    >
                        {/* Progress line */}
                        <div
                            className="absolute left-0 h-[2px] pointer-events-none"
                            style={{
                                width: progressWidth,
                                top: '-2px',
                                transition: 'width 75ms linear',
                                background: '#D4AF37',
                            }}
                        />
                        {/* Label - desktop */}
                        <div className="hidden lg:block">
                            <span
                                className="block mb-1"
                                style={{
                                    color: isActive ? '#D4AF37' : 'rgba(60, 54, 51, 0.4)',
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontSize: '12px',
                                    fontWeight: 500,
                                }}
                            >
                                0{index + 1}
                            </span>
                            <span
                                className="block transition-colors duration-300"
                                style={{
                                    color: isActive ? '#3C3633' : 'rgba(60, 54, 51, 0.5)',
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontSize: '13px',
                                    fontWeight: 500,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                }}
                            >
                                {slide.label}
                            </span>
                        </div>
                        {/* Number - mobile */}
                        <span
                            className="block lg:hidden"
                            style={{
                                color: isActive ? '#D4AF37' : 'rgba(60, 54, 51, 0.4)',
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: '12px',
                                fontWeight: 500,
                            }}
                        >
                            0{index + 1}
                        </span>
                    </button>
                );
            })}
            {/* Mobile active label */}
            <div
                className="lg:hidden absolute right-4 bottom-4"
                style={{
                    color: '#3C3633',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                }}
            >
                {slides[currentSlideIndex]?.label}
            </div>
        </footer>
    );
};