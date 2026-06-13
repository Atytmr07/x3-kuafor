import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// A single hairline divider used between adjacent light sections.
function Divider() {
  return <div className="h-[1px] w-full bg-black/[0.08]" aria-hidden="true" />;
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Divider />
        <Gallery />
        <Testimonials />
        <Stats />
        <Divider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
