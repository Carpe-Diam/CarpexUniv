import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(containerRef.current, { opacity: 0, duration: 1.5, ease: 'power2.out' })
              .from('.hero-element', {
                  y: 30,
                  opacity: 0,
                  duration: 1.2,
                  stagger: 0.1,
                  ease: 'power3.out'
              }, "-=1");

            // Very subtle and slow floating animation for background elements
            gsap.to('.hero-shape-1', {
                y: '-20px',
                x: '10px',
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            gsap.to('.hero-shape-2', {
                y: '15px',
                x: '-15px',
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 1 // offset the animation
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden flex flex-col justify-center bg-[#F9F7F2]"
        >
            {/* Minimalist Abstract Background Shapes (representing facets/jewelry and growth) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60">
                {/* Large soft gold sphere/glow representing value */}
                <div className="hero-shape-1 absolute -top-[10%] -right-[5%] w-[800px] h-[800px] bg-gradient-radial from-[#EAE2CA] to-transparent rounded-full opacity-40 blur-[80px]" />
                
                {/* Sharp angled geometric shape hinting at a diamond cut / structure */}
                <div className="hero-shape-2 absolute bottom-[10%] -left-[10%] w-[600px] h-[600px] bg-[#EEEDE9] rotate-[15deg] origin-bottom-left skew-x-[20deg] blur-[1px] opacity-70" style={{ clipPath: 'polygon(0 0, 100% 20%, 80% 100%, 0 80%)' }} />
            </div>

            {/* Top Left Logo (Dark for light theme) */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20 hero-element">
                <img src="/cd-logo.svg" alt="Carpe Diam" className="h-8 md:h-10 w-auto opacity-90" />
            </div>

            {/* Content Left-Aligned for Corporate/Consultancy Look */}
            <div ref={contentRef} className="relative z-10 text-left max-w-5xl px-8 md:px-12 lg:px-24 xl:px-32 mt-12 w-full">
                
                {/* Sophisticated Consultancy Top Label */}
                <div className="hero-element mb-8">
                    <span className="text-[#8c857d] font-sans text-xs md:text-sm tracking-[0.2em] uppercase font-medium border-b border-[#D4AF37]/40 pb-2">
                        Strategic Jewelry Operations
                    </span>
                </div>
                
                <h1 className="hero-element font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#2a2725] leading-[1.1] mb-8 font-normal tracking-tight">
                    Optimizing the business <br className="hidden md:block"/>
                    of <span className="italic font-light text-[#1f1d1b]">fine jewelry.</span>
                </h1>

                <p className="hero-element text-[#655f59] font-sans text-lg md:text-xl font-light mb-12 max-w-2xl leading-relaxed">
                    We architect digital supply chains and custom catalogue solutions for modern jewelers, bridging legacy craftsmanship with scalable operational systems.
                </p>

                {/* Refined Corporate Actions */}
                <div className="hero-element flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    <button
                        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                        className="bg-[#2a2725] text-white px-8 py-4 rounded-none font-sans font-medium hover:bg-[#1f1d1b] transition-all duration-300 w-full sm:w-auto text-center"
                    >
                        Explore Our Systems
                    </button>
                    <button
                        onClick={() => window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' })}
                        className="bg-transparent border border-[#d3cecb] text-[#2a2725] px-8 py-4 rounded-none font-sans font-medium hover:bg-[#EEEDE9] transition-all duration-300 w-full sm:w-auto text-center"
                    >
                        Book a Consultation
                    </button>
                </div>

                {/* Trust/Metric Indicators (Consultancy Vibe) */}
                <div className="hero-element mt-16 md:mt-24 flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t border-[#e2ddd8]">
                     <div>
                        <p className="text-[#a59d95] text-xs uppercase tracking-wider font-semibold mb-1">Expertise</p>
                        <p className="text-[#2a2725] text-sm md:text-base font-serif">Bespoke & Catalogue Supply</p>
                     </div>
                     <div>
                        <p className="text-[#a59d95] text-xs uppercase tracking-wider font-semibold mb-1">Advantage</p>
                        <p className="text-[#2a2725] text-sm md:text-base font-serif">End-to-End Digital Operations</p>
                     </div>
                </div>
            </div>

            {/* Elegant minimal scroll indicator */}
            <div className="absolute bottom-12 right-12 z-20 hidden md:flex flex-col items-center gap-4 cursor-pointer hero-element opacity-60 hover:opacity-100 transition-opacity"
                 onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                <span className="text-[#2a2725] text-[10px] uppercase tracking-[0.2em] font-sans [writing-mode:vertical-rl]">
                    Discover
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
