import { useEffect, useRef, useState } from 'react';
import { SLIDES } from './constants.tsx';
import { Slide } from './sections/Service';
import { Footer } from './components/footer.tsx';
import { Hero } from './sections/Hero.tsx';
import { ContactSection } from './sections/ContactSection.tsx';
import { Features } from './sections/Features.tsx';
import { Navigation } from './components/Navigation.tsx';
import { AnimatedBackground } from './components/AnimatedBackground.tsx';
import gsap from 'gsap';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);


  // Soft Parallax effect for the hero when scrolling down
  useEffect(() => {
    const handleHeroParallax = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;

      if (scrollY <= window.innerHeight) {
        // Move the hero down slightly as we scroll away, creating depth
        gsap.set(heroRef.current, {
          y: scrollY * 0.4,
          opacity: 1 - (scrollY / window.innerHeight),
          visibility: 'visible'
        });
      } else {
        gsap.set(heroRef.current, { visibility: 'hidden' });
      }
    };

    window.addEventListener('scroll', handleHeroParallax, { passive: true });
    return () => window.removeEventListener('scroll', handleHeroParallax);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const { top, height } = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate how far we've scrolled into the container
      const scrolled = -top;
      const scrollableHeight = height - viewportHeight;

      if (scrollableHeight <= 0) return;

      // Normalize scroll progress between 0 and 1
      let progress = scrolled / scrollableHeight;
      progress = Math.max(0, Math.min(1, progress));

      const totalSlides = SLIDES.length;

      // Map progress to slides
      const rawSlideIndex = progress * totalSlides;

      let index = Math.floor(rawSlideIndex);
      index = Math.max(0, Math.min(totalSlides - 1, index));

      // Calculate progress within the current slide (0 to 1)
      const currentSlideProgress = rawSlideIndex - index;

      // Edge case: if we are at the very end
      if (progress >= 1) {
        index = totalSlides - 1;
      }

      setCurrentSlideIndex(index);
      setSlideProgress(progress >= 1 ? 1 : currentSlideProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (index: number) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerTop = container.offsetTop;
    const scrollableHeight = container.offsetHeight - window.innerHeight;
    const scrollPerSlide = scrollableHeight / SLIDES.length;

    const targetScrollY = containerTop + (index * scrollPerSlide) + 10;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-screen bg-[#EEEDE9] text-[#2a2725] selection:bg-[#D4AF37]/30 flex justify-center w-full">

      {/* 
        This is the texture for the OUTER grey areas on large screens.
        It sits behind the main 1600px wrapper. 
      */}
      <div className="fixed inset-0 z-[0] pointer-events-none">
        <AnimatedBackground />
      </div>

      <div className="relative w-full max-w-[1600px] bg-[#F9F7F2] shadow-2xl min-h-screen z-10">
        {/* 
          Parallax Layering:
          1. Hero: Fixed at Top (z-1). Covers Contact at start. Hidden after scroll.
          2. Contact: Fixed at Bottom (z-0). Revealed when Main lifts up.
          3. Main: Relative (z-10). Starts at 100vh (marginTop). Scrolls over everything.
        */}

        {/* Global Navigation - Fixed Z-[100] */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1600px] h-screen z-[100] pointer-events-none overflow-hidden">
          <Navigation />
        </div>

        {/* Hero Section Container - Fixed */}
        <div
          ref={heroRef}
          className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1600px] h-screen z-[1] will-change-transform" /* Optimize for parallax */
        >
          <Hero />
        </div>

        {/* Main Content (Slides) */}
        <main
          className="relative z-10 w-full shadow-[0_-20px_40px_rgba(0,0,0,0.05)]" /* Soft shadow over hero */
          style={{
            background: '#F9F7F2',
            marginTop: '100vh'
          }}
        >
          {/* The Scroll Container - 500vh height to allow scrolling time */}
          <div ref={containerRef} className="relative h-[500vh]">

            {/* Sticky Viewport - Sticks to top while scrolling through container */}
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col" style={{ backgroundColor: '#F9F7F2' }}>

              {/* Main Content Area */}
              <section className="flex-1 relative w-full">

                {/* Gradient Overlay for bottom text legibility */}
                <div
                  className="absolute inset-x-0 bottom-0 h-[40vh] z-[5] pointer-events-none mix-blend-multiply opacity-5"
                  style={{ background: 'linear-gradient(to top, #8c857d, transparent)' }}
                />

                {/* Slides */}
                <div className="relative w-full h-full">
                  {SLIDES.map((slide, index) => (
                    <Slide
                      key={slide.id}
                      data={slide}
                      isActive={index === currentSlideIndex}
                    />
                  ))}
                </div>
              </section>

              {/* Footer Navigation - Always at bottom of sticky container */}
              <div
                className="transition-all duration-700 ease-in-out"
                style={{
                  opacity: (currentSlideIndex === SLIDES.length - 1 && slideProgress > 0.95) ? 0 : 1,
                  transform: (currentSlideIndex === SLIDES.length - 1 && slideProgress > 0.95) ? 'translateY(100%)' : 'translateY(0)'
                }}
              >
                <Footer
                  slides={SLIDES}
                  currentSlideIndex={currentSlideIndex}
                  slideProgress={slideProgress}
                  onNavigate={handleNavigate}
                />
              </div>

            </div>
          </div>
        </main>

        {/* Features Section */}
        <div className="relative w-full max-w-[1600px] z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
          <Features />
        </div>

        {/* Contact Section - Attached to the bottom of the scrolling flow */}
        <div
          ref={contactRef}
          className="relative w-full max-w-[1600px] z-20"
        >
          <ContactSection />
        </div>
      </div>
    </div>
  );
}