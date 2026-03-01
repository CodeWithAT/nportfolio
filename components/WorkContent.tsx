"use client";
import { useState, useEffect } from "react";
import { Briefcase, ExternalLink, Github, Layers, Loader2 } from "lucide-react";
import { client } from "@/sanity/lib/client";

export default function WorkContent() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch(`*[_type == "project"] | order(_createdAt desc)`);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="space-y-8 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter flex items-center gap-3 md:gap-4 text-white">
          <Briefcase className="text-lime-400 w-8 h-8 md:w-10 md:h-10" /> 
          Selected Work
        </h2>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl">
          A collection of systems I&apos;ve built from the ground up, ranging from 
          <span className="text-white font-medium"> SaaS dashboards</span> to 
          <span className="text-lime-400/80 italic"> interactive frontend experiences.</span>
        </p>
      </section>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 text-lime-400 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <div 
              key={project._id || index} 
              className="group relative p-6 md:p-8 bg-zinc-900/50 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/10 hover:border-lime-400/50 hover:bg-zinc-800/50 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/5 rounded-full group-hover:bg-lime-400 group-hover:text-black transition-colors">
                   <Layers size={20} className="text-lime-400 group-hover:text-black" />
                </div>
                
                <div className="flex gap-3 relative z-20">
                  {project.github && project.github !== "" && (
                      <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-2 bg-white/5 rounded-full text-zinc-400 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
                          title="View Source Code"
                      >
                          <Github size={18} />
                      </a>
                  )}
                  {project.link && project.link !== "" && (
                      <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-2 bg-white/5 rounded-full text-zinc-400 hover:text-lime-400 hover:bg-white/20 transition-all cursor-pointer"
                          title="Live Demo"
                      >
                          <ExternalLink size={18} />
                      </a>
                  )}
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white group-hover:text-lime-400 transition-colors">
                  {project.title}
              </h3>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                  {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech && project.tech.map((t: string, i: number) => (
                  <span 
                      key={i} 
                      className="px-3 py-1 bg-lime-400/5 text-lime-400 text-[10px] md:text-xs font-mono uppercase tracking-widest rounded-full border border-lime-400/20 group-hover:bg-lime-400/10 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}