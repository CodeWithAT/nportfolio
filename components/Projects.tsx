"use client";
import { useState, useRef, useEffect } from "react";
import { useLenis } from "@studio-freight/react-lenis";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ExternalLink, Github, Star, ArrowUpRight, Check, Loader2 } from "lucide-react";
import MagneticButton from "./ui/MagneticButton"; 
import emailjs from "@emailjs/browser";
import { client } from "@/sanity/lib/client"; // Sanity Client
import imageUrlBuilder from "@sanity/image-url"; // Sanity Image Builder

// Setup Sanity Image Builder
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

export default function Projects() {
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const lenis = useLenis();

  // Fetch Projects from Sanity
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch(`*[_type == "project"] | order(_createdAt desc)`);
        setProjectsData(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

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
    <section className="bg-[#050505] text-white py-20 md:py-32 px-6 md:px-20 relative z-20" id="work">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 border-b border-white/10 pb-10">
          <h2 className="text-4xl md:text-6xl font-manrope font-light leading-tight">
            Selected <span className="text-[#DFFF00] font-medium italic">Works</span>
          </h2>
        </div>

        {loading ? (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-[#DFFF00] w-12 h-12" />
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 md:gap-x-12 md:gap-y-24">
            {projectsData.slice(0, 4).map((project, index) => (
                <ProjectCard key={project._id} project={project} index={index} onClick={() => setSelectedProject(project)} />
            ))}
            </div>
        )}

        {!loading && projectsData.length > 0 && (
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
        )}
      </div>
    </section>

    <AnimatePresence>
        {selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
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

// --- Sub-Components ---
function ProjectCard({ project, index, onClick }: { project: any, index: number, onClick: () => void }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  
  // Safely get image URL
  const imageUrl = project.image ? urlFor(project.image).url() : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=600";

  return (
    <div ref={container} className={`group cursor-pointer ${index % 2 === 1 ? "md:mt-24" : ""}`} onClick={onClick}>
      <div className="overflow-hidden rounded-xl aspect-[4/3] relative mb-6 md:mb-8 border border-white/5">
        <motion.div style={{ y, scale: 1.1 }} className="absolute inset-0 w-full h-full">
          <Image src={imageUrl} alt={project.title} fill className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:blur-[2px]" unoptimized />
        </motion.div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <span className="px-6 py-3 bg-[#DFFF00] text-black rounded-full font-bold transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300 text-sm md:text-base">
            View Details
          </span>
        </div>
      </div>
      <div className="flex justify-between items-start border-t border-white/20 pt-4 md:pt-6">
        <div>
          <h3 className="text-2xl md:text-3xl font-manrope font-medium mb-2 group-hover:text-[#DFFF00] transition-colors">{project.title}</h3>
          <div className="flex gap-2 text-white/50 text-xs md:text-sm uppercase tracking-wider">
            <span>{project.category}</span>
            <span>•</span>
            <span>{project.date}</span>
          </div>
        </div>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-[#DFFF00] group-hover:bg-[#DFFF00] group-hover:text-black transition-all duration-300 group-hover:-rotate-45 shrink-0 ml-4">
          <ArrowUpRight size={20} />
        </div>
      </div>
    </div>
  );
}

function ProjectDetailModal({ project, onClose }: { project: any, onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", review: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  
  const imageUrl = project.image ? urlFor(project.image).url() : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=600";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setStatus("sending");

    const templateParams = {
      user_name: form.name,
      user_email: form.email,
      message: `Project: ${project.title}\nRating: ${rating} / 5 Stars\nReview: ${form.review || "No written review provided."}`
    };

    emailjs.send(
      "service_ik1pj3i", 
      "template_pamh746", 
      templateParams,
      "h9A5MkPe_50Ci9SpP" 
    ).then(() => {
        setStatus("success");
    }).catch((error) => {
        console.error("FAILED...", error);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      
      <motion.div 
        initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
        className="relative bg-[#0f0f0f] border border-white/10 w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl custom-scrollbar overscroll-contain"
        data-lenis-prevent
      >
        <button onClick={onClose} className="sticky top-4 right-4 md:top-6 md:right-6 float-right z-50 p-2 bg-black/50 rounded-full hover:bg-white/20 transition-colors border border-white/10 backdrop-blur-md">
          <X size={20} color="white"/>
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative h-48 md:h-auto min-h-[250px] md:min-h-[300px]">
            <Image src={imageUrl} alt={project.title} fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/50 to-transparent md:bg-gradient-to-r md:via-transparent md:to-transparent opacity-90 md:opacity-80" />
          </div>

          <div className="p-6 md:p-10 space-y-6 md:space-y-8">
            <div className="pt-2 md:pt-0"> 
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#DFFF00]">{project.title}</h2>
              <p className="text-white/60 text-xs md:text-sm">{project.category} — {project.date}</p>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">{project.description}</p>
            
            <div>
              <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/50 mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech && project.tech.map((t: string) => (
                  <span key={t} className="px-3 py-1 border border-white/20 rounded-full text-xs text-gray-300 bg-white/5">{t}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 border-b border-white/10 pb-6 md:pb-8">
              {project.link && project.link !== "" && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 md:py-4 bg-[#DFFF00] text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-colors text-sm md:text-base">
                  Live Demo <ExternalLink size={18} />
                </a>
              )}
              {project.github && project.github !== "" && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 md:py-4 bg-white/5 border border-white/10 font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-colors text-sm md:text-base text-white">
                  Github <Github size={18} />
                </a>
              )}
            </div>

            <div className="pt-2 pb-6 md:pb-10"> 
              <h4 className="text-base md:text-lg font-bold text-white mb-4">Rate & Review Project</h4>
              {status === "idle" || status === "sending" || status === "error" ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-1 md:gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star} type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star size={24} className="md:w-7 md:h-7" fill={star <= (hoverRating || rating) ? "#DFFF00" : "transparent"} color={star <= (hoverRating || rating) ? "#DFFF00" : "#666"} />
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <input required type="text" placeholder="Your Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#DFFF00] transition-colors" />
                    <input required type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#DFFF00] transition-colors" />
                  </div>
                  <textarea placeholder="Write a quick review..." rows={2} value={form.review} onChange={(e) => setForm({...form, review: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#DFFF00] transition-colors resize-none" />
                  <button type="submit" disabled={rating === 0 || status === "sending"} className={`w-full py-3 border border-white/10 text-white font-bold rounded-lg transition-all text-sm md:text-base ${status === "error" ? "bg-red-500 text-white" : "bg-white/10 hover:bg-[#DFFF00] hover:text-black hover:border-transparent disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"}`}>
                    {status === "idle" && "Submit Review"}
                    {status === "sending" && <><Loader2 className="animate-spin" size={18} /> Sending...</>}
                    {status === "error" && "Failed - Try Again"}
                  </button>
                </form>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#DFFF00]/10 border border-[#DFFF00]/20 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#DFFF00] rounded-full flex items-center justify-center mb-2">
                    <Check size={20} className="text-black md:w-6 md:h-6" />
                  </div>
                  <h5 className="text-[#DFFF00] font-bold text-base md:text-lg">Review Sent!</h5>
                  <p className="text-white/60 text-xs md:text-sm">I have received your rating directly in my inbox.</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AllProjectsModal({ projects, onClose, onSelect }: { projects: any[], onClose: () => void, onSelect: (p: any) => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-[#0f0f0f] border border-white/10 w-full max-w-5xl h-[85vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl overscroll-contain">
        <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center bg-[#0f0f0f] z-10 shrink-0">
          <h2 className="text-2xl md:text-3xl font-bold">All Projects ({projects.length})</h2>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <X size={20} className="md:w-6 md:h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar" data-lenis-prevent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {projects.map((project) => {
              const imageUrl = project.image ? urlFor(project.image).url() : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=600";
              return (
                <div key={project._id} onClick={() => onSelect(project)} className="group cursor-pointer bg-white/5 rounded-2xl p-3 md:p-4 border border-white/5 hover:border-[#DFFF00]/50 hover:bg-white/10 transition-all">
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-3 md:mb-4 border border-white/5">
                    <Image src={imageUrl} alt={project.title} fill className="object-cover transition-transform group-hover:scale-110" unoptimized />
                  </div>
                  <h3 className="text-base md:text-lg font-bold group-hover:text-[#DFFF00] transition-colors">{project.title}</h3>
                  <p className="text-white/50 text-xs md:text-sm">{project.category}</p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}