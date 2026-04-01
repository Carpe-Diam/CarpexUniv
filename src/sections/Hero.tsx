import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Diamond, Box, Globe, Cpu, GitMerge } from 'lucide-react';

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);

    // Minimal orbit data representing the "Jewelry Ecosystem"
    const rings = [
        { size: 300, duration: 40, border: 'border-[#D4AF37]/30' },
        { size: 500, duration: 55, border: 'border-[#2a2725]/10' },
        { size: 700, duration: 70, border: 'border-[#2a2725]/10' },
    ];

    const nodes = [
        // Ring 1 (Inner - Core)
        { ring: 0, angle: 0, Icon: Diamond, label: 'Bespoke Design' },
        { ring: 0, angle: 180, Icon: Cpu, label: 'Tech Stack' },
        // Ring 2 (Middle - Operations)
        { ring: 1, angle: 90, Icon: GitMerge, label: 'Supply Chain' },
        { ring: 1, angle: 270, Icon: Box, label: 'Catalogue' },
        // Ring 3 (Outer - Reach)
        { ring: 2, angle: 45, Icon: Globe, label: 'Global Dist' },
    ];

    const getPosition = (ringIndex: number, angle: number) => {
        const radius = rings[ringIndex].size / 2;
        const rad = (angle * Math.PI) / 180;
        return {
            x: Math.cos(rad) * radius,
            y: Math.sin(rad) * radius
        };
    };

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

            // Orbit entrance
            tl.from('.orbit-ring', {
                scale: 0.8,
                opacity: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: "power2.out"
            }, "-=1");

            tl.from('.orbit-node', {
                scale: 0,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.5)"
            }, "-=1");

            // Continuous pure CSS-like rotation via GSAP
            rings.forEach((ring, i) => {
                // Rotate the ring container
                gsap.to(`.orbit-group-${i}`, {
                    rotation: i % 2 === 0 ? 360 : -360,
                    duration: ring.duration,
                    repeat: -1,
                    ease: 'none'
                });

                // Counter-rotate the nodes so they stay upright
                gsap.to(`.orbit-group-${i} .orbit-node-inner`, {
                    rotation: i % 2 === 0 ? -360 : 360,
                    duration: ring.duration,
                    repeat: -1,
                    ease: 'none'
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden flex flex-col justify-start bg-[#F9F7F2]"
        >
            {/* Top Left Logo */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20 hero-element">
                <img src="/cd-logo.svg" alt="Carpe Diam" className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto opacity-90" />
            </div>

            {/* Right Side: Technical Minimal Orbit Ecosystem */}
            {/* <div ref={orbitRef} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 md:translate-x-1/4 lg:translate-x-1/6 xl:translate-x-0 w-[800px] h-[800px] pointer-events-none z-0 opacity-40 md:opacity-100">
                Center Core dot
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#D4AF37] rounded-full shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#8c857d] text-[10px] uppercase tracking-widest mt-6 font-medium">Core</div>

                {rings.map((ring, i) => (
                    <div key={`ring-${i}`} className={`orbit-group orbit-group-${i} absolute inset-0 flex items-center justify-center`}>
                        The Ring itself
                        <div 
                            className={`orbit-ring absolute rounded-full border ${ring.border}`}
                            style={{ width: ring.size, height: ring.size }} 
                        />
                        
                        Nodes for this ring
                        {nodes.filter(n => n.ring === i).map((node, j) => {
                            const pos = getPosition(i, node.angle);
                            return (
                                <div
                                    key={`node-${i}-${j}`}
                                    className="orbit-node absolute z-10 left-1/2 top-1/2"
                                    style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
                                >
                                    Inner wrapper that counter-rotates
                                    <div className="orbit-node-inner flex flex-col items-center justify-center"
                                         style={{ transform: 'translate(-50%, -50%)' }}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-white border border-[#e2ddd8] shadow-sm flex items-center justify-center text-[#2a2725] relative group">
                                            <node.Icon size={16} strokeWidth={1.5} />
                                            Minimal connection dot
                                            <div className="absolute -inset-1 border border-[#D4AF37]/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                                        </div>
                                        <div className="mt-2 px-2 py-1 bg-white/80 backdrop-blur-sm border border-[#e2ddd8]/50 text-[#655f59] text-[9px] uppercase tracking-widest whitespace-nowrap rounded-sm shadow-sm">
                                            {node.label}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div> */}

            {/* Centered Content */}
            <div ref={contentRef} className="relative z-10 text-center max-w-5xl mx-auto px-8 md:px-12 lg:px-24 xl:px-32 pt-24 md:pt-28 w-full">

                {/* Sophisticated Consultancy Top Label */}
                <div className="hero-element mb-4 md:mb-6">
                    <span className="text-[#8c857d] font-sans text-xs md:text-sm tracking-[0.2em] uppercase font-medium border-b border-[#D4AF37]/40 pb-2">
                        Strategic Jewelry Operations
                    </span>
                </div>

                <h1 className="hero-element font-serif text-4xl md:text-5xl lg:text-6xl xl:text-[5.5rem] text-[#2a2725] leading-[1.1] mb-6 md:mb-8 font-normal tracking-tight">
                    Optimizing the business
                    of <span className="italic font-light text-[#1f1d1b]">fine jewelry.</span>
                </h1>

                <p className="hero-element text-[#655f59] font-sans text-base md:text-lg font-light mb-10 max-w-2xl mx-auto leading-relaxed">
                    We architect digital supply chains and custom catalogue solutions for modern jewelers, bridging legacy craftsmanship with scalable operational systems.
                </p>

                {/* Refined Corporate Actions */}
                <div className="hero-element flex flex-col sm:flex-row items-center justify-center gap-5">
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

                {/* Trust/Metric Indicators */}
                <div className="hero-element mt-12 md:mt-20 flex flex-wrap justify-center gap-x-12 gap-y-4 pt-6 border-t border-[#e2ddd8]">
                    <div>
                        <p className="text-[#a59d95] text-xs uppercase tracking-wider font-semibold mb-1">Ecosystem</p>
                        <p className="text-[#2a2725] text-sm md:text-base font-serif">End-to-End Digital Operations</p>
                    </div>
                    <div>
                        <p className="text-[#a59d95] text-xs uppercase tracking-wider font-semibold mb-1">Scale</p>
                        <p className="text-[#2a2725] text-sm md:text-base font-serif">Global Bespoke & Catalogue Supply</p>
                    </div>
                </div>
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
