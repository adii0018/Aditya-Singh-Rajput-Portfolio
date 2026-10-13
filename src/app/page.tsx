import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import BentoFeatures from "@/components/sections/BentoFeatures";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Certifications from "@/components/sections/Certifications";
import GitHubActivity from "@/components/sections/GitHub";
import Contact from "@/components/sections/Contact";
import StackedSections from "@/components/layout/StackedSections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <StackedSections>
          <BentoFeatures />
          <Skills />
          <Projects />
          <Experience />
          <Certifications />
          <GitHubActivity />
        </StackedSections>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
