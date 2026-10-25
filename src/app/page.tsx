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
import StackedSections from "@/components/layout/StackedSections";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <StackedSections>
          <BeyondTheCode />
          <About />
          <Skills />
          <Projects />
        </StackedSections>
        <GitHubActivity />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
