"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Send, Mail, Github, Linkedin } from "lucide-react";

export default function ContactPage() {
  const containerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for the entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".contact-title", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
      })
      .from(".contact-card", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
      }, "-=0.5")
      .from(".input-field", {
        x: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
      }, "-=0.4");

      // Floating animation for background elements
      gsap.to(".floating-circle", {
        y: 30,
        x: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white py-20 px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="floating-circle absolute top-1/4 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="floating-circle absolute bottom-1/4 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Left: Text Content */}
        <div className="flex flex-col justify-center">
          <h1 className="contact-title text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Get in <span className="text-blue-500">touch.</span>
          </h1>
          <p className="contact-title text-gray-400 text-xl mb-10 max-w-sm">
            I’m currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is open!
          </p>

          <div className="contact-title space-y-6">
            <div className="flex items-center gap-4 hover:text-blue-400 transition-colors cursor-pointer">
              <Mail className="w-6 h-6" />
              <span className="text-lg">abhay.tiwari3003@gmail.com</span>
            </div>
            <div className="flex gap-6 mt-4">
              <Github className="w-8 h-8 hover:scale-110 transition-transform cursor-pointer" />
              <Linkedin className="w-8 h-8 hover:scale-110 transition-transform cursor-pointer text-blue-600" />
            </div>
          </div>
        </div>

        {/* Right: The UI Form */}
        <div className="contact-card bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl backdrop-blur-xl">
          <form className="space-y-8" ref={formRef}>
            <div className="input-field group">
              <label className="text-sm font-mono text-zinc-500 group-focus-within:text-blue-400 transition-colors">NAME</label>
              <input 
                type="text" 
                className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none focus:border-blue-500 transition-all text-xl"
                placeholder="John Doe"
              />
            </div>

            <div className="input-field group">
              <label className="text-sm font-mono text-zinc-500 group-focus-within:text-blue-400 transition-colors">EMAIL</label>
              <input 
                type="email" 
                className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none focus:border-blue-500 transition-all text-xl"
                placeholder="john@example.com"
              />
            </div>

            <div className="input-field group">
              <label className="text-sm font-mono text-zinc-500 group-focus-within:text-blue-400 transition-colors">MESSAGE</label>
              <textarea 
                rows={3}
                className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none focus:border-blue-500 transition-all text-xl resize-none"
                placeholder="What's on your mind?"
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-5 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-500 hover:text-white transition-all transform active:scale-95"
            >
              SEND MESSAGE <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}