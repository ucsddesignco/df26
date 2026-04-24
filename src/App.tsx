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
    const ua = navigator.userAgent;
    const isSafari = /Safari/i.test(ua) && !/(Chrome|Chromium|CriOS|Edg|OPR)/i.test(ua);
    if (isSafari) return;

    gsap.registerPlugin(ScrollTrigger);

    // Keep smooth/parallax scroll behavior for non-Safari browsers.
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
