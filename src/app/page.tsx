import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/ui/Preloader";
import Hero from "@/components/sections/Hero";
import BeyondTheCode from "@/components/sections/BeyondTheCode";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import GitHubActivity from "@/components/sections/GitHub";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main className="bg-[#ebeff5]">
        {/* Continuous Canvas: Hero + Beyond The Code + About + Skills + Projects */}
        <div className="relative w-full overflow-visible">
          <Hero />
          <BeyondTheCode />
          <About />
          <Skills />
          <Projects />
        </div>
        <GitHubActivity />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
