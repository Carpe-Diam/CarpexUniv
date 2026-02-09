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
            className="relative w-full"
            style={{
                background: '#F2EEE5',
                padding: 'clamp(40px, 5vw, 60px) 0',
            }}
        >
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2
                        style={{
                            color: '#3C3633',
                            fontFamily: 'Cormorant Garamond, serif',
                            fontSize: 'clamp(32px, 5vw, 48px)',
                            fontWeight: 500,
                        }}
                    >
                        Let's Get Started
                    </h2>
                    <p
                        className="max-w-2xl mx-auto mt-4"
                        style={{
                            color: '#7A746E',
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '16px',
                            fontWeight: 300,
                        }}
                    >
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
                                style={{ border: '1px solid #D4AF37' }}
                            />

                            {/* Middle orbit ring */}
                            <div
                                className="orbit-ring absolute rounded-full"
                                style={{
                                    inset: '15%',
                                    border: '1px solid #D4AF37',
                                    opacity: 0.6,
                                }}
                            />

                            {/* Inner gradient circle */}
                            <div
                                className="orbit-ring absolute rounded-full"
                                style={{
                                    inset: '30%',
                                    background: 'linear-gradient(180deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 100%)',
                                }}
                            />

                            {/* Center logo container */}
                            <div
                                className="center-logo absolute rounded-full flex items-center justify-center"
                                style={{
                                    inset: '35%',
                                    background: '#F9F7F2',
                                    boxShadow: '0 8px 40px rgba(60, 54, 51, 0.1)',
                                }}
                            >
                                {/* Company Name */}
                                <span
                                    style={{
                                        fontFamily: 'Cormorant Garamond, serif',
                                        fontSize: 'clamp(14px, 3vw, 18px)',
                                        fontWeight: 600,
                                        color: '#3C3633',
                                        textAlign: 'center',
                                        letterSpacing: '1px',
                                    }}
                                >
                                    CARPE<br />DIAM
                                </span>
                            </div>

                            {/* Rotating orbit container with dots */}
                            <div className="orbit-container absolute inset-0">
                                {dotPositions.map((angle, index) => {
                                    const radius = 50;
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
                                                background: '#F9F7F2',
                                                border: '1px solid #D4AF37',
                                                boxShadow: '0 4px 16px rgba(60, 54, 51, 0.08)',
                                            }}
                                        >
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ background: '#D4AF37' }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div
                        className="p-8 sm:p-10"
                        style={{
                            background: '#F9F7F2',
                            boxShadow: '0 4px 30px rgba(60, 54, 51, 0.08)',
                            borderRadius: '0', // Sharp, no border-radius
                        }}
                    >
                        <form id="contact-form" className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    className="block mb-2"
                                    style={{
                                        color: '#3C3633',
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                    }}
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full p-3 outline-none transition-all duration-200"
                                    style={{
                                        border: '1px solid #D4AF37',
                                        borderRadius: '0',
                                        background: '#F9F7F2',
                                        color: '#3C3633',
                                        fontFamily: 'Montserrat, sans-serif',
                                    }}
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label
                                    className="block mb-2"
                                    style={{
                                        color: '#3C3633',
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                    }}
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full p-3 outline-none transition-all duration-200"
                                    style={{
                                        border: '1px solid #D4AF37',
                                        borderRadius: '0',
                                        background: '#F9F7F2',
                                        color: '#3C3633',
                                        fontFamily: 'Montserrat, sans-serif',
                                    }}
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label
                                    className="block mb-2"
                                    style={{
                                        color: '#3C3633',
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                    }}
                                >
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full p-3 outline-none transition-all duration-200 resize-none"
                                    style={{
                                        border: '1px solid #D4AF37',
                                        borderRadius: '0',
                                        background: '#F9F7F2',
                                        color: '#3C3633',
                                        fontFamily: 'Montserrat, sans-serif',
                                    }}
                                    placeholder="Tell us about your project..."
                                />
                            </div>

                            <button
                                type="submit"
                                id="submit-btn"
                                disabled={isSubmitting}
                                className="w-full py-3 px-6 font-medium transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                                style={{
                                    background: '#D4AF37',
                                    color: '#F9F7F2',
                                    borderRadius: '0',
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontSize: '13px',
                                    fontWeight: 500,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                }}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>

                        {/* Success Message */}
                        {isSuccess && (
                            <div
                                id="success-msg"
                                className="mt-4 p-3 text-center"
                                style={{
                                    background: '#E8F5E9',
                                    color: '#2E7D32',
                                    fontFamily: 'Montserrat, sans-serif',
                                }}
                            >
                                Message sent successfully!
                            </div>
                        )}

                        {/* Error Message */}
                        {isError && (
                            <div
                                className="mt-4 p-3 text-center"
                                style={{
                                    background: '#FFEBEE',
                                    color: '#C62828',
                                    fontFamily: 'Montserrat, sans-serif',
                                }}
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
