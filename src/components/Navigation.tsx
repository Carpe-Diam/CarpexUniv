import { useState } from 'react';
import { X } from 'lucide-react';

interface NavigationProps {
    currentView: 'home' | 'team';
    setCurrentView: (view: 'home' | 'team') => void;
}

export const Navigation = ({ currentView, setCurrentView }: NavigationProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleNav = (destination: string) => {
        setIsMenuOpen(false);
        
        if (destination === 'team') {
            setCurrentView('team');
            window.scrollTo({ top: 0, behavior: 'instant' });
            return;
        }

        // For all other destinations, we must be on the 'home' view
        if (currentView !== 'home') {
            setCurrentView('home');
            // Give a tiny moment for React to render the home view before scrolling
            setTimeout(() => performScroll(destination), 50);
        } else {
            performScroll(destination);
        }
    };

    const performScroll = (destination: string) => {
        if (destination === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (destination === 'services') {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        } else if (destination === 'contact') {
            const scrollHeight = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.offsetHeight,
                document.body.clientHeight,
                document.documentElement.clientHeight
            );
            window.scrollTo({ top: scrollHeight, behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Top Right Menu Trigger */}
            <button
                onClick={toggleMenu}
                className={`absolute top-8 right-8 md:top-12 md:right-12 z-[100] text-[#2a2725] hover:text-[#D4AF37] transition-all duration-300 p-2 cursor-pointer pointer-events-auto ${isMenuOpen ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
                aria-label="Open Menu"
            >
                <div className="flex flex-col gap-[5px] items-end group">
                    <div className="w-8 h-[1.5px] bg-current transition-all duration-300 group-hover:w-6" />
                    <div className="w-6 h-[1.5px] bg-current transition-all duration-300 group-hover:w-8" />
                </div>
            </button>

            {/* Menu Backdrop */}
            <div
                className={`fixed inset-0 bg-[#2a2725]/40 backdrop-blur-sm z-[90] pointer-events-auto transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                    }`}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Right Side Tray */}
            <div
                className={`absolute top-0 right-0 h-full w-full sm:w-[400px] bg-[#EEEDE9] z-[100] pointer-events-auto shadow-[auto] transform transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] flex flex-col pt-32 px-12 sm:px-16 border-l border-[#e2ddd8] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Close Button Inside Tray */}
                <button
                    onClick={toggleMenu}
                    className="absolute top-8 right-8 md:top-12 md:right-12 text-[#2a2725] hover:text-[#D4AF37] transition-colors p-2 cursor-pointer group"
                    aria-label="Close Menu"
                >
                    <X size={32} strokeWidth={1} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>

                <div className="mb-16">
                    <span className="text-[#8c857d] font-sans text-xs tracking-[0.2em] uppercase font-medium border-b border-[#e2ddd8] pb-2 inline-block">
                        Navigation
                    </span>
                </div>

                <nav className="flex flex-col gap-8 items-start">
                    {[
                        { name: 'Home', id: 'home' },
                        { name: 'Services & Operations', id: 'services' },
                        { name: 'Our Team', id: 'team' },
                        { name: 'Direct Inquiry', id: 'contact' }
                    ].map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => handleNav(item.id)}
                            className="group relative font-serif text-3xl sm:text-4xl text-[#2a2725] hover:text-[#D4AF37] transition-colors duration-500 cursor-pointer text-left w-full overflow-hidden"
                            style={{
                                transitionDelay: `${index * 50}ms`,
                                opacity: isMenuOpen ? 1 : 0,
                                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)'
                            }}
                        >
                            <span className="relative z-10 block pr-8">{item.name}</span>
                            {/* Hover line effect */}
                            <div className="absolute top-1/2 left-0 w-0 h-[1px] bg-[#D4AF37] -translate-y-1/2 transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100 z-0" />
                        </button>
                    ))}

                    {/* External Portal Link */}
                    <div className="mt-4 pt-8 border-t border-[#e2ddd8] w-full">
                        <a
                            href="https://app.univdiam.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative font-serif text-2xl sm:text-3xl text-[#2a2725] hover:text-[#D4AF37] transition-colors duration-500 cursor-pointer text-left w-full overflow-hidden flex items-center gap-4"
                            style={{
                                transitionDelay: `${4 * 50}ms`,
                                opacity: isMenuOpen ? 1 : 0,
                                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)'
                            }}
                        >
                            <span className="relative z-10 block pr-8">Access the Portal</span>
                            <svg className="w-6 h-6 transform -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                            <div className="absolute top-1/2 left-0 w-0 h-[1px] bg-[#D4AF37] -translate-y-1/2 transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100 z-0" />
                        </a>
                    </div>
                </nav>

                <div className="mt-auto pb-12 opacity-80"
                    style={{
                        transitionDelay: `400ms`,
                        opacity: isMenuOpen ? 1 : 0,
                        transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.5s ease-out'
                    }}
                >
                    <p className="text-[#8c857d] font-sans text-xs tracking-widest uppercase mb-4">Contact</p>
                    <a href="mailto:hello@carpediam.in" className="block text-[#2a2725] font-sans text-sm hover:text-[#D4AF37] transition-colors mb-2">hello@carpediam.in</a>
                    <a href="tel:+919930900465" className="block text-[#2a2725] font-sans text-sm hover:text-[#D4AF37] transition-colors">+91 99309 00465</a>
                </div>
            </div>
        </>
    );
};

