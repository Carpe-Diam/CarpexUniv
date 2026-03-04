import { useEffect, useRef, useState } from 'react';
import { SLIDES } from './constants.tsx';
import { Slide } from './sections/Service';
import { Footer } from './components/footer.tsx';
import { Hero } from './sections/Hero.tsx';
import { ContactSection } from './sections/ContactSection.tsx';
import { Navigation } from './components/Navigation.tsx';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [contactHeight, setContactHeight] = useState(800);

  // ResizeObserver for Contact Section height
  useEffect(() => {
    if (!contactRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContactHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(contactRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Logic for Hero Visibility: Hide Hero when Main covers it (scrolled > 100vh)
      // This ensures Hero doesn't block Contact section at the bottom
      if (heroRef.current) {
        if (window.scrollY > window.innerHeight) {
          heroRef.current.style.visibility = 'hidden';
        } else {
          heroRef.current.style.visibility = 'visible';
        }
      }

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
    <div className="relative min-h-screen">
      {/* 
        Parallax Layering:
        1. Hero: Fixed at Top (z-1). Covers Contact at start. Hidden after scroll.
        2. Contact: Fixed at Bottom (z-0). Revealed when Main lifts up.
        3. Main: Relative (z-10). Starts at 100vh (marginTop). Scrolls over everything.
      */}

      {/* Global Navigation - Fixed Z-Infinite */}
      <Navigation />

      {/* Hero Section Container - Fixed */}
      <div
        ref={heroRef}
        className="fixed top-0 left-0 w-full h-screen z-[1]"
      >
        <Hero />
      </div>

      {/* Main Content (Slides) */}
      <main
        className="relative z-10 w-full"
        style={{
          background: '#F9F7F2',
          marginTop: '100vh',
          marginBottom: `${contactHeight}px`
        }}
      >
        {/* The Scroll Container - 500vh height to allow scrolling time */}
        <div ref={containerRef} className="relative h-[500vh]">

          {/* Sticky Viewport - Sticks to top while scrolling through container */}
          <div className="sticky top-0 h-screen overflow-hidden flex flex-col" style={{ backgroundColor: '#F9F7F2' }}>

            {/* Main Content Area */}
            <section className="flex-1 relative w-full">

              {/* Gradient Overlay for bottom text legibility - now for light theme */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/3 z-[5] pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(249, 247, 242, 0.8), transparent)' }}
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
              className="transition-opacity duration-500 ease-in-out"
              style={{ opacity: (currentSlideIndex === SLIDES.length - 1 && slideProgress > 0.95) ? 0 : 1 }}
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

      {/* Contact Section - Fixed at bottom, revealed by scroll */}
      <div
        ref={contactRef}
        className="fixed bottom-0 left-0 w-full z-0"
        style={{ height: 'auto' }}
      >
        <ContactSection />
      </div>
    </div>
  );
}