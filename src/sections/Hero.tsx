import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Content entrance
            tl.from(containerRef.current, { opacity: 0, duration: 1, ease: 'power2.out' })
                .from('.hero-element', {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power3.out'
                }, "-=0.5");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center bg-[#F9F7F2]"
        >
            {/* Top Left Logo */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20 hero-element">
                <img src="/UD.png" alt="Carpe Diam" className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto opacity-90" />
            </div>



            {/* Centered Content */}
            <div ref={contentRef} className="relative z-10 text-center max-w-7xl mx-auto px-8 md:px-12 lg:px-24 xl:px-32 w-full">

                {/* Sophisticated Consultancy Top Label */}
                {/* <div className="hero-element mb-4 md:mb-6">
                    <span className="text-[#8c857d] font-sans text-xs md:text-sm tracking-[0.2em] uppercase font-medium border-b border-[#D4AF37]/40 pb-2">
                        Strategic Jewelry Operations
                    </span>
                </div> */}

                <h1 className="hero-element text-4xl md:text-5xl lg:text-6xl xl:text-[5.5rem] text-[#2a2725] leading-[1.1] mb-6 md:mb-8 font-normal tracking-tight">
                    Design. Manufacture. Deliver.
                </h1>

                <p className="hero-element text-[#655f59] font-sans text-base md:text-lg font-light mb-10 mx-auto leading-relaxed">
                    Setting the standard for operational excellence in fine jewelry production — becoming the most trusted end-to-end partner for independent jewelry retailers.
                </p>

                {/* Refined Corporate Actions */}
                {/* <div className="hero-element flex flex-col sm:flex-row items-center justify-center gap-5">
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
                </div> */}

                {/* Trust/Metric Indicators */}
                {/* <div className="hero-element mt-12 md:mt-20 flex flex-wrap justify-center gap-x-12 gap-y-4 pt-6 border-t border-[#e2ddd8]">
                    <div>
                        <p className="text-[#a59d95] text-xs uppercase tracking-wider font-semibold mb-1">Ecosystem</p>
                        <p className="text-[#2a2725] text-sm md:text-base font-serif">End-to-End Digital Operations</p>
                    </div>
                    <div>
                        <p className="text-[#a59d95] text-xs uppercase tracking-wider font-semibold mb-1">Scale</p>
                        <p className="text-[#2a2725] text-sm md:text-base font-serif">Global Bespoke & Catalogue Supply</p>
                    </div>
                </div> */}

            </div>

            {/* Elegant minimal scroll indicator */}
            <div className="absolute bottom-12 right-12 z-20 hidden md:flex flex-col items-center gap-4 cursor-pointer hero-element opacity-60 hover:opacity-100 transition-opacity"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                <span className="text-[#2a2725] text-[10px] uppercase tracking-[0.2em] font-sans [writing-mode:vertical-rl]">
                    System
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
