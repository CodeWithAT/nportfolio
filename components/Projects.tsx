"use client";
import { useState, useRef, useEffect } from "react";
import { useLenis } from "@studio-freight/react-lenis";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ExternalLink, Github, Star, ArrowUpRight, Check } from "lucide-react";
import MagneticButton from "./ui/MagneticButton"; 

// --- 1. Project Data ---
const projectsData = [
  {
    id: 1,
    title: "Third Party Risk Management",
    category: "SaaS / FinTech",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=600", 
    description: "A comprehensive vendor risk assessment and management system designed to evaluate and monitor third-party vendors for compliance and risk mitigation. Features include real-time vendor metrics, risk scoring (High/Med/Low), and automated workflow management.",
    tech: ["JavaScript", "HTML/CSS", "Database Mgmt", "Risk Logic"],
    link: "#",
    github: "#",
    date: "Oct 2025"
  },
  {
    id: 2,
    title: "Ticket Management System",
    category: "Admin Dashboard",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=600",
    description: "A comprehensive admin dashboard and ticket management system that streamlines workflow and support operations. Includes advanced filtering (Status, Priority, SLA), live chat functionality, and real-time analytics using Chart.js.",
    tech: ["HTML5", "CSS3", "JavaScript", "Chart.js"],
    link: "#",
    github: "#",
    date: "Nov 2025"
  },
  {
    id: 3,
    title: "Dhwani Store",
    category: "E-Commerce",
    src: "/images/dhwani-main.png", 
    description: "A modern e-commerce platform featuring a clean, responsive UI and scalable frontend architecture. Includes smooth navigation, structured product showcases, and live deployment on Netlify.",
    tech: ["HTML", "CSS", "JavaScript", "Netlify"],
    link: "https://dhwani-store.netlify.app",
    github: "#",
    date: "Sep 2025"
  },
  {
    id: 4,
    title: "Nalanda University Clone",
    category: "Frontend Design",
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800&h=600",
    description: "A pixel-perfect clone of the Nalanda University website focusing on modern UI design, clean structured code, and responsive layouts. Built to enhance DOM manipulation skills.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "#",
    github: "#",
    date: "Aug 2025"
  },
  {
    id: 5,
    title: "TATA MOTORS Replica",
    category: "Web Development",
    src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800&h=600",
    description: "A mini-replica of the TATA Motors website focusing on modular codebase structure and responsive layout design.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "#",
    github: "https://github.com/CodeWithAT/TATA_MOTORS",
    date: "July 2025"
  },
  {
    id: 6,
    title: "Niccolo Miranda Portfolio",
    category: "Creative Dev",
    src: "/images/niccolomiranda.png", 
    description: "Interactive portfolio template featuring complex animations, stack UI with modern design, and component-based architecture.",
    tech: ["HTML", "CSS", "GSAP", "JavaScript"],
    link: "#",
    github: "https://github.com/CodeWithAT/niccolomiranda",
    date: "June 2025"
  }
];

interface Project {
  id: number;
  title: string;
  category: string;
  src: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
  date: string;
}

// --- 2. Main Component ---
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (selectedProject || isViewAllOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "unset";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "unset";
      lenis?.start();
    };
  }, [selectedProject, isViewAllOpen, lenis]);

  return (
    <>
    <section className="bg-[#050505] text-white py-32 px-6 md:px-20 relative z-20" id="work">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-24 border-b border-white/10 pb-10">
          <h2 className="text-4xl md:text-6xl font-manrope font-light leading-tight">
            Selected <span className="text-[#DFFF00] font-medium italic">Works</span>
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 md:gap-x-12 md:gap-y-24">
          {projectsData.slice(0, 4).map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onClick={() => setSelectedProject(project)} 
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-20 md:mt-32">
          <MagneticButton>
            <button 
              onClick={() => setIsViewAllOpen(true)}
              className="group relative w-32 h-32 md:w-44 md:h-44 rounded-full bg-[#1a1a1a] border border-white/10 text-white font-manrope font-bold text-base md:text-lg hover:bg-[#DFFF00] hover:text-black hover:border-[#DFFF00] transition-all duration-500 flex flex-col items-center justify-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">View All</span>
              <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 relative z-10 opacity-0 -translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              <div className="absolute inset-0 bg-[#DFFF00] scale-0 group-hover:scale-150 rounded-full transition-transform duration-500 ease-out origin-center -z-0"></div>
            </button>
          </MagneticButton>
        </div>
      </div>
    </section>

    {/* --- MODALS --- */}
    <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
        {isViewAllOpen && (
          <AllProjectsModal 
            projects={projectsData} 
            onClose={() => setIsViewAllOpen(false)}
            onSelect={(project) => {
              setIsViewAllOpen(false);
              setTimeout(() => setSelectedProject(project), 300);
            }}
          />
        )}
    </AnimatePresence>
    </>
  );
}

// --- 3. Sub-Components ---

function ProjectCard({ project, index, onClick }: { project: Project, index: number, onClick: () => void }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <div ref={container} className={`group cursor-pointer ${index % 2 === 1 ? "md:mt-24" : ""}`} onClick={onClick}>
      <div className="overflow-hidden rounded-xl aspect-[4/3] relative mb-8 border border-white/5">
        <motion.div style={{ y, scale: 1.1 }} className="absolute inset-0 w-full h-full">
          <Image
            src={project.src}
            alt={project.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:blur-[2px]"
            unoptimized
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <span className="px-6 py-3 bg-[#DFFF00] text-black rounded-full font-bold transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
            View Details
          </span>
        </div>
      </div>
      <div className="flex justify-between items-start border-t border-white/20 pt-6">
        <div>
          <h3 className="text-3xl font-manrope font-medium mb-2 group-hover:text-[#DFFF00] transition-colors">{project.title}</h3>
          <div className="flex gap-2 text-white/50 text-sm uppercase tracking-wider">
            <span>{project.category}</span>
            <span>•</span>
            <span>{project.date}</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[#DFFF00] group-hover:bg-[#DFFF00] group-hover:text-black transition-all duration-300 group-hover:-rotate-45">
          <ArrowUpRight size={24} />
        </div>
      </div>
    </div>
  );
}

// --- 4. Modals ---

function ProjectDetailModal({ project, onClose }: { project: Project, onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [form, setForm] = useState({ name: "", email: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setIsSubmitted(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      
      <motion.div 
        initial={{ y: 50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        exit={{ y: 50, opacity: 0 }}
        // FIX: Scrollable container configuration
        className="relative bg-[#0f0f0f] border border-white/10 w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl custom-scrollbar overscroll-contain"
        data-lenis-prevent // Prevents parent scrolling
      >
        <button onClick={onClose} className="sticky top-6 float-right right-6 z-50 p-2 bg-black/50 rounded-full hover:bg-white/20 transition-colors border border-white/10 backdrop-blur-md">
          <X size={24} color="white"/>
        </button>

        <div className="grid md:grid-cols-2">
          {/* Left: Image Area */}
          <div className="relative h-64 md:h-auto min-h-[300px]">
            <Image src={project.src} alt={project.title} fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent opacity-80" />
          </div>

          {/* Right: Content Area */}
          <div className="p-8 md:p-12 space-y-8">
            <div className="pt-8 md:pt-0"> 
              <h2 className="text-4xl font-bold mb-2 text-[#DFFF00]">{project.title}</h2>
              <p className="text-white/60 text-sm">{project.category} — {project.date}</p>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">{project.description}</p>
            
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t: string) => (
                  <span key={t} className="px-3 py-1 border border-white/20 rounded-full text-sm text-gray-300">{t}</span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-b border-white/10 pb-8">
              <a href={project.link} className="flex-1 py-4 bg-[#DFFF00] text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-colors">
                Live Demo <ExternalLink size={18} />
              </a>
              <a href={project.github} className="flex-1 py-4 bg-white/5 border border-white/10 font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-colors">
                Github <Github size={18} />
              </a>
            </div>

            {/* --- REVIEW & RATING SECTION --- */}
            <div className="pt-2 pb-10"> 
              <h4 className="text-lg font-bold text-white mb-4">Rate & Review Project</h4>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star 
                          size={28} 
                          fill={star <= (hoverRating || rating) ? "#DFFF00" : "transparent"} 
                          color={star <= (hoverRating || rating) ? "#DFFF00" : "#666"}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Input Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      required
                      type="text" 
                      placeholder="Your Name" 
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#DFFF00] transition-colors"
                    />
                    <input 
                      required
                      type="email" 
                      placeholder="Email Address" 
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#DFFF00] transition-colors"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={rating === 0}
                    className="w-full py-3 bg-white/10 border border-white/10 hover:bg-[#DFFF00] hover:text-black hover:border-transparent text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Review
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#DFFF00]/10 border border-[#DFFF00]/20 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-2"
                >
                  <div className="w-12 h-12 bg-[#DFFF00] rounded-full flex items-center justify-center mb-2">
                    <Check size={24} className="text-black" />
                  </div>
                  <h5 className="text-[#DFFF00] font-bold text-lg">Thank You!</h5>
                  <p className="text-white/60 text-sm">Your feedback has been recorded.</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AllProjectsModal({ projects, onClose, onSelect }: { projects: Project[], onClose: () => void, onSelect: (p: Project) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-[#0f0f0f] border border-white/10 w-full max-w-5xl h-[85vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl overscroll-contain"
      >
        <div className="p-8 border-b border-white/10 flex justify-between items-center bg-[#0f0f0f] z-10 shrink-0">
          <h2 className="text-3xl font-bold">All Projects ({projects.length})</h2>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div 
            className="flex-1 overflow-y-auto p-8 custom-scrollbar"
            data-lenis-prevent // FIX: Prevents parent scrolling in All Projects too
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div 
                key={project.id} 
                onClick={() => onSelect(project)}
                className="group cursor-pointer bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-[#DFFF00]/50 hover:bg-white/10 transition-all"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4 border border-white/5">
                  <Image src={project.src} alt={project.title} fill className="object-cover transition-transform group-hover:scale-110" unoptimized />
                </div>
                <h3 className="text-lg font-bold group-hover:text-[#DFFF00] transition-colors">{project.title}</h3>
                <p className="text-white/50 text-sm">{project.category}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}