import { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';

export const ContactSection = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setIsSuccess(false);
        setIsError(false);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const scriptURL = 'https://script.google.com/macros/s/AKfycbzKpb9yDH8TKpFE8FWhgtPlY-wGw9uvJn6fs8Xz1_7nNXxxOsJGlNCxj-i92eeQjrqC/exec';

        try {
            await fetch(scriptURL, { method: 'POST', body: formData });
            setIsSuccess(true);
            form.reset();
        } catch (error) {
            console.error('Error!', error);
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            className="w-full relative"
            style={{
                background: '#F2EEE5', // Beige background
                padding: 'clamp(60px, 8vw, 100px) 0',
            }}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* LEFT COLUMN: Contact Information */}
                    <div className="space-y-12">
                        {/* Heading */}
                        <div className="space-y-4">
                            <h2
                                style={{
                                    fontFamily: 'Cormorant Garamond, serif',
                                    fontWeight: 400,
                                    fontSize: 'clamp(40px, 4vw, 56px)',
                                    color: '#0F172A', // Dark Blue/Black
                                    lineHeight: 1.1,
                                }}
                            >
                                Contact<br />Information
                            </h2>
                        </div>

                        {/* Details List */}
                        <div className="space-y-6">
                            {/* Email */}
                            <a href="mailto:hello@carpediam.com" className="flex items-center gap-4 group">
                                <Mail className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                                <span className="font-sans text-[#334155] text-lg font-light group-hover:text-[#D4AF37] transition-colors">
                                    hello@carpediam.in
                                </span>
                            </a>

                            {/* Phone */}
                            <a href="tel:+12125550192" className="flex items-center gap-4 group">
                                <Phone className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                                <span className="font-sans text-[#334155] text-lg font-light group-hover:text-[#D4AF37] transition-colors">
                                    Rushabh doshi - 9930900465
                                </span>
                            </a>

                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                                <span className="font-sans text-[#334155] text-lg font-light leading-relaxed">
                                    Carpe diam Jewels pvt ltd.<br />
                                    802/8th floor. 93 east , <br />
                                    opp. Nand bhuvan industrial estate, above burger king, <br />
                                    mahakali caves road Andheri east <br />
                                    Maharashtra, Mumbai:400093
                                </span>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-6 pt-4">
                            <a href="#" className="text-[#0F172A] hover:text-[#D4AF37] transition-colors">
                                <Instagram className="w-8 h-8" strokeWidth={1.5} />
                            </a>
                            <a href="#" className="text-[#0F172A] hover:text-[#D4AF37] transition-colors">
                                <Linkedin className="w-8 h-8" strokeWidth={1.5} />
                            </a>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Contact Form */}
                    <div className="w-full">
                        <h2
                            className="mb-10"
                            style={{
                                fontFamily: 'Cormorant Garamond, serif',
                                fontWeight: 400,
                                fontSize: 'clamp(40px, 4vw, 56px)',
                                color: '#0F172A', // Dark Blue/Black
                            }}
                        >
                            Get in Touch
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Input */}
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Name"
                                    className="w-full p-4 bg-transparent border border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder:text-[#64748B] font-sans"
                                    style={{ borderRadius: 0 }}
                                />
                            </div>

                            {/* Email Input */}
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Email Address"
                                    className="w-full p-4 bg-transparent border border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder:text-[#64748B] font-sans"
                                    style={{ borderRadius: 0 }}
                                />
                            </div>

                            {/* Message Textarea */}
                            <div className="relative">
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    placeholder="Message"
                                    className="w-full p-4 bg-transparent border border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder:text-[#64748B] font-sans resize-none"
                                    style={{ borderRadius: 0 }}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 text-white font-bold tracking-widest uppercase text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                                style={{
                                    backgroundColor: '#B89628', // Darker gold/mustard for button
                                    fontFamily: 'Montserrat, sans-serif',
                                }}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>

                            {/* Status Messages */}
                            {isSuccess && (
                                <div className="p-4 bg-green-50 text-green-800 text-center font-sans text-sm">
                                    Message sent successfully!
                                </div>
                            )}
                            {isError && (
                                <div className="p-4 bg-red-50 text-red-800 text-center font-sans text-sm">
                                    Something went wrong. Please try again.
                                </div>
                            )}
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};
