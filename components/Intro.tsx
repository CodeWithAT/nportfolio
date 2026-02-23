"use client";
import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";

// IMPORT THE NEW POPUP
import AboutPopup from "./AboutPopup"; 
import MagneticButton from "./ui/MagneticButton";

export default function Intro() {
    const [showAbout, setShowAbout] = useState(false); // State for popup
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        // ... (Your existing GSAP code here) ...
    }, []);

    return (
        <>
            <section 
                ref={containerRef} 
                className="relative z-10 w-full bg-deep-black text-white py-32 px-6 md:px-20 min-h-[80vh] flex flex-col justify-center rounded-t-[3rem] -mt-10 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]"
            >
                {/* Horizontal Line */}
                <div className="max-w-6xl mx-auto w-full h-[1px] bg-gray-700 mb-16 opacity-50"></div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Headline */}
                    <div className="lg:col-span-8">
                        <h2 ref={textRef} className="text-4xl md:text-6xl lg:text-7xl font-manrope font-light leading-[1.1] mb-8 tracking-tight">
                            I&apos;m <span className="text-neon-lime font-medium">Abhay Tiwari</span> <br />
                            a Full Stack Developer crafting <span className="text-gray-400 italic">immersive</span> digital experiences.
                        </h2>
                    </div>

                    {/* Description & Button */}
                    <div className="lg:col-span-4 flex flex-col items-start lg:items-end lg:text-right gap-10">
                        <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                            Merging creativity with engineering precision. I specialize in SaaS platforms, AI-driven products, and 3D interactions.
                        </p>
                        
                        <MagneticButton>
                            <button 
                                onClick={() => setShowAbout(true)} // OPEN POPUP
                                className="group relative w-32 h-32 md:w-44 md:h-44 rounded-full bg-zinc-900 border border-zinc-700 text-white font-manrope font-bold text-base md:text-lg hover:text-black hover:border-neon-lime transition-all duration-500 flex flex-col items-center justify-center gap-2 overflow-hidden"
                            >
                                <span className="relative z-10">About Me</span>
                                <ArrowDownRight className="w-5 h-5 relative z-10 opacity-0 -translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                <div className="absolute inset-0 bg-neon-lime scale-0 group-hover:scale-150 rounded-full transition-transform duration-500 ease-out origin-center -z-0"></div>
                            </button>
                        </MagneticButton>
                    </div>
                </div>
            </section>

            {/* --- POPUP RENDER LOGIC --- */}
            <AnimatePresence>
                {showAbout && <AboutPopup onClose={() => setShowAbout(false)} />}
            </AnimatePresence>
        </>
    );
}