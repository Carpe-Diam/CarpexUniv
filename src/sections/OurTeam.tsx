import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const teamMembers = [
  {
    name: 'Vikram Mehta',
    role: 'Director of Strategy',
    image: '/team/member1.png',
    bio: 'With over 20 years in the luxury sector, Vikram leads our strategic initiatives and global partnerships.'
  },
  {
    name: 'Elena Rossi',
    role: 'Head of Design',
    image: '/team/member2.png',
    bio: 'Elena brings a poetic touch to every collection, blending classical elegance with contemporary flair.'
  },
  {
    name: 'David Chen',
    role: 'Master of Operations',
    image: '/team/member3.png',
    bio: 'David ensures that every bespoke creation meets our rigorous standards of precision and craftsmanship.'
  }
];

export const OurTeam: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set('.team-label-row', { y: 30, opacity: 0 });
      gsap.set('.team-headline', { y: 30, opacity: 0 });
      gsap.set('.team-member-card', { y: 50, opacity: 0 });

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();

          const tl = gsap.timeline();
          tl.to('.team-label-row', { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 })
            .to('.team-headline', { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5')
            .to('.team-member-card', { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power4.out' }, '-=0.6');
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
        
        {/* Section Header */}
        <div className="team-label-row mb-8">
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
            The Visionaries
          </span>
          <div
            className="mt-4"
            style={{ width: '40px', height: '1px', background: '#D4AF37' }}
          />
        </div>

        <h2
          className="team-headline mb-16 lg:mb-20"
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
          Crafting excellence with<br />
          <span style={{ fontStyle: 'italic', fontWeight: 300 }}>decades of expertise.</span>
        </h2>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {teamMembers.map((member, i) => (
            <div key={i} className="team-member-card group">
              <div className="relative aspect-[4/5] overflow-hidden mb-8 bg-[#EEEDE9]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
              
              <h3
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '28px',
                  fontWeight: 400,
                  color: '#2a2725',
                  marginBottom: '8px',
                }}
              >
                {member.name}
              </h3>
              
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase' as const,
                  color: '#D4AF37',
                  display: 'block',
                  marginBottom: '20px',
                }}
              >
                {member.role}
              </span>
              
              <p
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '14px',
                  fontWeight: 300,
                  color: '#655f59',
                  lineHeight: 1.6,
                  maxWidth: '320px'
                }}
              >
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
