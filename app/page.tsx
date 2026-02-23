"use client";
// import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

export default function Home() {
  // const [preloaderFinished, setPreloaderFinished] = useState(false);

  return (
    <main className="w-full">
      {/* <Preloader onComplete={() => setPreloaderFinished(true)} /> */}
      {/* <Hero startAnimation={preloaderFinished} /> */}
      <Hero/>
      <Intro />
      <Services />
      <Projects />
      <Experience />
      <Footer />
    </main>
  );
}
