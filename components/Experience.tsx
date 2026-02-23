"use client";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import TimelineProgress from "./TimelineProgress";

const experiences = [
    {
        company: "Qwen AI (Freelance)",
        role: "AI Prompt Engineer",
        period: "June 2025 - Present",
        description: "Training and refining the Qwen AI model through advanced prompt engineering. Focusing on data accuracy, response optimization, and fine-tuning language models for better performance."
    },
    {
        company: "Zentrix Technologies",
        role: "Junior Frontend Developer",
        period: "Mar 2025 - May 2025",
        description: "Completed a 3-month internship gaining hands-on experience in building responsive web applications. Specialized in HTML5, CSS3, and modern frontend architectures in a remote environment."
    },
    {
        company: "CETPA Infotech Pvt. Ltd.",
        role: "Java Full Stack Developer",
        period: "Sep 2024 - Feb 2025",
        description: "Completed comprehensive 6-month training in Java Full Stack development. Developed strong skills in both frontend and backend technologies, building robust web solutions."
    },
    {
        company: "Softpro India Computer Technologies",
        role: "Python Full Stack Developer",
        period: "Jun 2023 - Sep 2023",
        description: "Apprenticeship focused on Python full stack development. Gained practical experience with HTML5, Cascading Style Sheets (CSS), and backend integration."
    }
];

export default function Experience() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    return (
        <section ref={containerRef} className="bg-deep-black text-white py-40 relative z-20 overflow-hidden">
            <div className="max-w-6xl mx-auto px-5 md:px-10 relative">
                <h2 className="text-3xl md:text-5xl font-manrope font-light leading-tight mb-32 text-center">
                    Experience & Technologies
                </h2>

                {/* Vertical Timeline Progress - Foreground Axis */}
                <TimelineProgress targetRef={containerRef} />

                {/* The Snake Line - Absolute positioned behind content */}
                <div className="absolute top-[200px] left-0 w-full h-[calc(100%-200px)] pointer-events-none hidden md:block">
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

                <div className="relative z-10 flex flex-col gap-12 md:gap-40">
                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className={`flex items-center w-full ${index % 2 === 0 ? "justify-center md:justify-start md:pl-20" : "justify-center md:justify-end md:pr-20"
                                }`}
                        >
                            <div className={`w-full md:w-[40%] bg-white/5 backdrop-blur-md p-6 md:p-8 border border-white/10 rounded-2xl hover:border-neon-lime transition-colors duration-300 ${index % 2 === 0 ? "text-left" : "text-left md:text-right"}`}>
                                <span className="text-neon-lime font-mono text-sm mb-2 block">{exp.period}</span>
                                <h3 className="text-2xl md:text-3xl font-manrope font-bold mb-1">{exp.company}</h3>
                                <h4 className="text-lg md:text-xl text-white/80 mb-4">{exp.role}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}