"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, Globe, Linkedin, Github, Mail, Terminal, Database, Briefcase } from "lucide-react";

const AboutPopup = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-[1000px] max-h-[90vh] overflow-y-auto bg-[#050505] rounded-[2.5rem] p-6 pb-12 border border-white/10 shadow-2xl custom-scrollbar"
        data-lenis-prevent
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="sticky top-0 float-right z-50 p-2 bg-zinc-800/80 rounded-full hover:bg-white/20 transition-colors text-white backdrop-blur-md ml-4 mb-4"
        >
          <X size={20} />
        </button>

        {/* --- BALANCED BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* 1. PROFILE IMAGE */}
          <div className="md:col-span-4 md:row-span-2 bg-[#111] rounded-[2rem] overflow-hidden border border-white/5 relative h-[320px] md:h-full group">
            <Image 
              src="/images/abhay.jpg" 
              alt="Abhay Tiwari" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[10%] contrast-110"
            />
          </div>

          {/* 2. BIO */}
          <div className="md:col-span-8 bg-[#111] rounded-[2rem] p-8 border border-white/5 flex flex-col justify-center min-h-[200px]">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                I’m <span className="text-lime-400">Abhay Tiwari</span>. <br/>
                <span className="text-zinc-400 text-base font-normal">A Full Stack Developer creating scalable, high-performance web applications.</span>
            </h1>
            <p className="text-zinc-500 text-xs leading-relaxed">
                Specialized in JavaScript, React, Java, and Python. I merge creativity with engineering precision to deliver immersive digital experiences.
            </p>
          </div>

          {/* 3. INTERESTS */}
          <div className="md:col-span-8 bg-[#111] rounded-[2rem] p-4 border border-white/5 flex items-center justify-between">
            <span className="text-zinc-400 text-sm font-bold ml-4">Focus Areas</span>
            <div className="flex gap-2">
                {[
                    { label: "Web Dev", icon: Globe },
                    { label: "App Dev", icon: Terminal },
                    { label: "Risk Mgmt", icon: Database }
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2 rounded-xl border border-white/5">
                        <item.icon size={14} className="text-zinc-500" />
                        <span className="text-xs text-zinc-300 font-medium">{item.label}</span>
                    </div>
                ))}
            </div>
          </div>

          {/* 4. EXPERIENCE 1 */}
          <div className="md:col-span-6 bg-[#111] rounded-[2rem] p-6 border border-white/5 flex flex-col justify-between min-h-[160px]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-white">Zentrix Tech</h3>
                <p className="text-zinc-500 text-xs mt-1">Junior Frontend Developer</p>
              </div>
              <span className="bg-black text-[10px] text-zinc-400 px-3 py-1 rounded-full border border-zinc-800">Mar - May 25</span>
            </div>
            <ul className="text-zinc-400 text-xs mt-4 space-y-1 list-disc list-inside opacity-80">
              <li>Frontend Architecture focus.</li>
              <li>Dehradun, Uttarakhand.</li>
            </ul>
          </div>

          {/* 5. EXPERIENCE 2 */}
          <div className="md:col-span-6 bg-[#111] rounded-[2rem] p-6 border border-white/5 flex flex-col justify-between min-h-[160px]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-white">CETPA Infotech</h3>
                <p className="text-zinc-500 text-xs mt-1">Java Full Stack Dev</p>
              </div>
              <span className="bg-black text-[10px] text-zinc-400 px-3 py-1 rounded-full border border-zinc-800">Sep 24 - Feb 25</span>
            </div>
            <ul className="text-zinc-400 text-xs mt-4 space-y-1 list-disc list-inside opacity-80">
              <li>Full Stack Java Development.</li>
              <li>Noida, Uttar Pradesh.</li>
            </ul>
          </div>

          {/* 6. TOOLS */}
          <div className="md:col-span-5 flex flex-col gap-4">
             {/* Frontend Tools */}
             <div className="bg-[#111] rounded-[1.5rem] p-5 border border-white/5 flex items-center justify-between">
                <span className="text-zinc-400 text-sm font-bold">Design Tools</span>
                <div className="flex gap-2">
                    <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded">React</span>
                    <span className="text-xs font-bold text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">Tailwind</span>
                    <span className="text-xs font-bold text-purple-400 bg-purple-400/10 px-2 py-1 rounded">Figma</span>
                </div>
             </div>
             
             {/* Tech Stack */}
             <div className="bg-[#111] rounded-[1.5rem] p-5 border border-white/5 flex items-center justify-between">
                <span className="text-zinc-400 text-sm font-bold">Tech Stack</span>
                <div className="flex gap-2">
                    <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">Python</span>
                    <span className="text-xs font-bold text-red-400 bg-red-400/10 px-2 py-1 rounded">Java</span>
                    <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">Node</span>
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
          <div className="md:col-span-7 bg-[#111] rounded-[2rem] p-6 border border-white/5 flex flex-col justify-center">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Education</h3>
                <span className="text-[10px] bg-black text-zinc-500 px-3 py-1 rounded-full border border-zinc-800">Timeline</span>
             </div>
             
             <div className="space-y-6 pl-2">
                {/* Degree */}
                <div className="relative border-l border-zinc-800 pl-6 pb-2">
                   <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 bg-lime-400 rounded-full shadow-[0_0_10px_rgba(163,230,53,0.5)]"></div>
                   <div className="flex justify-between items-start">
                      <div>
                         <h4 className="text-white font-bold text-sm">BSc Computer Science</h4>
                         <p className="text-zinc-500 text-xs mt-0.5">CSJMU, Kanpur</p>
                      </div>
                      <span className="text-[10px] text-zinc-600 font-mono bg-[#1a1a1a] px-2 py-1 rounded">2022 - 2026</span>
                   </div>
                </div>

                {/* High School */}
                <div className="relative border-l border-zinc-800 pl-6">
                   <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 bg-zinc-600 rounded-full"></div>
                   <div className="flex justify-between items-start">
                      <div>
                         <h4 className="text-zinc-300 font-bold text-sm">High School (12th)</h4>
                         <p className="text-zinc-500 text-xs mt-0.5">Seven Hills School</p>
                      </div>
                      <span className="text-[10px] text-zinc-600 font-mono bg-[#1a1a1a] px-2 py-1 rounded">2021</span>
                   </div>
                </div>
             </div>
          </div>

          {/* 8. FOOTER BAR (Updated with Profiles) */}
          <div className="md:col-span-12 bg-[#111] rounded-[1.5rem] p-3 border border-white/5 flex flex-wrap items-center justify-between gap-3">
             <div className="flex flex-wrap gap-2">
                {/* Github */}
                <a href="https://github.com/abhay-tiwari" className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2.5 rounded-xl hover:bg-white hover:text-black transition-all group">
                    <Github size={16} /> <span className="text-xs font-bold">Github</span>
                </a>
                
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/abhay-tiwari-93b412290/" className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2.5 rounded-xl hover:bg-[#0077b5] hover:text-white transition-all group">
                    <Linkedin size={16} /> <span className="text-xs font-bold">LinkedIn</span>
                </a>

                {/* Naukri */}
                <a href="https://www.naukri.com/mnjuser/profile?id=&altresid" className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2.5 rounded-xl hover:bg-[#003366] hover:text-white transition-all group">
                    <Briefcase size={16} /> <span className="text-xs font-bold">Naukri</span>
                </a>

                {/* Indeed */}
                <a href="https://profile.indeed.com/?hl=en_IN&co=IN&from=gnav-jobseeker-profile--profile-one-frontend" className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2.5 rounded-xl hover:bg-[#2164f3] hover:text-white transition-all group">
                    <Briefcase size={16} /> <span className="text-xs font-bold">Indeed</span>
                </a>
             </div>
             
             <a href="mailto:abhay.tiwari3003@gmail.com" className="flex items-center gap-2 bg-[#1a1a1a] px-5 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all ml-auto">
                <Mail size={16} /> <span className="text-xs font-bold">abhay.tiwari3003@gmail.com</span>
             </a>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default AboutPopup;