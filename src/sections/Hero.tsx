import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Content entrance - staggered fade in like About Us
            tl.from('.hero-element', {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen overflow-hidden flex flex-col md:flex-row bg-[#F9F7F2]"
        >
            {/* Left Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 py-20 md:py-0 z-10">
                {/* Logo */}
                <div className="mb-12 hero-element">
                    <img src="/UD.png" alt="Carpe Diam" className="h-8 md:h-12 w-auto opacity-90" />
                </div>

                <div ref={textRef} className="space-y-8">
                    <h1 className="hero-element text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#2a2725] leading-[1.1] font-normal tracking-tight">
                        Design. <br />
                        Manufacture. <br />
                        Deliver.
                    </h1>
                    <p className="hero-element text-[#655f59] text-lg md:text-xl font-light max-w-lg leading-relaxed">
                        Setting the standard for operational excellence in fine jewelry production — becoming the most trusted end-to-end partner for independent jewelry retailers.
                    </p>
                    
                    <div className="pt-4 hero-element">
                        <button className="btn-primary px-8 py-4 text-sm tracking-widest">
                            Explore Collections
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Video Content */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/hero.mp4" type="video/mp4" />
                </video>
                
                {/* Subtle overlay to soften the video if needed */}
                <div className="absolute inset-0 bg-[#F9F7F2]/5 pointer-events-none" />
                
                {/* The "Fade Away" Mask Overlay (similar to About Us) */}
                <div 
                    className="absolute inset-0 pointer-events-none hidden md:block"
                    style={{
                        background: 'linear-gradient(to right, #F9F7F2 0%, rgba(249, 247, 242, 0) 15%)'
                    }}
                />
            </div>

            {/* Elegant minimal scroll indicator */}
            <div 
                className="absolute bottom-12 left-8 md:left-16 z-20 hidden md:flex flex-col items-center gap-4 cursor-pointer hero-element opacity-60 hover:opacity-100 transition-opacity"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <span className="text-[#2a2725] text-[10px] uppercase tracking-[0.2em] [writing-mode:vertical-rl]">
                    Scroll
                </span>
                <div className="w-[1px] h-12 bg-[#2a2725]/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-[#2a2725] animate-[scrollDown_1.5s_ease-in-out_infinite]" />
                </div>
            </div>

            <style>{`
                @keyframes scrollDown {
                    0% { transform: translateY(-100%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(200%); opacity: 0; }
                }
            `}</style>
        </section>
    );
};
