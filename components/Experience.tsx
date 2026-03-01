"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import TimelineProgress from "./TimelineProgress";
import { ExternalLink, Loader2 } from "lucide-react";
import { client } from "@/sanity/lib/client"; // Sanity Client

export default function Experience() {
    const containerRef = useRef(null);
    const [experiences, setExperiences] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    // Fetch data from Sanity
    useEffect(() => {
        const fetchExperience = async () => {
            try {
                // Fetching experiences from Sanity
                const data = await client.fetch(`*[_type == "experience"]`);
                setExperiences(data);
            } catch (error) {
                console.error("Error fetching experience:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExperience();
    }, []);

    return (
        <section ref={containerRef} className="bg-[#050505] text-white py-20 md:py-40 relative z-20 overflow-hidden">
            <div className="max-w-6xl mx-auto px-5 md:px-10 relative">
                <h2 className="text-3xl md:text-5xl font-manrope font-light leading-tight mb-20 md:mb-32 text-center">
                    Experience & Technologies
                </h2>

                <TimelineProgress targetRef={containerRef} />

                <div className="absolute top-[200px] left-0 w-full h-[calc(100%-200px)] pointer-events-none hidden md:block z-0">
                    <svg className="w-full h-full" viewBox="0 0 1200 1600" preserveAspectRatio="none">
                        <motion.path
                            d="M 600 0 C 600 100, 300 200, 300 400 C 300 600, 600 700, 600 800 C 600 900, 900 1000, 900 1200 C 900 1400, 600 1500, 600 1600"
                            fill="none"
                            stroke="#DFFF00"
                            strokeWidth="6"
                            strokeLinecap="round"
                            style={{ pathLength: scrollYProgress }}
                        />
                    </svg>
                </div>

                <div className="relative z-10 flex flex-col gap-12 md:gap-40 min-h-[400px]">
                    {loading ? (
                        <div className="flex items-center justify-center w-full h-full text-[#DFFF00]">
                            <Loader2 className="animate-spin w-10 h-10" />
                        </div>
                    ) : (
                        experiences.map((exp, index) => (
                            <div
                                key={exp._id || index}
                                className={`flex w-full ${index % 2 === 0 ? "md:justify-start md:pl-20" : "md:justify-end md:pr-20"}`}
                            >
                                <div className={`w-full md:w-[45%] bg-white/5 backdrop-blur-md p-6 md:p-8 border border-white/10 rounded-2xl hover:border-[#DFFF00] transition-colors duration-300 ${index % 2 === 0 ? "text-left" : "text-left md:text-right"}`}>
                                    <span className="text-[#DFFF00] font-mono text-xs md:text-sm mb-2 block">{exp.period}</span>
                                    
                                    <div className={`flex items-center gap-3 mb-1 ${index % 2 === 0 ? "justify-start" : "justify-start md:justify-end"}`}>
                                        <h3 className="text-xl md:text-3xl font-manrope font-bold">{exp.company}</h3>
                                        {exp.link && exp.link !== "" && (
                                            <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#DFFF00] transition-colors mt-1">
                                                <ExternalLink size={20} />
                                            </a>
                                        )}
                                    </div>

                                    <h4 className="text-base md:text-xl text-white/80 mb-4">{exp.role}</h4>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{exp.description}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}