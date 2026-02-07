import { useEffect, useRef, useState } from 'react';
import { SLIDES } from './constants.tsx';
import { Slide } from './sections/Service';
import { Footer } from './components/footer.tsx';
import { Hero } from './sections/Hero.tsx';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);

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
    <main className="bg-white">
      {/* Hero Section */}
      <Hero />

      {/* The Scroll Container - 500vh height to allow scrolling time */}
      <div ref={containerRef} className="relative h-[500vh]">

        {/* Sticky Viewport - Sticks to top while scrolling through container */}
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col" style={{ backgroundColor: '#0a0a0a' }}>

          {/* Main Content Area */}
          <section className="flex-1 relative w-full">

            {/* Gradient Overlay for bottom text legibility */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/2 z-[5] pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}
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
          <Footer
            slides={SLIDES}
            currentSlideIndex={currentSlideIndex}
            slideProgress={slideProgress}
            onNavigate={handleNavigate}
          />

        </div>
      </div>

      {/* Outro Spacer */}
      <div className="h-[100vh] flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">End of section</p>
      </div>
    </main>
  );
}