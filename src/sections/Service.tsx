import React from 'react';
import { type SlideData } from '../types';

interface SlideProps {
    data: SlideData;
    isActive: boolean;
}

export const Slide: React.FC<SlideProps> = ({ data, isActive }) => {
    return (
        <article
            className={`absolute inset-0 flex transition-opacity duration-700 h-full w-full overflow-hidden ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            style={{ background: '#F9F7F2' }}
        >
            {/* Left Side - Content */}
            <div
                className="relative z-10 w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-20"
                style={{ background: '#F9F7F2' }}
            >
                {/* Category Label */}
                <div className="mb-6">
                    <span
                        style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '12px',
                            fontWeight: 600,
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            color: '#D4AF37',
                        }}
                    >
                        {data.label}
                    </span>
                    {/* Horizontal Line */}
                    <div
                        className="mt-4"
                        style={{
                            width: '40px',
                            height: '3px',
                            background: '#3C3633',
                        }}
                    />
                </div>

                {/* Large Serif Headline */}
                <h2
                    className="mb-8"
                    style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: 'clamp(42px, 6vw, 72px)',
                        fontWeight: 500,
                        fontStyle: 'italic',
                        color: '#3C3633',
                        lineHeight: 1.1,
                        letterSpacing: '-1px',
                    }}
                >
                    {data.headline}
                </h2>

                {/* Description */}
                <p
                    className="max-w-md mb-10"
                    style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '15px',
                        fontWeight: 400,
                        color: '#7A746E',
                        lineHeight: 1.7,
                    }}
                >
                    {data.description}
                </p>

                {/* CTA Button */}
                <button
                    className="self-start px-8 py-4 transition-all duration-300 hover:bg-[#3C3633] hover:text-white group"
                    style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        color: '#3C3633',
                        background: 'transparent',
                        border: '1px solid #3C3633',
                    }}
                >
                    {data.buttonText || 'View More'}
                </button>
            </div>

            {/* Right Side - Background Image */}
            <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full">
                {/* Gradient overlay for smooth blend */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        background: 'linear-gradient(to right, #F9F7F2 0%, transparent 30%)',
                    }}
                />

                {data.type === 'image' ? (
                    <picture className="absolute inset-0 z-0 select-none pointer-events-none">
                        {data.srcset && <source srcSet={data.srcset} sizes="50vw" />}
                        <img
                            className="w-full h-full object-cover object-center"
                            alt={data.label}
                            src={data.src}
                            loading="lazy"
                            style={{ opacity: 0.6 }}
                        />
                    </picture>
                ) : (
                    <video
                        muted
                        playsInline
                        autoPlay
                        loop
                        className="absolute inset-0 z-0 w-full h-full object-cover object-center pointer-events-none"
                        style={{ opacity: 0.6 }}
                    >
                        <source src={data.src} type="video/mp4" />
                    </video>
                )}
            </div>

            {/* Mobile Background */}
            <div
                className="lg:hidden absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, #F9F7F2 60%, rgba(249, 247, 242, 0.8) 100%)',
                }}
            />
        </article>
    );
};