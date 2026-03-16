import React, { useEffect, useRef } from 'react';
import { type SlideData } from '../types';
import gsap from 'gsap';

interface SlideProps {
    data: SlideData;
    isActive: boolean;
}

export const Slide: React.FC<SlideProps> = ({ data, isActive }) => {
    const slideRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    // Add entry animations when slide becomes active
    useEffect(() => {
        if (!isActive || !contentRef.current || !imageRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            
            // Subtle image scale-down effect
            gsap.fromTo(imageRef.current,
                { scale: 1.1, filter: 'brightness(0.8)' },
                { scale: 1, filter: 'brightness(1)', duration: 2, ease: 'power2.out' }
            );

            // Staggered content reveal
            tl.fromTo('.slide-element',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
            );
            
            // Line expand
            tl.fromTo('.slide-line',
                { width: 0 },
                { width: 40, duration: 0.8, ease: 'power2.out' },
                "-=0.8"
            );

        }, slideRef);

        return () => ctx.revert();
    }, [isActive]);

    return (
        <article
            ref={slideRef}
            className={`absolute inset-0 flex transition-opacity duration-1000 h-full w-full overflow-hidden ${isActive ? 'opacity-100 pointer-events-auto z-20' : 'opacity-0 pointer-events-none z-10'
                }`}
            style={{ background: '#F9F7F2' }}
        >
            {/* Left Side - Content */}
            <div
                ref={contentRef}
                className="relative z-10 w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-20"
                style={{ background: '#F9F7F2' }}
            >
                {/* Category Label */}
                <div className="mb-8">
                    <span
                        className="slide-element inline-block"
                        style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.25em',
                            textTransform: 'uppercase',
                            color: '#8c857d', // Muted consultancy taupe
                        }}
                    >
                        {data.label}
                    </span>
                    {/* Horizontal Line */}
                    <div
                        className="slide-line mt-4"
                        style={{
                            width: '40px',
                            height: '1px',
                            background: '#D4AF37', // Gold accent
                        }}
                    />
                </div>

                {/* Large Serif Headline */}
                <h2
                    className="slide-element mb-8 whitespace-pre-line"
                    style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: 'clamp(42px, 6vw, 76px)',
                        fontWeight: 400, // Thinner, elegant weight
                        color: '#2a2725', // Deep charcoal
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                    }}
                >
                    {data.headline}
                </h2>

                {/* Description */}
                <p
                    className="slide-element max-w-md mb-12 pl-4 border-l border-[#e2ddd8]"
                    style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '16px',
                        fontWeight: 300, // Lighter, editorial feel
                        color: '#655f59', // Softer grey
                        lineHeight: 1.8,
                    }}
                >
                    {data.description}
                </p>

                {/* CTA Button */}
                <button
                    className="slide-element self-start transition-all duration-500 overflow-hidden relative group"
                >
                    <div className="flex items-center gap-4 text-[#2a2725] hover:text-[#D4AF37] transition-colors pb-2 border-b border-[#2a2725]/20 hover:border-[#D4AF37]/50">
                        <span style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '12px',
                            fontWeight: 500,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                        }}>
                             {data.buttonText || 'Discover More'}
                        </span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </button>
            </div>

            {/* Right Side - Background Image */}
            <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full bg-[#EEEDE9] overflow-hidden">
                {/* Smooth Gradient overlay blending into image */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        background: 'linear-gradient(to right, #F9F7F2 0%, transparent 25%)',
                    }}
                />

                {data.type === 'image' ? (
                    <picture className="absolute inset-0 z-0 select-none pointer-events-none w-full h-full">
                        {data.srcset && <source srcSet={data.srcset} sizes="50vw" />}
                        <img
                            ref={imageRef}
                            className="w-full h-full object-cover object-center transform -scale-x-100" // Flip if needed, or remove. Assuming Unsplash aesthetic fits standard.
                            alt={data.label}
                            src={data.src}
                            loading="lazy"
                            style={{ opacity: 0.85, transformOrigin: 'center' }} 
                        />
                    </picture>
                ) : (
                    <video
                        muted
                        playsInline
                        autoPlay
                        loop
                        className="absolute inset-0 z-0 w-full h-full object-cover object-center pointer-events-none"
                        style={{ opacity: 0.85 }}
                    >
                        <source src={data.src} type="video/mp4" />
                    </video>
                )}
            </div>

            {/* Mobile Background */}
            <div
                className="lg:hidden absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, #F9F7F2 60%, rgba(249, 247, 242, 0.9) 100%)',
                }}
            />
        </article>
    );
};