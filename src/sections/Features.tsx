import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const features = [
  {
    number: '01',
    label: 'Catalogue',
    text: 'A curated catalogue that brings together designs crafted with both desirability and wearability in mind.',
  },
  {
    number: '02',
    label: 'Made to Order',
    text: 'A dedicated made-to-order portal to conveniently define your jewellery requirements and manage bespoke creations.',
  },
  {
    number: '03',
    label: 'End-to-End',
    text: 'We support your jewelry business end-to-end—from branding and packaging to CAD and everything in between.',
  },
];

export const Features: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set('.feature-label-row', { y: 30, opacity: 0 });
      gsap.set('.feature-headline', { y: 30, opacity: 0 });
      gsap.set('.feature-card', { y: 30, opacity: 0 });

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();

          gsap.timeline()
            .to('.feature-label-row', { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 })
            .to('.feature-headline', { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5')
            .to('.feature-card', { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }, '-=0.6');
        },
        { threshold: 0.1 }
      );

      observer.observe(section);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full border-t border-[#e2ddd8]"
      style={{ background: '#F9F7F2', padding: 'clamp(72px, 8vw, 112px) 0' }}
    >
      <div className="px-8 lg:px-16 xl:px-24">

        {/* Section Header — same structure as Service label block */}
        <div className="feature-label-row mb-8">
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.25em',
              textTransform: 'uppercase' as const,
              color: '#8c857d',
            }}
          >
            What We Offer
          </span>
          {/* Gold accent line — matches Service's slide-line: 40px × 1px */}
          <div
            className="mt-4"
            style={{ width: '40px', height: '1px', background: '#D4AF37' }}
          />
        </div>

        <h2
          className="feature-headline mb-16 lg:mb-20"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(42px, 6vw, 76px)',
            fontWeight: 400,
            color: '#2a2725',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            maxWidth: '640px',
          }}
        >
          Built for the modern<br />
          <span style={{ fontStyle: 'italic', fontWeight: 300 }}>jewellery business.</span>
        </h2>

        {/* Feature grid — gap-px divider using site border colour */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px" style={{ background: '#e2ddd8' }}>
          {features.map((feature, i) => (
            <div
              key={feature.number}
              className="feature-card relative flex flex-col px-10 py-12 xl:px-14 xl:py-14 overflow-hidden cursor-default"
              style={{
                background: hoveredIndex === i ? '#F3F1EC' : '#F9F7F2',
                transition: 'background 0.5s ease',
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Gold left accent on hover — same treatment as Service's left gradient */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  background: '#D4AF37',
                  transform: hoveredIndex === i ? 'scaleY(1)' : 'scaleY(0)',
                  transformOrigin: 'top',
                  transition: 'transform 0.5s ease',
                }}
              />

              {/* Number */}
              <span
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(56px, 5vw, 76px)',
                  fontWeight: 300,
                  lineHeight: 1,
                  color: hoveredIndex === i ? '#D4AF37' : '#c9bfa0',
                  transition: 'color 0.5s ease',
                  display: 'block',
                  marginBottom: '24px',
                }}
              >
                {feature.number}
              </span>

              {/* 40px gold line — exactly matching Service's slide-line */}
              <div
                style={{
                  width: '40px',
                  height: '1px',
                  background: '#D4AF37',
                  marginBottom: '28px',
                  opacity: hoveredIndex === i ? 1 : 0.45,
                  transition: 'opacity 0.5s ease',
                }}
              />

              {/* Label */}
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase' as const,
                  color: hoveredIndex === i ? '#D4AF37' : '#8c857d',
                  transition: 'color 0.5s ease',
                  display: 'block',
                  marginBottom: '16px',
                }}
              >
                {feature.label}
              </span>

              {/* Body text — left border matching Service's description style */}
              <p
                className="pl-4 border-l border-[#e2ddd8]"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '16px',
                  fontWeight: 300,
                  color: hoveredIndex === i ? '#2a2725' : '#655f59',
                  lineHeight: 1.8,
                  transition: 'color 0.5s ease',
                  flex: 1,
                }}
              >
                {feature.text}
              </p>

              {/* CTA — underline style matching Service's button exactly */}
              <div
                className="mt-10"
                style={{
                  opacity: hoveredIndex === i ? 1 : 0,
                  transform: hoveredIndex === i ? 'translateX(0)' : 'translateX(-8px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                }}
              >
                <div className="flex items-center gap-4 text-[#D4AF37] pb-2 border-b border-[#D4AF37]/40 w-fit">
                  <span
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '12px',
                      fontWeight: 500,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase' as const,
                    }}
                  >
                    Discover More
                  </span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
