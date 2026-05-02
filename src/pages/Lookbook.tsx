import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Play } from 'lucide-react';

const jewelryImages = {
  img1: '/lookbook/jewel1.png',
  img2: '/lookbook/jewel2.png',
  img3: '/lookbook/jewel3.png',
  img4: '/lookbook/jewel4.png',
  img5: '/lookbook/jewel5.png',
  img6: '/lookbook/jewel6.png',
  img7: '/lookbook/jewel7.png',
  img8: '/lookbook/jewel8.png',
  img9: '/lookbook/jewel9.png',
};

export const LookbookPage: React.FC = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set('.lookbook-label-row', { y: 30, opacity: 0 });
      gsap.set('.lookbook-headline', { y: 30, opacity: 0 });
      gsap.set('.lookbook-image-container', { opacity: 0, y: 40 });
      gsap.set('.lookbook-logo', { scale: 0.9, opacity: 0 });

      gsap.timeline()
        .to('.lookbook-logo', { scale: 1, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.3 })
        .to('.lookbook-label-row', { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5')
        .to('.lookbook-headline', { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5')
        .to('.lookbook-image-container', { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out' }, '-=0.6');
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#F9F7F2] text-[#2a2725]">
      
      {/* Fixed Logo Container */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1600px] z-[110] pointer-events-none">
        <button 
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 md:top-12 md:left-12 lookbook-logo cursor-pointer pointer-events-auto transition-transform hover:scale-105 active:scale-95"
          aria-label="Back to Home"
        >
          <img src="/UD.png" alt="Carpe Diam" className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto opacity-90" />
        </button>
      </div>

      {/* Page Content */}
      <section
        ref={sectionRef}
        className="w-full pt-48 pb-24 md:pt-64 md:pb-40"
      >
        <div className="px-4 sm:px-8 lg:px-16 xl:px-24 max-w-[1600px] mx-auto">
          
          {/* Section Header */}
          <div className="lookbook-label-row mb-8">
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#8c857d',
              }}
            >
              The Collection
            </span>
            <div
              className="mt-4"
              style={{ width: '40px', height: '1px', background: '#D4AF37' }}
            />
          </div>

          <h1
            className="lookbook-headline mb-8"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 400,
              color: '#2a2725',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              maxWidth: '900px',
            }}
          >
            A curated glimpse into<br />
            <span style={{ fontStyle: 'italic', fontWeight: 300 }}>our latest creations.</span>
          </h1>

          {/* Context intro */}
          <div className="lookbook-headline mb-16 lg:mb-24 flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-16">
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: 300,
                color: '#655f59',
                lineHeight: 1.75,
                maxWidth: '480px',
              }}
            >
              A preview of our design and manufacturing capabilities. Full collections, material specifications, and pricing are available upon request.
            </p>
            <a
              href="mailto:hello@univdiam.com?subject=Lookbook%20Full%20Access%20Request"
              className="flex-shrink-0 inline-flex items-center gap-3 border border-[#2a2725] text-[#2a2725] px-7 py-4 hover:bg-[#2a2725] hover:text-white transition-colors duration-300"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              Request Full Access
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Collage Layout */}
          <div className="flex flex-col w-full gap-1 sm:gap-2">
            
            {/* Row 1 */}
            <div className="flex w-full gap-1 sm:gap-2 h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]">
              <div className="lookbook-image-container w-[60%] relative h-full group overflow-hidden bg-[#EEEDE9]">
                <img src={jewelryImages.img1} alt="Jewelry 1" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>
              <div className="lookbook-image-container w-[40%] relative h-full group overflow-hidden bg-[#EEEDE9]">
                <img src={jewelryImages.img2} alt="Jewelry 2" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex w-full gap-1 sm:gap-2 h-[35vh] sm:h-[45vh] md:h-[50vh] lg:h-[60vh]">
              <div className="lookbook-image-container w-[40%] relative h-full group overflow-hidden bg-[#EEEDE9]">
                <img src={jewelryImages.img3} alt="Jewelry 3" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>
              <div className="lookbook-image-container w-[60%] relative h-full group overflow-hidden bg-[#EEEDE9] cursor-pointer">
                <img src={jewelryImages.img4} alt="Jewelry 4" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
                   <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                     <Play className="w-5 h-5 text-[#2a2725] ml-1" fill="currentColor" />
                   </div>
                </div>
              </div>
            </div>

            {/* Row 3 - Complex 3 images */}
            <div className="flex w-full gap-1 sm:gap-2 h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh]">
              <div className="lookbook-image-container w-[65%] relative h-full group overflow-hidden bg-[#EEEDE9]">
                <img src={jewelryImages.img5} alt="Jewelry 5" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>
              <div className="w-[35%] flex flex-col gap-1 sm:gap-2 h-full">
                <div className="lookbook-image-container relative h-1/2 w-full group overflow-hidden bg-[#EEEDE9]">
                  <img src={jewelryImages.img6} alt="Jewelry 6" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
                <div className="lookbook-image-container relative h-1/2 w-full group overflow-hidden bg-[#EEEDE9] cursor-pointer">
                  <img src={jewelryImages.img7} alt="Jewelry 7" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
                     <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                       <Play className="w-4 h-4 text-[#2a2725] ml-1" fill="currentColor" />
                     </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex w-full gap-1 sm:gap-2 h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]">
              <div className="lookbook-image-container w-[35%] relative h-full group overflow-hidden bg-[#EEEDE9]">
                <img src={jewelryImages.img8} alt="Jewelry 8" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>
              <div className="lookbook-image-container w-[65%] relative h-full group overflow-hidden bg-[#EEEDE9]">
                <img src={jewelryImages.img9} alt="Jewelry 9" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Buffer */}
      <div className="h-40" />
    </div>
  );
};
