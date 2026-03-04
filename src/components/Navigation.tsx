import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleNav = (destination: string) => {
        setIsMenuOpen(false);
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
                className={`fixed top-8 right-8 z-[100] text-[#3C3633] hover:text-[#D4AF37] transition-all duration-300 p-2 cursor-pointer ${isMenuOpen ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
                aria-label="Open Menu"
            >
                <Menu size={32} />
            </button>

            {/* Menu Backdrop */}
            <div
                className={`fixed inset-0 bg-black/20 z-[90] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                    }`}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Right Side Tray */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-[#F9F7F2] z-[100] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col pt-24 px-8 border-l border-[#D4AF37]/20 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Close Button Inside Tray */}
                <button
                    onClick={toggleMenu}
                    className="absolute top-8 right-8 text-[#3C3633] hover:text-[#D4AF37] transition-colors p-2 cursor-pointer"
                    aria-label="Close Menu"
                >
                    <X size={32} />
                </button>

                <nav className="flex flex-col gap-6 items-start mt-4">
                    {['Home', 'Services', 'Contact Us'].map((item) => (
                        <button
                            key={item}
                            onClick={() => handleNav(item.toLowerCase().split(' ')[0])}
                            className="font-serif text-2xl text-[#3C3633] hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer text-left w-full border-b border-[#D4AF37]/10 pb-2"
                        >
                            {item}
                        </button>
                    ))}
                </nav>
            </div>
        </>
    );
};
