"use client";
import { Briefcase, ExternalLink, Github, Layers } from "lucide-react";

const projects = [
  {
    title: "Third Party Risk Management (TPRM)",
    description: "A comprehensive vendor risk assessment system designed to evaluate and monitor third-party vendors. Features real-time risk scoring (High/Med/Low), compliance tracking, and automated workflow management.",
    tech: ["JavaScript", "HTML/CSS", "Database Mgmt", "Risk Logic"],
    link: "#",
    github: "#"
  },
  {
    title: "Ticket Management System",
    description: "A professional admin dashboard for workflow support. Includes advanced filtering (Status, Priority, SLA), live chat functionality, and real-time analytics using Chart.js.",
    tech: ["HTML5", "CSS3", "JavaScript", "Chart.js"],
    link: "#",
    github: "#"
  },
  {
    title: "Dhwani Store",
    description: "A modern e-commerce platform featuring a clean, responsive UI and scalable frontend architecture. Includes smooth navigation, structured product showcases, and live deployment.",
    tech: ["HTML", "CSS", "JavaScript", "Netlify"],
    link: "https://dhwani-store.netlify.app",
    github: "#"
  },
  {
    title: "Nalanda University Clone",
    description: "A pixel-perfect clone of the Nalanda University website focusing on modern UI design, clean structured code, and responsive layouts to enhance DOM manipulation skills.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "#",
    github: "#"
  },
  {
    title: "TATA MOTORS Replica",
    description: "A mini-replica of the TATA Motors website focusing on modular codebase structure, responsive layout design, and visual appeal for frontend practice.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "#",
    github: "https://github.com/CodeWithAT/TATA_MOTORS"
  },
  {
    title: "Niccolo Miranda Portfolio",
    description: "An interactive portfolio template featuring complex animations, stack UI with modern design, and component-based architecture using GSAP.",
    tech: ["HTML", "CSS", "GSAP", "JavaScript"],
    link: "#",
    github: "https://github.com/CodeWithAT/niccolomiranda"
  }
];

export default function WorkContent() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter flex items-center gap-4">
          <Briefcase className="text-lime-400" size={40} /> Selected Work
        </h2>
        <p className="text-zinc-400 text-lg">A collection of systems I&apos;ve built from the ground up.</p>
      </section>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="group relative p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/[0.07] transition-all">
            <div className="flex justify-between items-start mb-4">
              <Layers className="text-lime-400" />
              <div className="flex gap-4">
                <a href={project.github} className="text-zinc-500 hover:text-white transition-colors"><Github size={20} /></a>
                <a href={project.link} className="text-zinc-500 hover:text-white transition-colors"><ExternalLink size={20} /></a>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-lime-400 transition-colors">{project.title}</h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span key={i} className="px-3 py-1 bg-lime-400/10 text-lime-400 text-[10px] font-mono uppercase tracking-widest rounded-full border border-lime-400/20">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}