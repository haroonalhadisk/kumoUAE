import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ArrowDown, Instagram, Facebook, Coffee, Cloud, Utensils, MapPin } from 'lucide-react';

// --- Assets / Doodles (Inline SVGs for unique brand style) ---
const DoodleCloudFace = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20,60 Q10,60 10,45 Q10,30 25,25 Q30,10 50,10 Q70,10 75,25 Q90,30 90,45 Q90,60 75,60 Z" />
        <path d="M35,40 Q40,40 45,38" /> {/* Eye L */}
        <path d="M60,38 Q65,40 70,40" /> {/* Eye R */}
        <path d="M48,50 Q52,55 56,50" /> {/* Mouth */}
    </svg>
);

const DoodleDoll = ({ className }) => (
    <svg viewBox="0 0 100 120" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M20,110 C5,100 5,70 20,50 C30,35 70,35 80,50 C95,70 95,100 80,110 Z" /> {/* Body */}
        <circle cx="50" cy="40" r="15" /> {/* Head */}
        <path d="M45,38 L47,38" strokeWidth="3" /> {/* Eye */}
        <path d="M53,38 L55,38" strokeWidth="3" /> {/* Eye */}
        <path d="M48,45 Q50,47 52,45" /> {/* Mouth */}
        <path d="M20,50 Q10,40 20,30" strokeDasharray="4 4" /> {/* Aura */}
        <path d="M80,50 Q90,40 80,30" strokeDasharray="4 4" />
    </svg>
);

const DoodleStar = ({ className }) => (
    <svg viewBox="0 0 50 50" className={className} fill="currentColor">
        <path d="M25,0 L30,20 L50,25 L30,30 L25,50 L20,30 L0,25 L20,20 Z" />
    </svg>
);

const DoodleLines = ({ className }) => (
    <svg viewBox="0 0 100 50" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10,10 Q30,40 50,10 T90,10" />
        <path d="M10,30 Q30,60 50,30 T90,30" />
    </svg>
);

export default function App() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="font-['DM_Sans'] antialiased text-[#1A1A1A] selection:bg-[#E83232] selection:text-white bg-[#F8F5E9] min-h-screen overflow-x-hidden">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;400;500;700&family=Syne:wght@400;500;600;700;800&display=swap');
        
        :root {
          --kumo-red: #E83232;
          --kumo-cream: #F8F5E9;
          --kumo-black: #1A1A1A;
        }
        
        .font-syne { font-family: 'Syne', sans-serif; }
      `}</style>

            <CustomCursor />
            <Navbar isScrolled={isScrolled} />
            <Hero />
            <Marquee />
            <StorySection />
            <MenuSection />
            <LocationSection />
            <Footer />
        </div>
    );
}

// --- Components ---

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const mouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", mouseMove);
        return () => window.removeEventListener("mousemove", mouseMove);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 border-2 border-white mix-blend-difference rounded-full pointer-events-none z-[60] hidden md:block"
            animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
            <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
    );
};

const Navbar = ({ isScrolled }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={`fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'bg-[#F8F5E9]/90 backdrop-blur-md py-4' : 'bg-transparent'}`}>
            <motion.div
                className={`text-2xl font-syne font-bold tracking-tighter transition-colors duration-300 ${!isScrolled && !isOpen ? 'text-[#F8F5E9]' : 'text-[#E83232]'}`}
            >
                KUMO <span className="text-xs align-top opacity-80">UAE</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className={`hidden md:flex gap-8 font-medium text-sm tracking-wide transition-colors duration-300 ${!isScrolled ? 'text-[#F8F5E9]' : 'text-[#1A1A1A]'}`}>
                {['Menu', 'Story', 'Location', 'Book'].map((item) => (
                    <a href={`#${item.toLowerCase()}`} key={item} className="relative group hover:opacity-70 transition-opacity">
                        {item}
                    </a>
                ))}
            </div>

            {/* Mobile Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden z-50 relative group">
                <div className={`transition-colors duration-300 ${isOpen ? 'text-[#F8F5E9]' : (!isScrolled ? 'text-[#F8F5E9]' : 'text-[#E83232]')}`}>
                    {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </div>
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.4, ease: "circOut" }}
                        className="fixed inset-0 bg-[#E83232] z-40 flex flex-col justify-between p-8"
                    >
                        <div className="flex flex-col space-y-2 mt-20">
                            {['Menu', 'Story', 'Location', 'Book'].map((item, i) => (
                                <motion.a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => setIsOpen(false)}
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 + (i * 0.1) }}
                                    className="text-6xl font-syne text-[#F8F5E9] font-black uppercase tracking-tighter"
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </div>

                        <div className="border-t border-[#F8F5E9]/20 pt-8">
                            <DoodleCloudFace className="w-24 h-24 text-[#F8F5E9] mb-4 rotate-12" />
                            <p className="text-[#F8F5E9] font-syne text-sm">Grounded Japanese.<br />Made for the moment.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] md:min-h-screen bg-[#E83232] text-[#F8F5E9] flex flex-col justify-center overflow-hidden rounded-b-[3rem]">
            {/* Background Doodles */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-10%] right-[-10%] w-[50vh] h-[50vh] border-[1px] border-[#F8F5E9]/10 rounded-full"
            />
            <DoodleDoll className="absolute bottom-10 left-[-20px] w-48 h-48 text-[#F8F5E9]/10 rotate-12 md:left-20 md:w-64 md:h-64" />
            <DoodleLines className="absolute top-32 right-10 w-32 h-20 text-[#F8F5E9]/20" />

            <div className="container mx-auto px-6 relative z-10 pt-20">
                <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-12">

                    {/* Typography Stack */}
                    <div className="w-full md:w-2/3">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <DoodleStar className="w-8 h-8 text-[#F8F5E9] animate-spin-slow" />
                                <span className="font-syne font-bold tracking-widest text-sm uppercase border border-[#F8F5E9] px-3 py-1 rounded-full">Since 2024</span>
                            </div>

                            <h1 className="text-[14vw] md:text-[9vw] leading-[0.85] font-syne font-black tracking-tighter uppercase break-words">
                                Tradition, <br />
                                <span className="italic font-serif font-light ml-4">Turned</span> Up.
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 text-lg md:text-2xl max-w-md font-light opacity-90 leading-relaxed"
                        >
                            Our Kyoto home-inspired famiresu. <br />
                            <span className="font-bold border-b border-[#F8F5E9]">Get ready to step into Kumo.</span>
                        </motion.p>
                    </div>

                    {/* Floating Sticker / Call to Action */}
                    <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", delay: 0.8 }}
                        className="relative"
                    >
                        <div className="w-40 h-40 md:w-56 md:h-56 bg-[#F8F5E9] rounded-full flex items-center justify-center text-[#E83232] p-2 animate-float">
                            <div className="text-center">
                                <p className="font-syne font-black text-xl md:text-2xl uppercase">Book<br />Table</p>
                                <ArrowDown className="w-6 h-6 mx-auto mt-2" />
                            </div>

                            {/* Spinning Text on Circle Edge */}
                            <svg className="absolute w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                                <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                                <text className="text-[10px] font-bold fill-[#E83232] uppercase tracking-widest">
                                    <textPath href="#curve">
                                        Grounded Japanese • Made for the Moment •
                                    </textPath>
                                </text>
                            </svg>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
                <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-[#F8F5E9]" />
            </div>
        </section>
    );
};

const Marquee = () => {
    return (
        <div className="bg-[#1A1A1A] py-6 overflow-hidden -mt-8 rotate-[-2deg] relative z-20 shadow-xl">
            <motion.div
                animate={{ x: "-50%" }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="flex gap-12 items-center text-[#F8F5E9] font-syne font-bold text-3xl md:text-5xl uppercase whitespace-nowrap"
            >
                <span>☁️ Slow Mornings</span> <span>Matcha</span> <span>Sando</span> <span>Coffee</span> <span>Cloud Cafe</span>
                <span>☁️ Slow Mornings</span> <span>Matcha</span> <span>Sando</span> <span>Coffee</span> <span>Cloud Cafe</span>
            </motion.div>
        </div>
    )
}

const StorySection = () => {
    return (
        <section id="story" className="py-32 bg-[#F8F5E9] relative">
            <DoodleCloudFace className="absolute top-20 right-[-50px] w-64 h-64 text-[#E83232]/5 rotate-[-12deg]" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* Collage Images */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative z-10">
                            <motion.img
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                src="https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?q=80&w=800&auto=format&fit=crop"
                                className="w-full aspect-[4/5] object-cover rounded-2xl border-2 border-[#1A1A1A]"
                                alt="Kumo Interior"
                            />

                            {/* Sticker overlay */}
                            <div className="absolute -bottom-10 -right-5 bg-[#E83232] text-[#F8F5E9] px-6 py-4 rounded-full rotate-[-6deg] shadow-lg border-2 border-[#1A1A1A]">
                                <p className="font-syne font-bold text-xl">Villa 71</p>
                            </div>
                        </div>
                        {/* Background shape */}
                        <div className="absolute top-10 -left-10 w-full h-full bg-[#6B8E23] rounded-2xl -z-0 border-2 border-[#1A1A1A]" />
                    </div>

                    <div className="w-full lg:w-1/2 pt-10">
                        <h2 className="text-5xl md:text-7xl font-syne font-black text-[#1A1A1A] mb-8 leading-[0.9]">
                            GROUNDED <br /> <span className="text-[#E83232]">JAPANESE.</span>
                        </h2>

                        <div className="space-y-6 text-xl text-[#1A1A1A]/80 font-light">
                            <p>
                                A space where tradition meets a playful modern twist. Inspired by the slow, deliberate mornings of Kyoto, transplanted into the electric energy of the UAE.
                            </p>
                            <p>
                                We are your neighborhood <span className="font-bold bg-[#E83232]/10 px-1">famiresu</span>. A place for Hokkaido milk bread, ceremonial matcha, and moments that float like clouds.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-12">
                            {[
                                { icon: Coffee, label: "Brew" },
                                { icon: Cloud, label: "Vibe" },
                                { icon: Utensils, label: "Taste" }
                            ].map(({ icon: Icon, label }) => (
                                <div key={label} className="flex flex-col items-center justify-center p-6 border border-[#1A1A1A] rounded-xl hover:bg-[#1A1A1A] hover:text-[#F8F5E9] transition-all cursor-crosshair group">
                                    <Icon className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="font-syne font-bold uppercase">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

const MenuSection = () => {
    const menuItems = [
        {
            title: "Egg Sando",
            jp: "たまごサンド",
            desc: "Hokkaido Milk Bread, Japanese Style Eggs",
            price: "45",
            img: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Salmon Tiradito",
            jp: "サーモン",
            desc: "Thinly Sliced Salmon, Ponzu, Sesame",
            price: "65",
            img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Matcha Latte",
            jp: "抹茶ラテ",
            desc: "Ceremonial Grade Matcha, Oat Milk",
            price: "30",
            img: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=800&auto=format&fit=crop"
        }
    ];

    return (
        <section id="menu" className="py-24 bg-[#1A1A1A] text-[#F8F5E9] relative rounded-t-[3rem] -mt-12">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-[12vw] leading-none font-syne font-black text-[#F8F5E9]">
                        MENU <span className="text-[#E83232] text-6xl align-top">.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {menuItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="relative aspect-square mb-6 overflow-hidden rounded-xl border border-[#F8F5E9]/20">
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                                <div className="absolute top-4 left-4 bg-[#E83232] text-[#F8F5E9] font-bold font-syne px-3 py-1 rounded text-sm">
                                    AED {item.price}
                                </div>
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-3xl font-syne font-bold mb-1 group-hover:text-[#E83232] transition-colors">{item.title}</h3>
                                    <p className="text-sm font-serif italic text-[#F8F5E9]/60 mb-2">{item.jp}</p>
                                    <p className="text-[#F8F5E9]/80 font-light">{item.desc}</p>
                                </div>
                                <button className="w-10 h-10 rounded-full border border-[#F8F5E9] flex items-center justify-center group-hover:bg-[#F8F5E9] group-hover:text-[#1A1A1A] transition-all">
                                    <ArrowDown className="-rotate-45 w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button className="bg-[#E83232] text-[#F8F5E9] font-syne font-bold text-xl px-12 py-4 rounded-full hover:bg-[#F8F5E9] hover:text-[#E83232] transition-all">
                        View Full Menu
                    </button>
                </div>
            </div>
        </section>
    );
};

const LocationSection = () => {
    return (
        <section id="location" className="bg-[#F8F5E9] py-24 relative overflow-hidden">
            <DoodleLines className="absolute top-20 left-10 w-48 text-[#E83232]/10" />

            <div className="container mx-auto px-6 text-center">
                <DoodleDoll className="w-32 h-32 mx-auto mb-8 text-[#1A1A1A] animate-bounce-slow" />

                <h2 className="text-4xl md:text-6xl font-syne font-bold mb-8">
                    Find us at <br /> <span className="underline decoration-[#E83232] decoration-4 underline-offset-4">Villa 71</span>
                </h2>

                <div className="max-w-xl mx-auto bg-white border-2 border-[#1A1A1A] p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] transform hover:-translate-y-1 transition-transform">
                    <div className="flex items-center justify-center gap-2 mb-6 text-[#E83232]">
                        <MapPin className="fill-current" />
                        <span className="font-bold tracking-widest uppercase">Jumeirah, UAE</span>
                    </div>

                    <div className="grid grid-cols-2 gap-8 text-left">
                        <div>
                            <h4 className="font-bold font-syne mb-2">Opening</h4>
                            <ul className="text-sm space-y-1 opacity-80">
                                <li>Mon-Thu: 8am - 11pm</li>
                                <li>Fri-Sun: 8am - 12am</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold font-syne mb-2">Contact</h4>
                            <ul className="text-sm space-y-1 opacity-80">
                                <li>+971 50 123 4567</li>
                                <li>hello@kumo.ae</li>
                            </ul>
                        </div>
                    </div>

                    <button className="w-full mt-8 bg-[#1A1A1A] text-[#F8F5E9] font-bold py-3 rounded-lg hover:bg-[#E83232] transition-colors">
                        Get Directions
                    </button>
                </div>
            </div>
        </section>
    )
}

const Footer = () => {
    return (
        <footer className="bg-[#E83232] pt-20 pb-6 text-[#F8F5E9]">
            <div className="container mx-auto px-6 flex flex-col items-center">
                <h1 className="text-[18vw] leading-none font-syne font-black select-none opacity-20">
                    KUMO
                </h1>
                <div className="flex gap-8 mt-[-2vw] mb-12 relative z-10">
                    <a href="#" className="hover:text-[#1A1A1A] transition-colors"><Instagram size={32} /></a>
                    <a href="#" className="hover:text-[#1A1A1A] transition-colors"><Facebook size={32} /></a>
                </div>
                <p className="text-xs opacity-60 font-mono uppercase tracking-widest">
                    © 2025 Kumo UAE. Tradition Turned Up.
                </p>
            </div>
        </footer>
    );
};