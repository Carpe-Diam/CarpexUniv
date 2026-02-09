import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Heart, Package, Star, Circle, Leaf, Gem, Square, Sparkle } from 'lucide-react';

// Diamond shape components - different cuts inspired by Pinterest video
const DiamondRound = ({ className = '' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
        <defs>
            <linearGradient id="roundGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#e8e8e8" />
                <stop offset="100%" stopColor="#c0c0c0" />
            </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="44" fill="url(#roundGrad)" />
        <polygon points="50,6 94,50 50,94 6,50" fill="white" opacity="0.8" />
        <polygon points="50,18 82,50 50,82 18,50" fill="white" opacity="0.6" />
        <polygon points="50,30 70,50 50,70 30,50" fill="white" opacity="0.4" />
        <line x1="50" y1="6" x2="50" y2="94" stroke="white" strokeWidth="0.5" opacity="0.5" />
        <line x1="6" y1="50" x2="94" y2="50" stroke="white" strokeWidth="0.5" opacity="0.5" />
    </svg>
);

const DiamondPrincess = ({ className = '' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
        <defs>
            <linearGradient id="princessGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#b8b8b8" />
            </linearGradient>
        </defs>
        <rect x="8" y="8" width="84" height="84" fill="url(#princessGrad)" />
        <rect x="20" y="20" width="60" height="60" fill="white" opacity="0.7" />
        <rect x="32" y="32" width="36" height="36" fill="white" opacity="0.5" />
        <line x1="8" y1="8" x2="92" y2="92" stroke="white" strokeWidth="1" opacity="0.6" />
        <line x1="92" y1="8" x2="8" y2="92" stroke="white" strokeWidth="1" opacity="0.6" />
    </svg>
);

const DiamondEmerald = ({ className = '' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
        <defs>
            <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#c0c0c0" />
            </linearGradient>
        </defs>
        <polygon points="15,12 85,12 92,88 8,88" fill="url(#emeraldGrad)" />
        <polygon points="25,24 75,24 80,76 20,76" fill="white" opacity="0.7" />
        <polygon points="35,36 65,36 68,64 32,64" fill="white" opacity="0.5" />
        <line x1="50" y1="12" x2="50" y2="88" stroke="white" strokeWidth="0.5" opacity="0.5" />
    </svg>
);

const DiamondCushion = ({ className = '' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
        <defs>
            <linearGradient id="cushionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#b0b0b0" />
            </linearGradient>
        </defs>
        <rect x="8" y="8" width="84" height="84" rx="20" fill="url(#cushionGrad)" />
        <rect x="20" y="20" width="60" height="60" rx="14" fill="white" opacity="0.7" />
        <rect x="32" y="32" width="36" height="36" rx="8" fill="white" opacity="0.5" />
    </svg>
);

const DiamondOval = ({ className = '' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
        <defs>
            <linearGradient id="ovalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#c8c8c8" />
            </linearGradient>
        </defs>
        <ellipse cx="50" cy="50" rx="36" ry="46" fill="url(#ovalGrad)" />
        <ellipse cx="50" cy="50" rx="26" ry="34" fill="white" opacity="0.7" />
        <ellipse cx="50" cy="50" rx="14" ry="20" fill="white" opacity="0.5" />
    </svg>
);

const DiamondPear = ({ className = '' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none">
        <defs>
            <linearGradient id="pearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#c0c0c0" />
            </linearGradient>
        </defs>
        <path d="M50 4 C18 35, 8 60, 50 96 C92 60, 82 35, 50 4" fill="url(#pearGrad)" />
        <path d="M50 16 C28 40, 22 56, 50 82 C78 56, 72 40, 50 16" fill="white" opacity="0.7" />
        <path d="M50 30 C38 46, 35 56, 50 68 C65 56, 62 46, 50 30" fill="white" opacity="0.5" />
    </svg>
);

// Diamond data for the carousel
const diamondTypes = [
    { Component: DiamondRound, name: 'Round' },
    { Component: DiamondPrincess, name: 'Princess' },
    { Component: DiamondEmerald, name: 'Emerald' },
    { Component: DiamondCushion, name: 'Cushion' },
    { Component: DiamondOval, name: 'Oval' },
    { Component: DiamondPear, name: 'Pear' },
];

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);
    const centerDiamondRef = useRef<HTMLDivElement>(null);
    const [currentDiamondIndex, setCurrentDiamondIndex] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate content entrance from left
            gsap.from(contentRef.current, {
                x: -60,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                delay: 0.3,
            });

            // Animate ring entrance
            gsap.from(ringRef.current, {
                scale: 0.7,
                opacity: 0,
                duration: 1.2,
                ease: 'back.out(1.2)',
                delay: 0.5,
            });

            // Continuous rotation of the orbit (icons around the ring)
            gsap.to(orbitRef.current, {
                rotation: 360,
                duration: 30,
                ease: 'none',
                repeat: -1,
            });

            // Animate orbiting icons entrance
            gsap.from('.orbit-diamond', {
                scale: 0,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.5)',
                delay: 1,
            });

            // Golden glow pulse animation
            gsap.to('.golden-glow', {
                scale: 1.2,
                opacity: 0.8,
                duration: 2,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
            });

        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, []);

    // 8 Positions for orbiting icons matching the reference image
    const orbitPositions = [
        { angle: -90, size: 44, Icon: Heart },      // Top - Heart
        { angle: -45, size: 44, Icon: Package },    // Top right - Package/Box
        { angle: 0, size: 44, Icon: Star },         // Right - Star
        { angle: 45, size: 44, Icon: Circle },      // Bottom right - Ring/Circle
        { angle: 90, size: 44, Icon: Leaf },        // Bottom - Leaf
        { angle: 135, size: 44, Icon: Gem },        // Bottom left - Gem
        { angle: 180, size: 44, Icon: Square },     // Left - Square
        { angle: 225, size: 44, Icon: Sparkle },    // Top left - Sparkle
    ];
    const orbitRadius = 155; // Match the ring radius so icons orbit ON the ring

    const CenterDiamond = diamondTypes[currentDiamondIndex].Component;

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full overflow-hidden"
            style={{ background: '#F9F7F2' }}
        >
            {/* Main Content Container - Two Column Layout */}
            <div className="relative z-10 min-h-screen flex items-center">
                <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                    {/* Left Side - Content */}
                    <div
                        ref={contentRef}
                        className="text-left order-2 lg:order-1"
                    >
                        {/* Carpe Diam Logo */}
                        <div
                            className="mb-12"
                            style={{
                                fontFamily: 'Cormorant Garamond, serif',
                                fontSize: '24px',
                                fontWeight: 500,
                                color: '#3C3633',
                                letterSpacing: '1px',
                            }}
                        >
                            Carpe Diam
                        </div>
                        {/* Jewelry Ecosystem Badge */}
                        {/* <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                            style={{
                                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.08) 100%)',
                                border: '1px solid rgba(212, 175, 55, 0.3)',
                            }}
                        >
                            <svg className="w-4 h-4" style={{ color: '#D4AF37' }} fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                            <span
                                style={{
                                    color: '#D4AF37',
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    letterSpacing: '1.5px',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Jewelry Ecosystem
                            </span>
                        </div> */}

                        {/* Headline */}
                        <h1
                            className="leading-tight mb-6"
                            style={{
                                color: '#3C3633',
                                fontFamily: 'Cormorant Garamond, serif',
                                fontSize: 'clamp(42px, 6vw, 72px)',
                                fontWeight: 600,
                                letterSpacing: '-1px',
                            }}
                        >
                            Fine Jewelry, Simplified
                            <br />
                            <span
                                className="italic font-normal"
                                style={{ color: '#7A746E' }}
                            >
                                with human-led
                            </span>{' '}
                            <span style={{ color: '#D4AF37' }}>
                                digital solutions
                            </span>
                        </h1>

                        {/* Description */}
                        <p
                            className="max-w-xl leading-relaxed mb-8"
                            style={{
                                color: '#7A746E',
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: '16px',
                                fontWeight: 300,
                                lineHeight: 1.8,
                            }}
                        >
                            Making fine jewelry easier to source, create, and grow.
                            An ecosystem built to empower retailers with access, transparency, and end-to-end support.
                        </p>

                        {/* Service Icons */}
                        {/* <div className="flex flex-wrap gap-4 mb-8"> */}
                        {/* Product Development */}
                        {/* <div className="group relative"> */}
                        {/* <div
                                    className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 group-hover:scale-110 cursor-pointer"
                                    style={{
                                        background: 'rgba(212, 175, 55, 0.1)',
                                        border: '1px solid rgba(212, 175, 55, 0.3)',
                                    }}
                                >
                                    <svg className="w-5 h-5" style={{ color: '#D4AF37' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                                    </svg>
                                </div> */}
                        {/* <div
                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap"
                                    style={{
                                        background: '#3C3633',
                                        color: '#fff',
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontSize: '11px',
                                        fontWeight: 500,
                                        letterSpacing: '0.5px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    }}
                                >
                                    Product Development
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" style={{ borderTopColor: '#3C3633' }} />
                                </div>
                            </div> */}

                        {/* Catalog */}
                        {/* <div className="group relative">
                                <div
                                    className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 group-hover:scale-110 cursor-pointer"
                                    style={{
                                        background: 'rgba(212, 175, 55, 0.1)',
                                        border: '1px solid rgba(212, 175, 55, 0.3)',
                                    }}
                                >
                                    <svg className="w-5 h-5" style={{ color: '#D4AF37' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                    </svg>
                                </div>
                                <div
                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap"
                                    style={{
                                        background: '#3C3633',
                                        color: '#fff',
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontSize: '11px',
                                        fontWeight: 500,
                                        letterSpacing: '0.5px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    }}
                                >
                                    Catalog
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" style={{ borderTopColor: '#3C3633' }} />
                                </div>
                            </div> */}

                        {/* Tech Services */}
                        {/* <div className="group relative">
                                <div
                                    className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 group-hover:scale-110 cursor-pointer"
                                    style={{
                                        background: 'rgba(212, 175, 55, 0.1)',
                                        border: '1px solid rgba(212, 175, 55, 0.3)',
                                    }}
                                >
                                    <svg className="w-5 h-5" style={{ color: '#D4AF37' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                                    </svg>
                                </div>
                                <div
                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap"
                                    style={{
                                        background: '#3C3633',
                                        color: '#fff',
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontSize: '11px',
                                        fontWeight: 500,
                                        letterSpacing: '0.5px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    }}
                                >
                                    Tech Services
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" style={{ borderTopColor: '#3C3633' }} />
                                </div>
                            </div> */}

                        {/* Custom Jewelry */}
                        {/* <div className="group relative">
                                <div
                                    className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 group-hover:scale-110 cursor-pointer"
                                    style={{
                                        background: 'rgba(212, 175, 55, 0.1)',
                                        border: '1px solid rgba(212, 175, 55, 0.3)',
                                    }}
                                >
                                    <svg className="w-5 h-5" style={{ color: '#D4AF37' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                </div>
                                <div
                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap"
                                    style={{
                                        background: '#3C3633',
                                        color: '#fff',
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontSize: '11px',
                                        fontWeight: 500,
                                        letterSpacing: '0.5px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    }}
                                >
                                    Custom Jewelry
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" style={{ borderTopColor: '#3C3633' }} />
                                </div>
                            </div> */}
                        {/* </div> */}

                        {/* CTA Button */}
                        {/* <button
                            className="px-8 py-4 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            style={{
                                background: 'linear-gradient(135deg, #D4AF37 0%, #B8963E 100%)',
                                color: '#fff',
                                fontFamily: 'Montserrat, sans-serif',
                                boxShadow: '0 4px 20px rgba(212, 175, 55, 0.35)',
                            }}
                        >
                            Explore Our Services
                        </button> */}
                    </div>

                    {/* Right Side - Diamond Ring Animation (Pinterest Style) */}
                    <div className="relative flex items-center justify-center h-[450px] lg:h-[600px] order-1 lg:order-2">

                        {/* The Full Circle Ring */}
                        <div
                            ref={ringRef}
                            className="absolute flex items-center justify-center"
                            style={{ width: 380, height: 380 }}
                        >
                            <svg viewBox="0 0 380 380" className="absolute w-full h-full">
                                <defs>
                                    <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#D4AF37" />
                                        <stop offset="50%" stopColor="#F5E6A3" />
                                        <stop offset="100%" stopColor="#D4AF37" />
                                    </linearGradient>
                                    <filter id="ringDropShadow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.1" />
                                    </filter>
                                </defs>

                                {/* Ring outer glow */}
                                <circle
                                    cx="190" cy="190" r="155"
                                    fill="none"
                                    stroke="rgba(212,175,55,0.1)"
                                    strokeWidth="20"
                                    opacity="0.5"
                                />

                                {/* Main thin circle ring band */}
                                <circle
                                    cx="190" cy="190" r="155"
                                    fill="none"
                                    stroke="url(#ringGradient)"
                                    strokeWidth="3"
                                    filter="url(#ringDropShadow)"
                                />

                                {/* Inner subtle ring */}
                                <circle
                                    cx="190" cy="190" r="145"
                                    fill="#F9F7F2"
                                    stroke="rgba(212,175,55,0.15)"
                                    strokeWidth="1"
                                />
                            </svg>

                            {/* Golden Glow Orb at Top */}
                            <div
                                className="golden-glow absolute"
                                style={{
                                    top: '-20px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '60px',
                                    height: '60px',
                                    background: 'radial-gradient(circle, rgba(212,175,55,0.8) 0%, rgba(245,230,163,0.6) 30%, rgba(212,175,55,0.2) 60%, transparent 80%)',
                                    borderRadius: '50%',
                                    filter: 'blur(8px)',
                                    zIndex: 30,
                                }}
                            />

                            {/* Jewelry Ecosystem Text Inside Circle */}
                            <div
                                className="absolute flex flex-col items-center justify-center text-center"
                                style={{
                                    width: '200px',
                                    zIndex: 20,
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: 'Cormorant Garamond, serif',
                                        fontSize: '26px',
                                        fontWeight: 500,
                                        color: '#3C3633',
                                        letterSpacing: '1px',
                                        lineHeight: 1.3,
                                    }}
                                >
                                    Jewelry
                                </span>
                                <span
                                    style={{
                                        fontFamily: 'Cormorant Garamond, serif',
                                        fontSize: '26px',
                                        fontWeight: 500,
                                        color: '#3C3633',
                                        letterSpacing: '1px',
                                        lineHeight: 1.3,
                                    }}
                                >
                                    Ecosystem
                                </span>
                            </div>
                        </div>

                        {/* Orbiting Diamonds (rotating around the ring) */}
                        <div
                            ref={orbitRef}
                            className="absolute"
                            style={{ width: orbitRadius * 2 + 100, height: orbitRadius * 2 + 100 }}
                        >
                            {orbitPositions.map((pos, index) => {
                                const { Icon } = pos;
                                const radian = (pos.angle * Math.PI) / 180;
                                const x = Math.cos(radian) * orbitRadius;
                                const y = Math.sin(radian) * orbitRadius;

                                return (
                                    <div
                                        key={index}
                                        className="orbit-diamond absolute flex items-center justify-center rounded-full"
                                        style={{
                                            left: '50%',
                                            top: '50%',
                                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                                            width: pos.size,
                                            height: pos.size,
                                            background: '#F9F7F2',
                                            border: '2px solid rgba(212, 175, 55, 0.4)',
                                            boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                                        }}
                                    >
                                        <Icon
                                            size={pos.size * 0.5}
                                            color="#D4AF37"
                                            strokeWidth={1}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        {/* "What is Your Stone Shape?" Text */}
                        {/* <div
                            className="absolute text-center pointer-events-none"
                            style={{
                                bottom: '5%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }}
                        >
                            <p
                                style={{
                                    color: '#7A746E',
                                    fontFamily: 'Cormorant Garamond, serif',
                                    fontSize: '16px',
                                    fontStyle: 'italic',
                                    marginBottom: '4px',
                                }}
                            >
                                What is Your
                            </p>
                            <p
                                style={{
                                    color: '#3C3633',
                                    fontFamily: 'Cormorant Garamond, serif',
                                    fontSize: '28px',
                                    fontWeight: 600,
                                    letterSpacing: '6px',
                                }}
                            >
                                ST<span style={{ color: '#D4AF37' }}>O</span>NE
                            </p>
                            <p
                                style={{
                                    color: '#D4AF37',
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontSize: '12px',
                                    fontWeight: 500,
                                    letterSpacing: '3px',
                                    marginTop: '2px',
                                }}
                            >
                                SHAPE?
                            </p>
                        </div> */}

                        {/* Jewelry Ecosystem Badge */}
                        {/* <div
                            className=" z-20"
                            style={{
                                top: '5%',
                                right: '10%',
                            }}
                        > */}
                        {/* <div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                            // style={{
                            //     background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.1) 100%)',
                            //     border: '1px solid rgba(212, 175, 55, 0.4)',
                            //     backdropFilter: 'blur(8px)',
                            // }}
                            > */}
                        {/* <svg className="w-4 h-4" style={{ color: '#D4AF37' }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg> */}
                        {/* <span
                                    style={{
                                        color: '#D4AF37',
                                        fontFamily: 'Cormorant Garamond, serif',
                                        fontSize: '15px',
                                        fontWeight: 600,
                                        letterSpacing: '1.5px',
                                        textTransform: 'uppercase',
                                        textAlign: 'center',
                                    }}
                                >
                                    Jewelry<br /> Ecosystem
                                </span>
                            </div>
                        </div> */}

                        {/* Floating Service Icons around the animation */}
                        {/* Top Left - Diamond Icon */}
                        {/* <div
                            className="absolute z-20 w-10 h-10 rounded-full flex items-center justify-center"
                            style={{
                                top: '15%',
                                left: '5%',
                                background: '#F9F7F2',
                                border: '1px solid rgba(212, 175, 55, 0.3)',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                            }}
                        >
                            <svg className="w-5 h-5" style={{ color: '#D4AF37' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 9l10 12 10-12-10-6z" />
                            </svg>
                        </div> */}

                        {/* Top Right - Sparkle Icon */}
                        {/* <div
                            className="absolute z-20 w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                                top: '20%',
                                right: '5%',
                                background: '#F9F7F2',
                                border: '1px solid rgba(212, 175, 55, 0.3)',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                            }}
                        >
                            <svg className="w-4 h-4" style={{ color: '#D4AF37' }} fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0L14.59 9.41 24 12 14.59 14.59 12 24 9.41 14.59 0 12 9.41 9.41z" />
                            </svg>
                        </div> */}

                        {/* Bottom Left - Ring Icon */}
                        {/* <div
                            className="absolute z-20 w-9 h-9 rounded-full flex items-center justify-center"
                            style={{
                                bottom: '20%',
                                left: '8%',
                                background: '#F9F7F2',
                                border: '1px solid rgba(212, 175, 55, 0.3)',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                            }}
                        >
                            <svg className="w-4 h-4" style={{ color: '#D4AF37' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </div> */}

                        {/* Bottom Right - Catalog Icon */}
                        {/* <div
                            className="absolute z-20 w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                                bottom: '15%',
                                right: '8%',
                                background: '#F9F7F2',
                                border: '1px solid rgba(212, 175, 55, 0.3)',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                            }}
                        >
                            <svg className="w-4 h-4" style={{ color: '#D4AF37' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            </svg>
                        </div> */}
                    </div>
                </div>
            </div>


            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                <svg className="w-6 h-6" style={{ color: '#D4AF37' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
};
