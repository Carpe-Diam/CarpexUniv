import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
    Gem,
    Circle, // Using Ring generic icon if available, or Circle
    Search, // For "Source" loop
    TrendingUp, // For "Growth" chart
    User, // For "Human-led"
    Link, // For "Connection"
    Diamond,
    MousePointer2
} from 'lucide-react';

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Icon data structure for placement
    // Ring indices: 1 = inner, 2 = middle, 3 = outer
    const icons = [
        // Inner Ring - No icons


        // Middle Ring
        { Icon: Diamond, ring: 2, angle: 135, color: '#1e3a8a', bg: '#F9F7F2', borderColor: '#1e3a8a' }, // Blue diamond
        { Icon: Search, ring: 2, angle: 330, color: '#D4AF37', bg: '#F9F7F2' },
        { Icon: Circle, ring: 2, angle: 240, color: '#D4AF37', bg: '#F9F7F2' },
        { Icon: User, ring: 2, angle: 45, color: '#D4AF37', bg: '#F9F7F2' },

        // Outer Ring - More populated
        { Icon: Gem, ring: 3, angle: 45, color: '#D4AF37', bg: '#F9F7F2' },
        { Icon: Circle, ring: 3, angle: 100, color: '#D4AF37', bg: '#F9F7F2' },
        { Icon: TrendingUp, ring: 3, angle: 190, color: '#D4AF37', bg: '#F9F7F2' },
        { Icon: User, ring: 3, angle: 300, color: '#D4AF37', bg: '#F9F7F2' },
        { Icon: MousePointer2, ring: 3, angle: 250, color: '#D4AF37', bg: '#F9F7F2', size: 16 },
        { Icon: Diamond, ring: 3, angle: 10, color: '#D4AF37', bg: '#F9F7F2' },
        { Icon: Link, ring: 3, angle: 150, color: '#D4AF37', bg: '#F9F7F2' },
        { Icon: Search, ring: 3, angle: 340, color: '#D4AF37', bg: '#F9F7F2' },
    ];

    // Helper to calculate position for CIRCULAR orbits
    // NOTE: This now calculates position RELATIVE TO THE CONTAINER CENTER (0,0)
    // allowing it to work inside the centered .orbit-group
    const getPosition = (ringIndex: number, angle: number) => {
        // Radii for rings (circles)
        // 1=Small, 2=Medium, 3=Large
        const diameters = [0, 450, 680, 950];

        const radius = diameters[ringIndex] / 2;

        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return { x, y };
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Initial Fade In
            gsap.from(containerRef.current, { opacity: 0, duration: 1 });

            // 2. Rings Expansion
            gsap.from('.hero-ring', {
                scale: 0.8,
                opacity: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: "power2.out"
            });

            // 3. Icons Pop In
            gsap.from('.hero-icon', {
                scale: 0,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                delay: 0.5,
                ease: "back.out(1.7)"
            });

            // 4. Content Fade Up
            gsap.from(contentRef.current, {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.8,
                ease: "power2.out"
            });

            // 5. Continuous Rotation
            // Rotate the entire orbit group (ring + icons)
            // Ring 1 (slower)
            gsap.to('.orbit-group-1', { rotation: 360, duration: 45, repeat: -1, ease: 'none' });
            // Counter-rotate Ring 1 icons
            gsap.to('.orbit-group-1 .hero-icon-inner', { rotation: -360, duration: 45, repeat: -1, ease: 'none' });

            // Ring 2 (Counter-clockwise, medium)
            gsap.to('.orbit-group-2', { rotation: -360, duration: 55, repeat: -1, ease: 'none' });
            // Counter-rotate Ring 2 icons
            gsap.to('.orbit-group-2 .hero-icon-inner', { rotation: 360, duration: 55, repeat: -1, ease: 'none' });

            // Ring 3 (fastest or slowest? Let's go slowest for outer)
            gsap.to('.orbit-group-3', { rotation: 360, duration: 65, repeat: -1, ease: 'none' });
            // Counter-rotate Ring 3 icons
            gsap.to('.orbit-group-3 .hero-icon-inner', { rotation: -360, duration: 65, repeat: -1, ease: 'none' });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-[#F9F7F2]"
        >
            {/* Top Left Logo */}
            <div className="absolute top-8 left-8 z-20">
                <span className="font-serif text-2xl text-[#3C3633]">Carpe Diam</span>
            </div>

            {/* Concentric Rings & Icons */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

                {/* Ring 1 Group */}
                <div className="orbit-group orbit-group-1 absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="hero-ring hero-ring-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4AF37]/40 w-[450px] h-[450px]" />
                    {/* Icons for Ring 1 */}
                    {icons.filter(i => i.ring === 1).map((item, index) => {
                        const pos = getPosition(item.ring, item.angle);
                        return (
                            <div
                                key={`r1-${index}`}
                                className="hero-icon absolute z-10 left-1/2 top-1/2"
                                style={{
                                    transform: `translate(${pos.x}px, ${pos.y}px)`,
                                }}
                            >
                                {/* Inner wrapper for counter-rotation */}
                                <div className="hero-icon-inner flex items-center justify-center rounded-full shadow-lg"
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        backgroundColor: item.bg,
                                        border: `1px solid ${item.borderColor || '#D4AF37/40'}`,
                                        // Center the inner content relative to the wrapper's 0,0
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                >
                                    <item.Icon size={20} color={item.color} strokeWidth={1.5} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Ring 2 Group */}
                <div className="orbit-group orbit-group-2 absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="hero-ring hero-ring-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4AF37]/40 w-[680px] h-[680px]" />
                    {/* Icons for Ring 2 */}
                    {icons.filter(i => i.ring === 2).map((item, index) => {
                        const pos = getPosition(item.ring, item.angle);
                        return (
                            <div
                                key={`r2-${index}`}
                                className="hero-icon absolute z-10 left-1/2 top-1/2"
                                style={{
                                    transform: `translate(${pos.x}px, ${pos.y}px)`,
                                }}
                            >
                                <div className="hero-icon-inner flex items-center justify-center rounded-full shadow-lg"
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        backgroundColor: item.bg,
                                        border: `1px solid ${item.borderColor || '#D4AF37/40'}`,
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                >
                                    <item.Icon size={20} color={item.color} strokeWidth={1.5} />
                                    {/* Special case: Blue Diamond connection line */}
                                    {item.Icon === Diamond && item.borderColor === '#1e3a8a' && (
                                        <svg className="absolute w-[100px] h-[100px] pointer-events-none" style={{
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-100%, -50%) rotate(0deg)',
                                            overflow: 'visible'
                                        }}>
                                            {/* Commented out as per user request history, or keeping simple */}
                                            {/* <line x1="0" y1="0" x2="60" y2="0" stroke="#3C3633" strokeWidth="1" strokeDasharray="4 2" />
                                             <circle cx="60" cy="0" r="3" fill="#3C3633" /> */}
                                        </svg>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Ring 3 Group */}
                <div className="orbit-group orbit-group-3 absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="hero-ring hero-ring-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4AF37]/40 w-[950px] h-[950px]" />
                    {/* Icons for Ring 3 */}
                    {icons.filter(i => i.ring === 3).map((item, index) => {
                        const pos = getPosition(item.ring, item.angle);
                        return (
                            <div
                                key={`r3-${index}`}
                                className="hero-icon absolute z-10 left-1/2 top-1/2"
                                style={{
                                    transform: `translate(${pos.x}px, ${pos.y}px)`,
                                }}
                            >
                                <div className="hero-icon-inner flex items-center justify-center rounded-full shadow-lg"
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        backgroundColor: item.bg,
                                        border: `1px solid ${item.borderColor || '#D4AF37/40'}`,
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                >
                                    <item.Icon size={20} color={item.color} strokeWidth={1.5} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Golden Glow Effect Top Center */}
                <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#D4AF37]/20 blur-[80px] rounded-full pointer-events-none" />
            </div>

            {/* Center Content */}
            <div ref={contentRef} className="relative z-10 text-center max-w-2xl px-4">
                <h1 className="font-serif text-5xl md:text-7xl text-[#3C3633] leading-tight mb-4">
                    Fine Jewelry,<br />
                    <span className="italic font-normal">Simplified</span>
                </h1>

                <p className="text-[#7A746E] font-sans text-xl md:text-xl font-light mb-8 max-w-lg mx-auto leading-relaxed">
                    Take your jewelry business to the next level
                    with human-led digital solutions.
                </p>

                <button
                    className="bg-[#1e1b4b] text-white px-8 py-3 rounded-md font-sans font-medium uppercase tracking-wide
                               hover:bg-[#312e81] transition-colors duration-300 shadow-xl"
                >
                    Get Started
                </button>
            </div>

        </section>
    );
};
