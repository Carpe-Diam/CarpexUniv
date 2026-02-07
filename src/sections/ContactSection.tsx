import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const ContactSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate orbit rings
            gsap.from('.orbit-ring', {
                scale: 0,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power2.out',
            });

            // Animate center logo
            gsap.from('.center-logo', {
                scale: 0,
                duration: 0.8,
                delay: 0.5,
                ease: 'back.out(1.7)',
            });

            // Animate floating dots
            gsap.from('.orbit-dot', {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                delay: 0.8,
                ease: 'back.out(1.4)',
            });

            // Continuous rotation for orbit dots
            gsap.to('.orbit-container', {
                rotation: 360,
                duration: 60,
                repeat: -1,
                ease: 'none',
            });

            // Counter-rotate the dots so they stay upright
            gsap.to('.orbit-dot', {
                rotation: -360,
                duration: 60,
                repeat: -1,
                ease: 'none',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setIsSuccess(false);
        setIsError(false);

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Replace with your deployed web app URL
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzKpb9yDH8TKpFE8FWhgtPlY-wGw9uvJn6fs8Xz1_7nNXxxOsJGlNCxj-i92eeQjrqC/exec';

        try {
            await fetch(scriptURL, { method: 'POST', body: formData });
            setIsSuccess(true);
            form.reset();
        } catch (error) {
            console.error('Error!', error);
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Positions for the orbital dots (in degrees around the circle)
    const dotPositions = [30, 90, 150, 210, 270, 330];

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative min-h-screen w-full py-20 lg:py-32"
            style={{ background: '#FAF8F5' }}
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            {/* Cream overlay for readability */}
            <div
                className="absolute inset-0 z-[1]"
                style={{ background: 'rgba(250, 248, 245, 0.92)' }}
            />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4"
                        style={{ color: '#2C2416', fontFamily: 'Georgia, serif' }}
                    >
                        Let's Get Started
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B5B4D' }}>
                        Ready to transform your jewelry business? Get in touch with us today.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Side - Animated Orbital Component */}
                    <div ref={orbitRef} className="relative flex items-center justify-center">
                        <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px]">
                            {/* Outer orbit ring */}
                            <div
                                className="orbit-ring absolute inset-0 rounded-full"
                                style={{ border: '1px solid #D4C5B5' }}
                            />

                            {/* Middle orbit ring */}
                            <div
                                className="orbit-ring absolute rounded-full"
                                style={{
                                    inset: '15%',
                                    border: '1px solid #D4C5B5',
                                }}
                            />

                            {/* Inner gradient circle */}
                            <div
                                className="orbit-ring absolute rounded-full"
                                style={{
                                    inset: '30%',
                                    background: 'linear-gradient(180deg, rgba(212, 197, 181, 0.3) 0%, rgba(212, 197, 181, 0.1) 100%)',
                                }}
                            />

                            {/* Center logo container */}
                            <div
                                className="center-logo absolute rounded-full flex items-center justify-center"
                                style={{
                                    inset: '35%',
                                    background: '#FFFFFF',
                                    boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
                                }}
                            >
                                {/* Temporary placeholder logo */}
                                <img
                                    src="https://via.placeholder.com/80x80?text=Logo"
                                    alt="Company Logo"
                                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                                />
                            </div>

                            {/* Rotating orbit container with dots */}
                            <div className="orbit-container absolute inset-0">
                                {dotPositions.map((angle, index) => {
                                    const radius = 50; // percentage from center
                                    const x = 50 + radius * Math.cos((angle - 90) * (Math.PI / 180));
                                    const y = 50 + radius * Math.sin((angle - 90) * (Math.PI / 180));

                                    return (
                                        <div
                                            key={index}
                                            className="orbit-dot absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
                                            style={{
                                                left: `${x}%`,
                                                top: `${y}%`,
                                                transform: 'translate(-50%, -50%)',
                                                background: '#FFFFFF',
                                                border: '1px solid #E8E0D8',
                                                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                                            }}
                                        >
                                            {/* Empty circle - blank as requested */}
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ background: '#D4C5B5' }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div
                        className="p-8 sm:p-10 rounded-2xl"
                        style={{ background: '#FFFFFF', boxShadow: '0 4px 30px rgba(0,0,0,0.06)' }}
                    >
                        <form id="contact-form" className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: '#5C4D3C' }}
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full p-3 rounded-lg outline-none transition-all duration-200 focus:ring-2"
                                    style={{
                                        border: '1px solid #E8E0D8',
                                        background: '#FAF8F5',
                                        color: '#2C2416',
                                    }}
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: '#5C4D3C' }}
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full p-3 rounded-lg outline-none transition-all duration-200 focus:ring-2"
                                    style={{
                                        border: '1px solid #E8E0D8',
                                        background: '#FAF8F5',
                                        color: '#2C2416',
                                    }}
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: '#5C4D3C' }}
                                >
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full p-3 rounded-lg outline-none transition-all duration-200 focus:ring-2 resize-none"
                                    style={{
                                        border: '1px solid #E8E0D8',
                                        background: '#FAF8F5',
                                        color: '#2C2416',
                                    }}
                                    placeholder="Tell us about your project..."
                                />
                            </div>

                            <button
                                type="submit"
                                id="submit-btn"
                                disabled={isSubmitting}
                                className="w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                                style={{
                                    background: '#2C2416',
                                    color: '#FAF8F5',
                                }}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>

                        {/* Success Message */}
                        {isSuccess && (
                            <div
                                id="success-msg"
                                className="mt-4 p-3 rounded-lg text-center"
                                style={{ background: '#E8F5E9', color: '#2E7D32' }}
                            >
                                Message sent successfully!
                            </div>
                        )}

                        {/* Error Message */}
                        {isError && (
                            <div
                                className="mt-4 p-3 rounded-lg text-center"
                                style={{ background: '#FFEBEE', color: '#C62828' }}
                            >
                                Something went wrong. Please try again.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
