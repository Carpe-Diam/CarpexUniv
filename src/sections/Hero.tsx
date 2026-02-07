import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Ecosystem components
const ecosystemItems = [
    { id: 'product-dev', label: 'Product Development' },
    { id: 'catalog', label: 'Catalog' },
    { id: 'tech-services', label: 'Tailored Tech Services' },
    { id: 'custom-jewelry', label: 'Custom Jewelry' },
];

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const orbitLineRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate content entrance
            gsap.from(contentRef.current, {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.3,
            });

            // Animate orbital line drawing
            if (orbitLineRef.current) {
                const length = orbitLineRef.current.getTotalLength();
                gsap.set(orbitLineRef.current, {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                });
                gsap.to(orbitLineRef.current, {
                    strokeDashoffset: 0,
                    duration: 4,
                    delay: 0.3,
                    ease: 'power2.inOut',
                });
            }

            // Animate dots
            gsap.from('.orbit-dot', {
                scale: 0,
                opacity: 0,
                duration: 0.4,
                stagger: 0.15,
                ease: 'back.out(1.4)',
                delay: 0.6,
            });

            // Animate labels
            gsap.from('.orbit-label', {
                y: 10,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                delay: 0.9,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full overflow-hidden"
            style={{ background: '#FAFAFA' }}
        >
            {/* Background Jewelry Image with overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center bottom',
                }}
            />
            <div
                className="absolute inset-0 z-[1]"
                style={{ background: 'rgba(250, 250, 252, 0.92)' }}
            />

            {/* Full-width Orbital Arc with Dots */}
            <div className="absolute inset-0 z-[2] overflow-hidden">
                <svg
                    className="absolute w-full"
                    style={{ top: '8%', height: '50%' }}
                    viewBox="0 0 100 50"
                    preserveAspectRatio="none"
                >
                    {/* The orbital arc line - spans full width */}
                    <path
                        ref={orbitLineRef}
                        d="M -5 48 C 15 15, 35 2, 50 2 C 65 2, 85 15, 105 48"
                        fill="none"
                        stroke="#C9B99A"
                        strokeWidth="0.15"
                        strokeLinecap="round"
                    />

                    {/* Dots positioned on the orbital line with wider spacing */}
                    <circle className="orbit-dot" cx="6" cy="32" r="0.6" fill="#A89078" />
                    <circle className="orbit-dot" cx="32" cy="7.5" r="0.6" fill="#A89078" />
                    <circle className="orbit-dot" cx="62" cy="4.5" r="0.6" fill="#A89078" />
                    <circle className="orbit-dot" cx="93" cy="30.5" r="0.6" fill="#A89078" />
                </svg>

                {/* Labels positioned ABOVE each dot */}
                <div
                    className="orbit-label absolute text-xs font-medium whitespace-nowrap"
                    style={{ left: '8%', top: '29%', transform: 'translateX(-50%)', color: '#6B5B4D' }}
                >
                    Product Development
                </div>
                <div
                    className="orbit-label absolute text-xs font-medium whitespace-nowrap"
                    style={{ left: '32%', top: '7%', transform: 'translateX(-50%)', color: '#6B5B4D' }}
                >
                    Catalog
                </div>
                <div
                    className="orbit-label absolute text-xs font-medium whitespace-nowrap"
                    style={{ left: '62%', top: '7%', transform: 'translateX(-50%)', color: '#6B5B4D' }}
                >
                    Tailored Tech Services
                </div>
                <div
                    className="orbit-label absolute text-xs font-medium whitespace-nowrap"
                    style={{ left: '92%', top: '29%', transform: 'translateX(-50%)', color: '#6B5B4D' }}
                >
                    Custom Jewelry
                </div>
            </div>

            {/* Main Content - Centered inside the semicircle */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
                <div
                    ref={contentRef}
                    className="text-center max-w-3xl mx-auto pt-24"
                >
                    {/* Badge */}
                    {/* <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                        style={{ background: '#FFFFFF', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                    >
                        <span className="text-sm font-medium" style={{ color: '#5C4D3C' }}>
                            Jewelry Ecosystem
                        </span>
                        <span>💎</span>
                    </div> */}

                    {/* Headline */}
                    <h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-6"
                        style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}
                    >
                        Fine Jewelry, Simplified
                        <br />
                        <span className="italic font-normal" style={{ color: '#555' }}>
                            with human-led
                        </span>{' '}
                        <span style={{ color: '#8B7355' }}>
                            digital solutions
                        </span>
                    </h1>

                    {/* Description */}
                    <p
                        className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
                        style={{ color: '#666' }}
                    >
                        Making fine jewelry easier to source, create, and grow.
                        <br className="hidden sm:block" />
                        An ecosystem built to empower retailers with access, transparency, and end-to-end support.
                    </p>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                <svg className="w-6 h-6" style={{ color: '#403e3eff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
};
