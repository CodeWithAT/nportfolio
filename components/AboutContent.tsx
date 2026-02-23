"use client";
import { User, Cpu, GraduationCap } from "lucide-react";

export default function AboutContent() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter flex items-center gap-4">
          <User className="text-lime-400" size={40} /> About Me
        </h2>
        <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
          I am a Full Stack Developer from India with a passion for 3D web experiences 
          and robust backend architectures. I specialize in turning complex logic into 
          cinematic digital realities.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tech Stack */}
        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-lime-400/50 transition-colors">
          <Cpu className="text-lime-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Technical Arsenal</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Next.js, React, Java (Spring Boot), Python (Django), Tailwind CSS, 
            GSAP, Three.js, and AWS Lambda.
          </p>
        </div>

        {/* Education/Gap Framing */}
        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-lime-400/50 transition-colors">
          <GraduationCap className="text-lime-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Journey</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Completed 12th in 2021. Spent the subsequent period mastering full-stack 
            engineering and building production-ready enterprise systems.
          </p>
        </div>
      </div>
    </div>
  );
}