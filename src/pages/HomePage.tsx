import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { SLIDES } from '../constants.tsx';
import { Slide } from '../sections/Service';
import { Footer } from '../components/footer.tsx';
import { Hero } from '../sections/Hero.tsx';
import { AboutUs } from '../sections/AboutUs.tsx';
import { ContactSection } from '../sections/ContactSection.tsx';
import { Features } from '../sections/Features.tsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const location = useLocation();

  // Scroll to target when navigated here with state
  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!scrollTo) return;

    if (scrollTo === 'services') {
      setTimeout(() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' }), 100);
    } else if (scrollTo === 'contact') {
      setTimeout(() => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  }, [location.state]);

  // Soft parallax effect for the hero when scrolling
  useEffect(() => {
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
  }, []);

  // GSAP ScrollTrigger-driven slideshow
  useEffect(() => {
    if (!containerRef.current) return;

    const totalSlides = SLIDES.length;
    const snapIncrement = 1 / (totalSlides - 1);

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${totalSlides * 100}%`,
        snap: {
          snapTo: snapIncrement,
          duration: { min: 0.3, max: 0.6 },
          ease: 'power2.inOut',
        },
        onUpdate: (self) => {
          const progress = self.progress;
          const rawIndex = progress * (totalSlides - 1);
          const index = Math.round(rawIndex);
          const clampedIndex = Math.max(0, Math.min(totalSlides - 1, index));

          setCurrentSlideIndex(clampedIndex);

          const snappedProgress = clampedIndex / (totalSlides - 1);
          setSlideProgress(snappedProgress);
        },
      });

      stRef.current = trigger;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNavigate = useCallback((index: number) => {
    const trigger = stRef.current;
    if (!trigger) return;

    const totalSlides = SLIDES.length;
    const targetProgress = index / (totalSlides - 1);
    const scrollStart = trigger.start;
    const scrollEnd = trigger.end;
    const targetScroll = scrollStart + targetProgress * (scrollEnd - scrollStart);

    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Hero - Fixed */}
      <div
        ref={heroRef}
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1600px] h-screen z-[1] will-change-transform"
      >
        <Hero />
      </div>

      {/* Main Content */}
      <main
        className="relative z-10 w-full shadow-[0_-20px_40px_rgba(0,0,0,0.05)]"
        style={{ background: '#F9F7F2', marginTop: '100vh' }}
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
      <div className="relative w-full max-w-[1600px] z-20">
        <ContactSection />
      </div>
    </>
  );
};
