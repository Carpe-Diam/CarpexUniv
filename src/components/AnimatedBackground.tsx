import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const AnimatedBackground = () => {
    const pathsRef = useRef<(SVGPathElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Simulate GSAP 'DrawSVG' using standard stroke properties
            // so we don't need the paid Club GreenSock plugin.
            pathsRef.current.forEach((path) => {
                if (!path) return;
                
                // Get the total length of the path
                const length = path.getTotalLength();
                
                // Set up the dashed stroke to match the length
                gsap.set(path, { 
                    strokeDasharray: length, 
                    strokeDashoffset: length,
                    opacity: 1
                });
                
                // Animate the offset down to 0 to "draw" the line
                gsap.to(path, {
                    strokeDashoffset: 0,
                    duration: gsap.utils.random(15, 25), // Random slow drawing
                    ease: "power1.inOut",
                    yoyo: true,
                    repeat: -1,
                    delay: gsap.utils.random(0, 5) // Staggered start times
                });
            });
        });

        return () => ctx.revert();
    }, []);

    // A helper to safely attach refs inside a map
    const setPathRef = (index: number) => (el: SVGPathElement | null) => {
        pathsRef.current[index] = el;
    };

    return (
        <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden opacity-40 mix-blend-multiply flex items-center justify-center">
            
            {/* 
                Custom hand-drawn, minimalist continuous-line jewelry SVG!
                Since you uploaded a beautiful line-art pattern, I have translated those exact "jewelry vibes"
                into dynamic SVG paths that are drawn across the screen using GSAP.
            */}
            <svg 
                className="absolute w-[200vw] h-[200vh] min-w-[2000px] min-h-[2000px] -rotate-[15deg] opacity-70" 
                viewBox="0 0 1000 1000" 
                fill="none" 
                stroke="#665d55"  // Sophisticated dark taupe grey
                strokeWidth="1.2"
                preserveAspectRatio="xMidYMid slice"
            >
                {/* 1. Elegant Layered Necklace with Diamond Pendant */}
                <g transform="translate(150, 80) scale(1.6) rotate(15)">
                    {/* Outer Chain */}
                    <path ref={setPathRef(0)} d="M0,0 C50,150 150,150 200,0" strokeLinecap="round" />
                    {/* Inner Chain */}
                    <path ref={setPathRef(1)} d="M20,0 C60,110 140,110 180,0" strokeLinecap="round" strokeWidth="0.8" />
                    {/* Diamond Pendant */}
                    <path ref={setPathRef(2)} d="M100,123 L110,140 L100,160 L90,140 Z" strokeLinejoin="round" />
                    {/* Diamond Facet Lines */}
                    <path ref={setPathRef(3)} d="M90,140 L110,140 M100,123 L100,160" strokeLinecap="round" strokeWidth="0.6" />
                </g>

                {/* 2. Solitaire Diamond Ring */}
                <g transform="translate(680, 220) scale(1.4) rotate(-35)">
                    {/* Ring Band */}
                    <path ref={setPathRef(4)} d="M50,100 A 50 50 0 1 1 49.9,100" strokeLinecap="round" />
                    <path ref={setPathRef(5)} d="M50,90 A 40 40 0 1 1 49.9,90" strokeLinecap="round" strokeWidth="0.8" />
                    {/* Solitaire Diamond */}
                    <path ref={setPathRef(6)} d="M35,15 L65,15 L50,45 Z" strokeLinejoin="round" />
                    <path ref={setPathRef(7)} d="M35,15 L42,5 L58,5 L65,15" strokeLinejoin="round" />
                    <path ref={setPathRef(8)} d="M42,5 L50,15 L58,5 M35,15 L65,15" strokeLinecap="round" strokeWidth="0.6" />
                </g>

                {/* 3. Minimalist Hoop Earrings (Pair) */}
                <g transform="translate(280, 550) scale(1.2) rotate(30)">
                    {/* Earring 1 */}
                    <path ref={setPathRef(9)} d="M50,50 A 40 40 0 1 1 49.9,50" strokeLinecap="round" />
                    <path ref={setPathRef(10)} d="M50,45 A 35 35 0 1 1 49.9,45" strokeLinecap="round" strokeWidth="0.8" />
                    <path ref={setPathRef(11)} d="M47,5 L53,5" strokeLinecap="round" strokeWidth="1.5" />
                    <circle cx="50" cy="85" r="3" fill="#665d55" /> 
                </g>

                <g transform="translate(420, 580) scale(1) rotate(10)">
                    {/* Earring 2 */}
                    <path ref={setPathRef(12)} d="M50,50 A 40 40 0 1 1 49.9,50" strokeLinecap="round" />
                    <path ref={setPathRef(13)} d="M50,45 A 35 35 0 1 1 49.9,45" strokeLinecap="round" strokeWidth="0.8" />
                    <path ref={setPathRef(14)} d="M47,5 L53,5" strokeLinecap="round" strokeWidth="1.5" />
                    <circle cx="50" cy="85" r="3" fill="#665d55" /> 
                </g>

                {/* 4. Elegant Link Bracelet */}
                <g transform="translate(650, 680) scale(1.6) rotate(-15)">
                    {/* Chain Links */}
                    <path ref={setPathRef(15)} d="M0,0 C30,-30 60,30 90,10 C120,-10 150,40 180,20 C210,0 240,50 270,30" strokeLinecap="round" />
                    {/* Clasp/Rings */}
                    <path ref={setPathRef(16)} d="M90,10 A 6 6 0 1 1 89.9,10" />
                    <path ref={setPathRef(17)} d="M180,20 A 6 6 0 1 1 179.9,20" />
                    <path ref={setPathRef(18)} d="M270,30 A 6 6 0 1 1 269.9,30" />
                </g>
                
                {/* 5. Minimalist Curved Chains linking space (Background Fill) */}
                <path ref={setPathRef(19)} d="M-100,400 Q150,200 350,450 T750,300 T1150,500" strokeLinecap="round" strokeWidth="0.8" opacity="0.6" />
                <path ref={setPathRef(20)} d="M-50,850 Q250,950 450,800 T850,950 T1250,750" strokeLinecap="round" strokeWidth="0.8" opacity="0.6" />
                <path ref={setPathRef(21)} d="M-50,870 Q250,970 450,820 T850,970 T1250,770" strokeLinecap="round" strokeWidth="0.4" opacity="0.4" />
                
                <path ref={setPathRef(22)} d="M200,-100 Q400,100 600,-50 T1000,100" strokeLinecap="round" strokeWidth="0.8" opacity="0.6" />
            </svg>

            {/* Soft gradient mask to blend edges smoothly and reduce harshness against the new white background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/90 backdrop-blur-[1px]" />
        </div>
    );
};
