import { useEffect, useRef, useState, useCallback } from 'react';
import { SLIDES } from './constants.tsx';
import { Slide } from './sections/Service';
import { Footer } from './components/footer.tsx';
import { Hero } from './sections/Hero.tsx';
import { AboutUs } from './sections/AboutUs.tsx';
import { ContactSection } from './sections/ContactSection.tsx';
import { Features } from './sections/Features.tsx';
import { Navigation } from './components/Navigation.tsx';
import { AnimatedBackground } from './components/AnimatedBackground.tsx';
import { TeamPage } from './pages/TeamPage.tsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [currentView, setCurrentView] = useState<'home' | 'team'>('home');


  // Soft Parallax effect for the hero when scrolling down
  useEffect(() => {
    if (currentView !== 'home') return;

    const handleHeroParallax = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;

      if (scrollY <= window.innerHeight) {
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
  }, [currentView]);

  // ── GSAP ScrollTrigger-driven slideshow ──
  useEffect(() => {
    if (currentView !== 'home' || !containerRef.current) return;

    const totalSlides = SLIDES.length;
    const snapIncrement = 1 / (totalSlides - 1); // 0.5 for 3 slides

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        pin: true,                          // pin the container in the viewport
        scrub: 1,                           // smooth 1-second lag behind scroll
        start: 'top top',                   // pin starts when top of container hits top of viewport
        end: () => `+=${totalSlides * 100}%`, // scroll distance = SLIDES.length × 100vh
        snap: {
          snapTo: snapIncrement,            // snap to each slide boundary
          duration: { min: 0.3, max: 0.6 }, // snap animation duration range
          ease: 'power2.inOut',             // smooth snap easing
        },
        onUpdate: (self) => {
          const progress = self.progress;   // 0 → 1 over whole scroll distance

          // Map progress to slide index (0, 1, 2 for 3 slides)
          const rawIndex = progress * (totalSlides - 1);
          const index = Math.round(rawIndex);
          const clampedIndex = Math.max(0, Math.min(totalSlides - 1, index));

          setCurrentSlideIndex(clampedIndex);

          // Map progress to a snapped value for the footer progress bar
          const snappedProgress = clampedIndex / (totalSlides - 1);
          setSlideProgress(snappedProgress);
        },
      });

      // Store reference for handleNavigate
      stRef.current = trigger;
    }, containerRef);

    return () => ctx.revert(); // clean up for React Strict Mode & unmount
  }, [currentView]);

  // Navigate to a specific slide by scrolling to the correct position
  const handleNavigate = useCallback((index: number) => {
    const trigger = stRef.current;
    if (!trigger) return;

    const totalSlides = SLIDES.length;
    const targetProgress = index / (totalSlides - 1);

    // Calculate the absolute scroll position for this progress
    const scrollStart = trigger.start;
    const scrollEnd = trigger.end;
    const targetScroll = scrollStart + targetProgress * (scrollEnd - scrollStart);

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }, []);

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

        {/* Global Navigation - Fixed Z-[100] */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1600px] h-screen z-[100] pointer-events-none overflow-hidden">
          <Navigation currentView={currentView} setCurrentView={setCurrentView} />
        </div>

        {currentView === 'home' ? (
          <>
            {/* Hero Section Container - Fixed */}
            <div
              ref={heroRef}
              className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1600px] h-screen z-[1] will-change-transform"
            >
              <Hero />
            </div>

            {/* Main Content (Slides) */}
            <main
              className="relative z-10 w-full shadow-[0_-20px_40px_rgba(0,0,0,0.05)]"
              style={{
                background: '#F9F7F2',
                marginTop: '100vh'
              }}
            >
              <AboutUs />
              <div ref={containerRef} className="relative h-screen overflow-hidden flex flex-col" style={{ backgroundColor: '#F9F7F2' }}>
                <section className="flex-1 relative w-full">
                  <div
                    className="absolute inset-x-0 bottom-0 h-[40vh] z-[5] pointer-events-none mix-blend-multiply opacity-5"
                    style={{ background: 'linear-gradient(to top, #8c857d, transparent)' }}
                  />
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

                <Footer
                  slides={SLIDES}
                  currentSlideIndex={currentSlideIndex}
                  slideProgress={slideProgress}
                  onNavigate={handleNavigate}
                />
              </div>
            </main>

            {/* Features Section */}
            <div className="relative w-full max-w-[1600px] z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
              <Features />
            </div>

            {/* Contact Section */}
            <div
              ref={contactRef}
              className="relative w-full max-w-[1600px] z-20"
            >
              <ContactSection />
            </div>
          </>
        ) : (
          <div className="relative z-10 w-full">
            <TeamPage setCurrentView={setCurrentView} />

            {/* Simple Contact Footer for other pages */}
            <div className="relative w-full max-w-[1600px] z-20">
              <ContactSection />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
