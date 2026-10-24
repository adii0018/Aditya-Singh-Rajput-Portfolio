import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/ui/Preloader";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Playground from "@/components/sections/Playground";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import BentoFeatures from "@/components/sections/BentoFeatures";
import Certifications from "@/components/sections/Certifications";
import GitHubActivity from "@/components/sections/GitHub";
import Contact from "@/components/sections/Contact";
import StackedSections from "@/components/layout/StackedSections";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <StackedSections>
          <Playground />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <BentoFeatures />
          <Certifications />
          <GitHubActivity />
        </StackedSections>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
