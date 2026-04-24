import "lenis/dist/lenis.css";
import Lenis from "lenis";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FAQ from "./Components/FAQ/FAQ";
import Agenda from "./Components/Agenda/Agenda";
import Footer from "./Components/Footer/Footer";
import WhatDesignFrontiers from "./Components/WhatIs/WhatDesignFrontiers";
import { Navbar } from "./Components/Navbar/Navbar";
import { Judges } from "./Components/Judges/Judges";
import Hero from "./Components/Hero/Hero";
import { Toggle } from "./Components/ToggleButton/Toggle";
import { SiteThemeProvider } from "./context/SiteThemeContext";
import "./App.scss";
function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // One Lenis instance for the whole page (smooth scroll + smoother scroll-driven parallax).
    // We drive Lenis via GSAP's ticker so ScrollTrigger stays in sync.
    const lenis = new Lenis({ autoRaf: false });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (timeSeconds: number) => {
      lenis.raf(timeSeconds * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis.destroy();
    };
  }, []);

  return (
    <SiteThemeProvider>
      <>
        <Navbar />
        <Toggle />
        <Hero />
        <main className="main-sections">
          <WhatDesignFrontiers />
          <Agenda />
          <Judges />
          <FAQ />
          <Footer />
        </main>
      </>
    </SiteThemeProvider>
  );
}


export default App;
