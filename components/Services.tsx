"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code, Layout, Server, Database, Smartphone, Globe } from "lucide-react";

const services = [
    {
        id: "01",
        title: "Full Stack Development",
        description: "Building scalable and high-performance web applications using Next.js, React, Node.js, and TypeScript.",
        icon: <Code className="w-6 h-6" />,
    },
    {
        id: "02",
        title: "UI/UX Design",
        description: "Designing modern, responsive interfaces with Figma and Tailwind CSS.",
        icon: <Layout className="w-6 h-6" />,
    },
    {
        id: "03",
        title: "SaaS Platforms",
        description: "Developing end-to-end SaaS solutions with subscription systems and multi-tenant management.",
        icon: <Server className="w-6 h-6" />,
    },
    // Added 3 more as requested
    {
        id: "04",
        title: "Database Architecture",
        description: "Designing efficient schemas and optimizing queries for PostgreSQL and MongoDB.",
        icon: <Database className="w-6 h-6" />,
    },
    {
        id: "05",
        title: "Mobile Solutions",
        description: "Cross-platform mobile apps using React Native or PWA technologies.",
        icon: <Smartphone className="w-6 h-6" />,
    },
    {
        id: "06",
        title: "Global Deployment",
        description: "CI/CD pipelines, edge computing, and serverless deployment strategies.",
        icon: <Globe className="w-6 h-6" />,
    },
];

export default function Services() {
    const targetRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Transform vertical scroll to horizontal scroll
    // We want to scroll -100% of the container width minus the viewport width
    // Adjusted for 6 items: approximately -65% depending on item width
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

    return (
        <section ref={targetRef} className="relative h-auto md:h-[300vh] bg-deep-black text-white z-20">
            <div className="sticky top-0 min-h-screen flex flex-col justify-center overflow-hidden px-4 md:px-10 py-20 md:py-0">
                <div className="mb-10 pl-0 md:pl-10">
                    <h2 className="text-3xl md:text-5xl font-manrope font-light leading-tight max-w-3xl">
                        Our Expertise
                    </h2>
                </div>

                <motion.div 
                    style={{ x: isMobile ? 0 : x }} 
                    className="flex flex-col md:flex-row gap-6 md:gap-10 pl-0 md:pl-10"
                >
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="group border border-white/10 p-6 md:p-10 flex flex-col justify-between w-full md:w-[400px] h-auto md:h-[500px] flex-shrink-0 hover:border-neon-lime transition-colors duration-300 relative bg-black/50 backdrop-blur-sm rounded-xl md:rounded-none"
                        >
                            {/* Top part */}
                            <div className="flex justify-between items-start mb-6 md:mb-10">
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-neon-lime group-hover:text-deep-black transition-colors duration-300 group-hover:border-neon-lime">
                                    {service.icon}
                                </div>
                                <span className="font-manrope text-white/40 group-hover:text-neon-lime transition-colors text-sm font-mono">
                                    {service.id}
                                </span>
                            </div>

                            {/* Bottom part */}
                            <div className="mb-4 md:mb-0">
                                <h3 className="text-xl md:text-2xl font-manrope font-semibold mb-2 md:mb-4 group-hover:text-neon-lime transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </div>

                            {/* Hover Lift Effect */}
                            <div className="absolute inset-0 border border-transparent group-hover:border-neon-lime/30 pointer-events-none transition-all duration-500 scale-95 group-hover:scale-100 opactiy-0 group-hover:opacity-100 rounded-xl md:rounded-none" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
