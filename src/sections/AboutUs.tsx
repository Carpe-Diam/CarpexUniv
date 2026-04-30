import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutUs = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text animation
            gsap.from(textRef.current?.children || [], {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            });

            // Image animation
            gsap.from(imageRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                x: 100,
                opacity: 0,
                duration: 1.2,
                ease: 'power2.out'
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-24 md:py-32 px-8 md:px-16 lg:px-24 xl:px-32 bg-[#F9F7F2] overflow-hidden"
            id="about-us"
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 lg:gap-24">
                {/* Content Left */}
                <div ref={textRef} className="w-full md:w-1/2 space-y-8">
                    <div className="space-y-4">
                        <span className="text-[#D4AF37] font-semibold tracking-[0.2em] text-sm uppercase">
                            Crafting Excellence
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#2a2725] leading-tight">
                            About <br /> Univ Diam
                        </h2>
                    </div>

                    <div className="space-y-6 text-[#655f59] text-lg font-light leading-relaxed">
                        <p>
                            Univ Diam is a fine jewelry partner built on a <span className="text-[#2a2725] font-medium">Design–Manufacture–Deliver</span> model — combining creative capability, disciplined operational infrastructure, and strategic collaboration.
                        </p>
                        <p>
                            We serve as a true extension of independent retailers' teams, providing them with the scale and expertise required to thrive in a global market while maintaining the personal touch of a bespoke partner.
                        </p>
                        <p>
                            Our philosophy is rooted in precision and transparency, ensuring that every piece we create meets the highest standards of craftsmanship and ethical sourcing.
                        </p>
                    </div>

                    <div className="pt-4">
                        <div className="inline-flex items-center gap-4 text-[#2a2725] font-medium group cursor-pointer">
                            <span className="border-b border-[#D4AF37] pb-1 group-hover:border-[#2a2725] transition-colors">
                                Discover Our Heritage
                            </span>
                            <svg 
                                className="w-5 h-5 group-hover:translate-x-2 transition-transform" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Picture Right */}
                <div 
                    ref={imageRef} 
                    className="w-full md:w-1/2 relative group"
                >
                    <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
                        <img
                            src="/about-us.png"
                            alt="Univ Diam Craftsmanship"
                            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                        />
                        
                        {/* The "Fade Away" Mask Overlay */}
                        <div 
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: 'linear-gradient(to right, #F9F7F2 0%, rgba(249, 247, 242, 0) 20%, rgba(249, 247, 242, 0) 80%, #F9F7F2 100%), linear-gradient(to bottom, #F9F7F2 0%, rgba(249, 247, 242, 0) 15%, rgba(249, 247, 242, 0) 85%, #F9F7F2 100%)'
                            }}
                        />
                        
                        {/* Decorative refined borders */}
                        <div className="absolute inset-4 border border-white/20 pointer-events-none" />
                    </div>
                    
                    {/* Floating Accent Element */}
                    <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#D4AF37]/10 -z-10" />
                    <div className="absolute -top-8 -right-8 w-24 h-24 border-r border-t border-[#D4AF37]/30 -z-10" />
                </div>
            </div>
        </section>
    );
};
