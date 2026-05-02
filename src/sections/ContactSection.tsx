import { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Linkedin, ArrowRight } from 'lucide-react';

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
            className="w-full relative bg-[#EEEDE9] border-t border-[#e2ddd8]"
            style={{
                padding: 'clamp(80px, 10vw, 120px) 0',
            }}
        >
            <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-24">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start">

                    {/* LEFT COLUMN: Contact Information */}
                    <div className="space-y-16">
                        {/* Heading */}
                        <div className="space-y-6">
                            <span className="text-[#8c857d] font-sans text-xs md:text-sm tracking-[0.2em] uppercase font-medium">
                                Direct Inquiry
                            </span>
                            <h2
                                style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 400,
                                    fontSize: 'clamp(46px, 5vw, 64px)',
                                    color: '#2a2725',
                                    lineHeight: 1.05,
                                    letterSpacing: '-0.02em',
                                }}
                            >
                                Start a <br className="hidden sm:block" />
                                conversation.
                            </h2>
                            <p className="text-[#655f59] font-sans text-lg font-light max-w-sm leading-relaxed">
                                Tell us about what you're looking to create or manufacture. We'll guide you from there.
                            </p>
                        </div>

                        {/* Details List */}
                        <div className="space-y-8 border-l border-[#D4AF37]/40 pl-6">
                            {/* Email */}
                            <a href="mailto:hello@univdiam.com" className="flex items-center gap-6 group">
                                <Mail className="w-5 h-5 text-[#8c857d] group-hover:text-[#D4AF37] transition-colors stroke-[1.5]" />
                                <span className="font-sans text-[#2a2725] text-base font-medium tracking-wide group-hover:text-[#D4AF37] transition-colors">
                                    hello@univdiam.com
                                </span>
                            </a>

                            {/* Phone */}
                            <a href="tel:+919930900465" className="flex items-center gap-6 group">
                                <Phone className="w-5 h-5 text-[#8c857d] group-hover:text-[#D4AF37] transition-colors stroke-[1.5]" />
                                <span className="font-sans text-[#2a2725] text-base font-medium tracking-wide group-hover:text-[#D4AF37] transition-colors">
                                    +1 412 391 9650<br />
                                    <span className="text-[#8c857d] text-sm font-normal">Girish Jain</span>
                                </span>
                            </a>

                            {/* Address */}
                            <div className="flex items-start gap-6 pt-2">
                                <MapPin className="w-5 h-5 text-[#8c857d] flex-shrink-0 mt-1 stroke-[1.5]" />
                                <span className="font-sans text-[#655f59] text-sm font-light leading-relaxed max-w-[280px]">
                                    <strong className="text-[#2a2725] font-medium block mb-1">Univ Diam</strong>
                                    <span className="text-[#8c857d] text-xs block mb-1">A division of Carpe Diam Jewels Pvt Ltd.</span>
                                    802/8th floor. 93 east, <br />
                                    Opp. Nand Bhuvan Industrial Estate,<br />
                                    Above Burger King, Mahakali Caves Road,<br />
                                    Andheri East, Mumbai: 400093
                                </span>
                            </div>
                        </div>

                        {/* Social Icons - Clean & Minimal */}
                        <div className="flex items-center gap-6 pt-8 border-t border-[#e2ddd8]">
                            <span className="text-[#8c857d] font-sans text-xs tracking-[0.15em] uppercase">Connect</span>
                            <div className="w-8 h-[1px] bg-[#e2ddd8]" />
                            <a href="#" className="p-2 border border-[#e2ddd8] rounded-full text-[#655f59] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all bg-white/50">
                                <Instagram className="w-4 h-4" strokeWidth={1.5} />
                            </a>
                            <a href="#" className="p-2 border border-[#e2ddd8] rounded-full text-[#655f59] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all bg-white/50">
                                <Linkedin className="w-4 h-4" strokeWidth={1.5} />
                            </a>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Contact Form */}
                    <div className="w-full bg-white p-10 shadow-sm border border-[#e2ddd8]">
                        <div className="mb-10 flex items-center justify-between">
                            <h3
                                className="font-serif text-3xl text-[#2a2725] font-normal"
                            >
                                Project Inquiry
                            </h3>
                            <ArrowRight className="w-5 h-5 text-[#D4AF37] stroke-[1]" />
                        </div>

                        {/* Form guidance */}
                        <div className="mb-8 p-5 bg-[#F9F7F2] border border-[#e2ddd8]">
                            <p
                                className="text-[#655f59] mb-3"
                                style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 300, lineHeight: 1.7 }}
                            >
                                Typical inquiries include custom jewelry design, private label manufacturing, and bulk production.
                            </p>
                            <p
                                className="text-[#8c857d]"
                                style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 300, lineHeight: 1.6 }}
                            >
                                Not sure what to include? Share your product type, estimated quantity, and timeline — we'll take it from there.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Input Group */}
                            <div className="space-y-6">
                                {/* Name Input */}
                                <div className="relative border-b border-[#e2ddd8] group">
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Full Name"
                                        className="w-full py-4 bg-transparent focus:outline-none transition-all placeholder:text-[#a59d95] font-sans text-sm text-[#2a2725]"
                                    />
                                    <div className="absolute bottom-[-1px] left-0 w-0 h-[1px] bg-[#2a2725] transition-all duration-300 group-focus-within:w-full" />
                                </div>

                                {/* Email Input */}
                                <div className="relative border-b border-[#e2ddd8] group">
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Corporate Email"
                                        className="w-full py-4 bg-transparent focus:outline-none transition-all placeholder:text-[#a59d95] font-sans text-sm text-[#2a2725]"
                                    />
                                    <div className="absolute bottom-[-1px] left-0 w-0 h-[1px] bg-[#2a2725] transition-all duration-300 group-focus-within:w-full" />
                                </div>

                                {/* Message Textarea */}
                                <div className="relative border-b border-[#e2ddd8] group pt-2">
                                    <textarea
                                        name="message"
                                        required
                                        rows={4}
                                        placeholder="Project Details & Volume Requirements"
                                        className="w-full py-2 bg-transparent focus:outline-none transition-all placeholder:text-[#a59d95] font-sans text-sm text-[#2a2725] resize-none"
                                    />
                                    <div className="absolute bottom-[-1px] left-0 w-0 h-[1px] bg-[#2a2725] transition-all duration-300 group-focus-within:w-full" />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 text-white bg-[#2a2725] font-medium tracking-[0.15em] uppercase text-xs hover:bg-[#1f1d1b] transition-colors disabled:opacity-50 mt-4 flex items-center justify-center gap-3"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                {isSubmitting ? 'Sending Request...' : 'Submit Request'}
                                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                            </button>

                            <p
                                className="text-center text-[#8c857d]"
                                style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 300 }}
                            >
                                We respond to all inquiries within 24–48 hours.
                            </p>

                            {/* Status Messages */}
                            <div className="h-10">
                                {isSuccess && (
                                    <div className="p-3 bg-[#EEEDE9] text-[#2a2725] text-center font-sans text-xs uppercase tracking-wider border border-[#e2ddd8]">
                                        Inquiry received — we'll be in touch within 48 hours.
                                    </div>
                                )}
                                {isError && (
                                    <div className="p-3 bg-red-50 text-red-800 text-center font-sans text-xs uppercase tracking-wider border border-red-100">
                                        Something went wrong. Please email us at hello@univdiam.com
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};
