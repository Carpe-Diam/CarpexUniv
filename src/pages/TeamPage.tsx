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

interface TeamPageProps {
  setCurrentView: (view: 'home' | 'team') => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ setCurrentView }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set('.team-label-row', { y: 30, opacity: 0 });
      gsap.set('.team-headline', { y: 30, opacity: 0 });
      gsap.set('.team-member-card', { y: 50, opacity: 0 });
      gsap.set('.team-logo', { scale: 0.9, opacity: 0 });

      gsap.timeline()
        .to('.team-logo', { scale: 1, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.3 })
        .to('.team-label-row', { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5')
        .to('.team-headline', { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5')
        .to('.team-member-card', { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power4.out' }, '-=0.6');
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#F9F7F2] text-[#2a2725]">
      
      {/* Fixed Logo Container - Aligned with 1600px bounds */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1600px] z-[110] pointer-events-none">
        <button 
          onClick={() => setCurrentView('home')}
          className="absolute top-8 left-8 md:top-12 md:left-12 team-logo cursor-pointer pointer-events-auto transition-transform hover:scale-105 active:scale-95"
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
        <div className="px-8 lg:px-16 xl:px-24 max-w-[1600px] mx-auto">
          
          {/* Section Header */}
          <div className="team-label-row mb-8">
            <span
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
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

          <h1
            className="team-headline mb-24 lg:mb-32"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 400,
              color: '#2a2725',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              maxWidth: '900px',
            }}
          >
            Crafting excellence with<br />
            <span style={{ fontStyle: 'italic', fontWeight: 300 }}>decades of expertise.</span>
          </h1>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 xl:gap-24">
            {teamMembers.map((member, i) => (
              <div key={i} className="team-member-card group">
                <div className="relative aspect-[4/5] overflow-hidden mb-10 bg-[#EEEDE9] shadow-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
                
                <h3
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '32px',
                    fontWeight: 400,
                    color: '#2a2725',
                    marginBottom: '10px',
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
                    textTransform: 'uppercase',
                    color: '#D4AF37',
                    display: 'block',
                    marginBottom: '24px',
                  }}
                >
                  {member.role}
                </span>
                
                <div className="w-8 h-[1px] bg-[#e2ddd8] mb-6 group-hover:w-16 transition-all duration-500" />
                
                <p
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '15px',
                    fontWeight: 300,
                    color: '#655f59',
                    lineHeight: 1.8,
                    maxWidth: '340px'
                  }}
                >
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Buffer */}
      <div className="h-40" />
    </div>
  );
};
