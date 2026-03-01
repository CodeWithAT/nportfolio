"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, Globe, Linkedin, Github, Mail, Terminal, Database, Briefcase, Loader2 } from "lucide-react";
import { client } from "@/sanity/lib/client";

const AboutPopup = ({ onClose }: { onClose: () => void }) => {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const data = await client.fetch(`*[_type == "experience"] | order(_createdAt desc)`);
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-[1000px] max-h-[90vh] overflow-y-auto bg-[#050505] rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-6 pb-12 border border-white/10 shadow-2xl custom-scrollbar"
        data-lenis-prevent
      >
        <button 
          onClick={onClose} 
          className="sticky top-0 float-right z-50 p-2 bg-zinc-800/80 rounded-full hover:bg-white/20 transition-colors text-white backdrop-blur-md ml-4 mb-4"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* 1. PROFILE IMAGE */}
          <div className="md:col-span-4 md:row-span-2 bg-[#111] rounded-[2rem] overflow-hidden border border-white/5 relative h-[250px] md:h-full group">
            <Image 
              src="/images/abhay.jpg" 
              alt="Abhay Tiwari" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[10%] contrast-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* 2. BIO */}
          <div className="md:col-span-8 bg-[#111] rounded-[2rem] p-6 md:p-8 border border-white/5 flex flex-col justify-center min-h-[180px] md:min-h-[200px]">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                I’m <span className="text-lime-400">Abhay Tiwari</span>. <br/>
                <span className="text-zinc-400 text-sm md:text-base font-normal">A Full Stack Developer creating scalable, high-performance web applications.</span>
            </h1>
            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                Results-driven developer with hands-on experience building scalable web applications. Specialized in Full Stack development across frontend (React, HTML, CSS) and backend (Java, Spring Boot, Python, Django) technologies.
            </p>
          </div>

          {/* 3. INTERESTS */}
          <div className="md:col-span-8 bg-[#111] rounded-[2rem] p-4 md:p-6 border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <span className="text-zinc-400 text-sm font-bold ml-2 md:ml-4">Focus Areas</span>
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {[
                    { label: "Frontend", icon: Globe },
                    { label: "Backend Dev", icon: Terminal },
                    { label: "REST APIs", icon: Database }
                ].map((item, i) => (
                    <div key={i} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#1a1a1a] px-3 py-2 rounded-xl border border-white/5 whitespace-nowrap">
                        <item.icon size={14} className="text-zinc-500" />
                        <span className="text-xs text-zinc-300 font-medium">{item.label}</span>
                    </div>
                ))}
            </div>
          </div>

          {/* 4 & 5. DYNAMIC EXPERIENCE CARDS */}
          {loading ? (
             <div className="md:col-span-12 flex justify-center py-10">
                 <Loader2 className="w-8 h-8 text-lime-400 animate-spin" />
             </div>
          ) : (
             experiences.slice(0, 2).map((exp, i) => (
                 <div key={exp._id || i} className="md:col-span-6 bg-[#111] rounded-[2rem] p-5 md:p-6 border border-white/5 flex flex-col justify-between min-h-[140px] md:min-h-[160px]">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-base md:text-lg font-bold text-white">{exp.company}</h3>
                        <p className="text-zinc-500 text-xs mt-1">{exp.role}</p>
                      </div>
                      <span className="bg-black text-[10px] text-zinc-400 px-3 py-1 rounded-full border border-zinc-800 whitespace-nowrap">
                          {exp.period}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-xs mt-4 line-clamp-2 leading-relaxed opacity-80">
                        {exp.description}
                    </p>
                 </div>
             ))
          )}

          {/* 6. TOOLS */}
          <div className="md:col-span-5 flex flex-col gap-4 mt-4">
             {/* Frontend Tools */}
             <div className="bg-[#111] rounded-[1.5rem] p-5 border border-white/5 flex flex-col gap-3">
                <span className="text-zinc-400 text-sm font-bold">Frontend</span>
                <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded">React</span>
                    <span className="text-xs font-bold text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">Tailwind</span>
                    <span className="text-xs font-bold text-purple-400 bg-purple-400/10 px-2 py-1 rounded">HTML/CSS</span>
                </div>
             </div>
             
             {/* Tech Stack */}
             <div className="bg-[#111] rounded-[1.5rem] p-5 border border-white/5 flex flex-col gap-3">
                <span className="text-zinc-400 text-sm font-bold">Backend</span>
                <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">Python</span>
                    <span className="text-xs font-bold text-red-400 bg-red-400/10 px-2 py-1 rounded">Java/Spring</span>
                    <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">MySQL</span>
                </div>
             </div>

             {/* Languages */}
             <div className="bg-[#111] rounded-[1.5rem] p-5 border border-white/5 flex items-center justify-between">
                <span className="text-zinc-400 text-sm font-bold">Languages</span>
                <div className="flex gap-3 text-xl">
                    <span title="English">🇬🇧</span>
                    <span title="Hindi">🇮🇳</span>
                </div>
             </div>
          </div>

          {/* 7. EDUCATION */}
          <div className="md:col-span-7 bg-[#111] rounded-[2rem] p-6 border border-white/5 flex flex-col justify-center mt-4">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Education</h3>
                <span className="text-[10px] bg-black text-zinc-500 px-3 py-1 rounded-full border border-zinc-800">Timeline</span>
             </div>
             
             <div className="space-y-6 pl-2">
                {/* Degree */}
                <div className="relative border-l border-zinc-800 pl-6 pb-2">
                   <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 bg-lime-400 rounded-full shadow-[0_0_10px_rgba(163,230,53,0.5)]"></div>
                   <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1">
                      <div>
                         <h4 className="text-white font-bold text-sm">BSc Computer Science</h4>
                         <p className="text-zinc-500 text-xs mt-0.5">CSJMU, Kanpur</p>
                      </div>
                      <span className="text-[10px] text-zinc-600 font-mono bg-[#1a1a1a] px-2 py-1 rounded w-fit">2022 - 2026</span>
                   </div>
                </div>

                {/* High School */}
                <div className="relative border-l border-zinc-800 pl-6">
                   <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 bg-zinc-600 rounded-full"></div>
                   <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1">
                      <div>
                         <h4 className="text-zinc-300 font-bold text-sm">High School (12th)</h4>
                         <p className="text-zinc-500 text-xs mt-0.5">Seven Hills School</p>
                      </div>
                      <span className="text-[10px] text-zinc-600 font-mono bg-[#1a1a1a] px-2 py-1 rounded w-fit">2021</span>
                   </div>
                </div>
             </div>
          </div>

          {/* 8. FOOTER BAR */}
          <div className="md:col-span-12 bg-[#111] rounded-[1.5rem] p-3 border border-white/5 flex flex-wrap items-center justify-between gap-3">
             <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-center lg:justify-start">
                <a href="https://github.com/abhay-tiwari" target="_blank" className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2.5 rounded-xl hover:bg-white hover:text-black transition-all group flex-1 md:flex-none justify-center">
                    <Github size={16} /> <span className="text-xs font-bold">Github</span>
                </a>
                
                <a href="https://www.linkedin.com/in/abhay-tiwari-93b412290/" target="_blank" className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2.5 rounded-xl hover:bg-[#0077b5] hover:text-white transition-all group flex-1 md:flex-none justify-center">
                    <Linkedin size={16} /> <span className="text-xs font-bold">LinkedIn</span>
                </a>

                <a href="https://www.naukri.com/mnjuser/profile?id=&altresid" target="_blank" className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2.5 rounded-xl hover:bg-[#003366] hover:text-white transition-all group flex-1 md:flex-none justify-center">
                    <Briefcase size={16} /> <span className="text-xs font-bold">Naukri</span>
                </a>

                <a href="https://profile.indeed.com/?hl=en_IN&co=IN&from=gnav-jobseeker-profile--profile-one-frontend" target="_blank" className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2.5 rounded-xl hover:bg-[#2164f3] hover:text-white transition-all group flex-1 md:flex-none justify-center">
                    <Briefcase size={16} /> <span className="text-xs font-bold">Indeed</span>
                </a>
             </div>
             
             <a href="mailto:abhay.tiwari3003@gmail.com" className="flex items-center gap-2 bg-[#1a1a1a] px-5 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all w-full lg:w-auto justify-center">
                <Mail size={16} /> <span className="text-xs font-bold truncate">abhay.tiwari3003@gmail.com</span>
             </a>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default AboutPopup;