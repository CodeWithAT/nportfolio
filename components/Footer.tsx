"use client";
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { X, Send, ExternalLink, Github, User, Briefcase, Cpu, GraduationCap, Loader2, CheckCircle2, Mail } from "lucide-react";
import emailjs from "@emailjs/browser";

// --- 1. Sub-Component: About Content (Updated with Resume Details) ---
const AboutContent = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter flex items-center gap-3 md:gap-4 text-white">
            <User className="text-lime-400" size={36} /> About
        </h2>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
            I am <span className="text-white font-bold">Abhay Tiwari</span>, a results-driven Full Stack Developer. 
            I specialize in building scalable web applications across the frontend (React, HTML, CSS) and backend (Java, Spring Boot, Python, Django).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-lime-400/30 transition-colors">
                <Cpu className="text-lime-400 mb-2" size={20} />
                <h4 className="font-bold text-white mb-1">Tech Stack</h4>
                <p className="text-zinc-500 text-sm">React, Java (Spring Boot), Python, MySQL, Tailwind CSS</p>
            </div>
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-lime-400/30 transition-colors">
                <GraduationCap className="text-lime-400 mb-2" size={20} />
                <h4 className="font-bold text-white mb-1">Education</h4>
                <p className="text-zinc-500 text-sm">BSc Computer Science, CSJMU Kanpur (2022 - 2026)</p>
            </div>
        </div>
    </div>
);

// --- 2. Sub-Component: Work Content (Updated with Links Logic) ---
const WorkContent = () => {
    // Empty links ("") will automatically hide the button so it doesn't look broken
    const projects = [
        {
          title: "Third Party Risk Management",
          desc: "Vendor risk assessment system with real-time risk scoring and workflow automation.",
          tech: "JavaScript, DB Mgmt",
          link: "https://raw.githack.com/CodeWithAT/Third-Party-Risk-Management-TPRM-/main/index.html",
          github: ""
        },
        {
          title: "Ticket Management System",
          desc: "Admin dashboard for workflow support with SLA filtering and live chat.",
          tech: "HTML, CSS, JS, Chart.js",
          link: "https://raw.githack.com/CodeWithAT/Ticket_Management_System/main/indexxx.html",
          github: ""
        },
        {
          title: "Dhwani Store",
          desc: "Modern e-commerce platform with scalable frontend architecture.",
          tech: "React, Netlify",
          link: "https://dhwani-store.netlify.app/",
          github: ""
        },
        {
          title: "Nalanda University Clone",
          desc: "Pixel-perfect clone focusing on DOM manipulation and UI design.",
          tech: "HTML, CSS, JS",
          link: "https://raw.githack.com/AT30035/Nalanda_University_colne/main/index.html",
          github: ""
        },
        {
          title: "TATA MOTORS Replica",
          desc: "Modular codebase structure replica focusing on visual appeal.",
          tech: "HTML, CSS, JS",
          link: "https://raw.githack.com/CodeWithAT/TATA_MOTORS/main/index.html",
          github: "https://github.com/CodeWithAT/TATA_MOTORS"
        },
        {
          title: "Niccolo Miranda Portfolio",
          desc: "Interactive portfolio template with complex GSAP animations.",
          tech: "GSAP, Animations",
          link: "https://raw.githack.com/CodeWithAT/niccolomiranda/main/niccolomiranda/index.html",
          github: "https://github.com/CodeWithAT/niccolomiranda"
        }
      ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter flex items-center gap-3 md:gap-4 text-white">
                <Briefcase className="text-lime-400" size={36} /> Selected Work
            </h2>
            <div className="grid grid-cols-1 gap-4">
                {projects.map((p, i) => (
                    <div key={i} className="group p-5 md:p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-lime-400/50 transition-all">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-lime-400 transition-colors">{p.title}</h3>
                            <div className="flex gap-3">
                                {p.github && p.github !== "" && (
                                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                                        <Github size={18} />
                                    </a>
                                )}
                                {p.link && p.link !== "" && (
                                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-lime-400 transition-colors">
                                        <ExternalLink size={18} />
                                    </a>
                                )}
                            </div>
                        </div>
                        <p className="text-zinc-400 text-sm mb-3 leading-relaxed">{p.desc}</p>
                        <span className="inline-block text-[10px] font-mono text-lime-400 border border-lime-400/20 px-2 py-1 rounded-full bg-lime-400/5">
                            {p.tech}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- 3. Sub-Component: Contact Content ---
const ContactContent = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;
        setStatus("sending");

        emailjs.sendForm(
            "service_ik1pj3i",   
            "template_pamh746",  
            formRef.current,
            "h9A5MkPe_50Ci9SpP"  
        )
        .then((result) => {
            console.log("SUCCESS!", result.text);
            setStatus("success");
            setTimeout(() => {
                formRef.current?.reset();
                setStatus("idle");
            }, 3000);
        }, (error) => {
            console.error("FAILED...", error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-2 text-white">Contact</h2>
                <p className="text-zinc-400">Available for collaborations and full-time roles.</p>
            </div>
            <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
                <input 
                    name="user_name"
                    type="text" 
                    required 
                    placeholder="Name" 
                    className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none focus:border-lime-400 transition-all text-white placeholder:text-zinc-600" 
                />
                <input 
                    name="user_email"
                    type="email" 
                    required 
                    placeholder="Email" 
                    className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none focus:border-lime-400 transition-all text-white placeholder:text-zinc-600" 
                />
                <textarea 
                    name="message"
                    required 
                    rows={3} 
                    placeholder="Message" 
                    className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none focus:border-lime-400 transition-all resize-none text-white placeholder:text-zinc-600" 
                />
                <button 
                    disabled={status === "sending" || status === "success"}
                    className={`w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95
                        ${status === "success" ? "bg-green-500 text-white" : 
                          status === "error" ? "bg-red-500 text-white" : 
                          "bg-lime-500 text-black hover:bg-white"}`}
                >
                    {status === "idle" && <>SEND MESSAGE <Send size={18} /></>}
                    {status === "sending" && <><Loader2 className="animate-spin" size={18} /> SENDING...</>}
                    {status === "success" && <><CheckCircle2 size={18} /> SENT SUCCESSFULLY</>}
                    {status === "error" && <>FAILED - TRY AGAIN</>}
                </button>
            </form>
        </div>
    );
};

// --- 4. 3D Robot Head ---
function RobotHead() {
    const headRef = useRef<THREE.Group>(null);
    
    useFrame((state) => {
        if (!headRef.current) return;
        const targetX = state.mouse.x * 0.5;
        const targetY = -state.mouse.y * 0.3;
        
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX, 0.1);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetY, 0.1);
    });

    return (
        <Float floatIntensity={0.5} speed={3} rotationIntensity={0.2}>
            <group ref={headRef}>
                <mesh>
                    <boxGeometry args={[1.4, 1.2, 1.2]} />
                    <meshStandardMaterial color="#333" roughness={0.2} metalness={0.9} emissive="#111" />
                </mesh>
                <mesh>
                    <boxGeometry args={[1.42, 1.22, 1.22]} />
                    <meshBasicMaterial color="#4d4d4d" wireframe opacity={0.3} transparent />
                </mesh>
                <mesh position={[0, -0.1, 0.65]}>
                    <boxGeometry args={[1.2, 0.8, 0.1]} />
                    <meshStandardMaterial color="#222" roughness={0.3} metalness={0.8} />
                </mesh>
                <group position={[0, 0.05, 0.72]}>
                    <mesh position={[-0.35, 0, 0]}>
                        <boxGeometry args={[0.25, 0.1, 0.05]} />
                        <meshStandardMaterial color="#a3e635" emissive="#a3e635" emissiveIntensity={2} toneMapped={false} />
                    </mesh>
                    <mesh position={[0.35, 0, 0]}>
                        <boxGeometry args={[0.25, 0.1, 0.05]} />
                        <meshStandardMaterial color="#a3e635" emissive="#a3e635" emissiveIntensity={2} toneMapped={false} />
                    </mesh>
                </group>
                <mesh position={[0.75, 0, 0]}>
                    <boxGeometry args={[0.1, 0.8, 0.8]} />
                    <meshStandardMaterial color="#333" roughness={0.5} metalness={0.5} />
                </mesh>
                <mesh position={[-0.75, 0, 0]}>
                    <boxGeometry args={[0.1, 0.8, 0.8]} />
                    <meshStandardMaterial color="#333" roughness={0.5} metalness={0.5} />
                </mesh>
                <group position={[0, 0.6, 0]}>
                    <mesh position={[-0.5, 0.3, 0]} rotation={[0, 0, 0.2]}>
                        <cylinderGeometry args={[0.02, 0.02, 0.6]} />
                        <meshStandardMaterial color="#555" metalness={1} />
                    </mesh>
                    <mesh position={[-0.56, 0.6, 0]}>
                        <sphereGeometry args={[0.04]} />
                        <meshStandardMaterial color="red" emissive="red" emissiveIntensity={2} />
                    </mesh>
                    <mesh position={[0.5, 0.3, 0]} rotation={[0, 0, -0.2]}>
                        <cylinderGeometry args={[0.02, 0.02, 0.6]} />
                        <meshStandardMaterial color="#555" metalness={1} />
                    </mesh>
                </group>
                <mesh position={[0, -0.7, 0]}>
                    <cylinderGeometry args={[0.3, 0.4, 0.4]} />
                    <meshStandardMaterial color="#1a1a1a" metalness={0.8} />
                </mesh>
            </group>
        </Float>
    );
}

// --- 5. Main Footer Component ---
export default function Footer() {
    const [activeModal, setActiveModal] = useState<"about" | "work" | "contact" | null>(null);
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    // Scroll Lock
    useEffect(() => {
        if (activeModal) {
            document.body.style.overflow = "hidden";
            gsap.to(overlayRef.current, { opacity: 1, display: "flex", duration: 0.3 });
            gsap.fromTo(modalRef.current, 
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power4.out" }
            );
        } else {
            document.body.style.overflow = "unset";
            gsap.to(overlayRef.current, { opacity: 0, display: "none", duration: 0.3 });
        }
    }, [activeModal]);

    return (
        <footer className="relative h-screen bg-black text-white overflow-hidden flex flex-col justify-between pt-20" id="footer">
            
            {/* --- FIXED TOP-RIGHT CONTACT BUTTON --- */}
            <button 
                onClick={() => setActiveModal('contact')}
                className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex items-center gap-3 px-4 py-2 md:px-5 md:py-2.5 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-full hover:bg-zinc-800/60 hover:border-lime-400/30 transition-all duration-300 group cursor-pointer shadow-lg shadow-black/20"
            >
                <div className="relative flex items-center justify-center">
                    <span className="absolute w-full h-full bg-lime-400 rounded-full animate-ping opacity-20"></span>
                    <Mail size={16} className="text-lime-400 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm font-medium text-zinc-200 group-hover:text-white tracking-wide">Let's Talk</span>
            </button>

            {/* --- MODAL OVERLAY --- */}
            <div 
                ref={overlayRef} 
                className="fixed inset-0 z-[200] hidden items-center justify-center bg-black/80 backdrop-blur-md px-4"
                onClick={() => setActiveModal(null)}
            >
                <div 
                    ref={modalRef} 
                    onClick={(e) => e.stopPropagation()} 
                    className="bg-[#0a0a0a] border border-white/10 p-6 md:p-10 rounded-[2rem] w-full max-w-2xl relative shadow-2xl max-h-[85vh] overflow-y-auto custom-scrollbar overscroll-contain"
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                >
                    <button 
                        onClick={() => setActiveModal(null)} 
                        className="sticky top-0 float-right z-50 p-2 bg-zinc-800/50 rounded-full hover:bg-white/20 transition-colors text-zinc-400 hover:text-white backdrop-blur-md"
                    >
                        <X size={24} />
                    </button>
                    
                    <div className="mt-2">
                        {activeModal === 'about' && <AboutContent />}
                        {activeModal === 'work' && <WorkContent />}
                        {activeModal === 'contact' && <ContactContent />}
                    </div>
                </div>
            </div>

            {/* --- FOOTER NAV --- */}
            <div className="flex flex-col md:flex-row justify-between items-start px-8 md:px-20 z-30 relative pointer-events-none gap-8 md:gap-0 pb-8 md:pb-0">
                <div className="flex flex-col md:flex-row gap-8 md:gap-32 pointer-events-auto w-full md:w-auto">
                    <div>
                        <h4 className="text-zinc-600 text-[10px] uppercase tracking-[0.3em] mb-4 md:mb-6 font-bold">Index</h4>
                        <ul className="space-y-3 font-medium text-base md:text-lg text-white">
                            <li><button onClick={() => setActiveModal('work')} className="hover:text-lime-400 transition-all duration-300 hover:translate-x-1 text-left">Work</button></li>
                            <li><button onClick={() => setActiveModal('about')} className="hover:text-lime-400 transition-all duration-300 hover:translate-x-1 text-left">About</button></li>
                            <li><button onClick={() => setActiveModal('contact')} className="hover:text-lime-400 transition-all duration-300 hover:translate-x-1 font-bold italic text-left">Contact</button></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-zinc-600 text-[10px] uppercase tracking-[0.3em] mb-4 md:mb-6 font-bold">Connect</h4>
                        <ul className="space-y-3 font-medium text-base md:text-lg text-white">
                            <li><a href="https://github.com/abhay-tiwari" target="_blank" rel="noopener noreferrer" className="hover:text-lime-400 transition-all flex items-center gap-2">Github <Github size={14}/></a></li>
                            <li><a href="https://www.linkedin.com/in/abhay-tiwari-93b412290/" target="_blank" rel="noopener noreferrer" className="hover:text-lime-400 transition-all flex items-center gap-2">LinkedIn <ExternalLink size={14}/></a></li>
                        </ul>
                    </div>
                </div>

                <div className="hidden md:flex flex-col items-end gap-2 pointer-events-auto">
                    <span className="text-[10px] text-zinc-500 tracking-widest font-mono">AVAILABLE FOR HIRE</span>
                    <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* --- 3D SCENE (Z-Index: 10 - Behind Text) --- */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <Canvas 
                    camera={{ position: [0, 0, 5], fov: 35 }}
                    gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
                    className="w-full h-full"
                >
                    <ambientLight intensity={2} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#a3e635" />
                    
                    <Suspense fallback={null}>
                        <RobotHead />
                        <Environment preset="city" />
                        <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={10} blur={1.5} far={4} color="#000" />
                    </Suspense>
                </Canvas>
            </div>

            {/* --- GIANT NAME (Z-Index: 20 - In Front of Robot) --- */}
            <div className="absolute bottom-0 left-0 w-full text-center overflow-hidden z-20 pointer-events-none">
                <h1 className="text-[28vw] md:text-[26vw] leading-[0.8] font-black text-white mix-blend-overlay opacity-75 select-none tracking-tighter">
                    ABHAY
                </h1>
            </div>
        </footer>
    );
}