export const Hero = () => {
    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative w-full">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto block"
            >
                <source src="/hero.mp4" type="video/mp4" />
            </video>

            {/* Gradient overlay — fades in from bottom third of video */}
            {/* <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-black/20 to-transparent" /> */}

            {/* Text content — anchored to bottom of video */}
            {/* <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-16 lg:pb-20 px-8 md:px-16 lg:px-24 xl:px-32 pointer-events-none">
                <div className="max-w-3xl">
                    <p
                        className="text-white/60 mb-5 pointer-events-auto"
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                        }}
                    >
                        Univ Diam
                    </p>

                    <h1
                        className="text-white mb-5 pointer-events-auto"
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 'clamp(28px, 4vw, 56px)',
                            fontWeight: 300,
                            lineHeight: 1.15,
                            letterSpacing: '-0.01em',
                        }}
                    >
                        End-to-end fine jewelry manufacturing<br className="hidden md:block" /> for independent retailers
                    </h1>

                    <p
                        className="text-white/70 mb-10 max-w-xl pointer-events-auto"
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 'clamp(14px, 1.4vw, 18px)',
                            fontWeight: 300,
                            lineHeight: 1.7,
                        }}
                    >
                        Design, production, and global delivery — built as an extension of your team
                    </p>

                    <button
                        onClick={scrollToContact}
                        className="pointer-events-auto inline-flex items-center gap-3 bg-white text-[#2a2725] px-8 py-4 hover:bg-[#D4AF37] hover:text-white transition-colors duration-300 cursor-pointer"
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                        }}
                    >
                        Start a Conversation
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div> */}
        </section>
    );
};
