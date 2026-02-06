import React from 'react';
import { type SlideData } from '../types';

interface SlideProps {
    data: SlideData;
    isActive: boolean;
}

export const Slide: React.FC<SlideProps> = ({ data, isActive }) => {
    return (
        <article
            className={`absolute inset-0 pb-[90px] lg:pb-[150px] flex flex-col justify-end transition-opacity duration-500 h-full w-full px-[clamp(1rem,4vw,2.5rem)] ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
        >
            {/* Background Media - Behind everything */}
            {data.type === 'image' ? (
                <picture className="absolute inset-0 z-0 select-none pointer-events-none">
                    {data.srcset && <source srcSet={data.srcset} sizes="100vw" />}
                    <img
                        className="w-full h-full object-cover object-center"
                        alt={data.label}
                        src={data.src}
                        loading="lazy"
                    />
                </picture>
            ) : (
                <video
                    muted
                    playsInline
                    autoPlay
                    loop
                    className="absolute inset-0 z-0 w-full h-full object-cover object-center pointer-events-none"
                >
                    <source src={data.src} type="video/mp4" />
                </video>
            )}

            {/* Content Header - On top of gradient */}
            <header className="relative z-10 flex flex-col gap-3">
                <h2 className="text-[32px] sm:text-[36px] lg:text-[72px] lg:w-[15ch] text-balance tracking-tight leading-[.95] font-semibold text-white">
                    {data.title}
                </h2>
                <p className="max-w-lg text-pretty text-white/90 text-base lg:text-lg">
                    {data.description}
                </p>
            </header>

            {/* Special Case: Small floating video for slides with smallVideo */}
            {data.smallVideo && (
                <a
                    href="#"
                    className="hidden lg:block absolute z-20 bg-white rounded-lg overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300"
                    style={{ right: 'clamp(1rem,4vw,2.5rem)', top: 'clamp(1rem,4vw,2.5rem)' }}
                >
                    <video
                        muted
                        playsInline
                        autoPlay
                        loop
                        className="h-[220px] w-[200px] object-cover object-center pointer-events-none"
                    >
                        <source src={data.smallVideo} type="video/mp4" />
                    </video>
                    <span className="block p-3.5 text-[12px] leading-none text-[#0a0a0a] text-center font-medium bg-white">
                        View more
                    </span>
                </a>
            )}
        </article>
    );
};