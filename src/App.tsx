import FAQ from "./Components/FAQ/FAQ"
import Agenda from "./Components/Agenda/Agenda"
import Footer from "./Components/Footer/Footer"
import WhatDesignFrontiers from "./Components/WhatIs/WhatDesignFrontiers"
import { Navbar } from "./Components/Navbar/Navbar"
import {Judges} from "./Components/Judges/Judges"
import Hero from "./Components/Hero/Hero"
import { Toggle } from "./Components/ToggleButton/Toggle"
import { SiteThemeProvider } from "./context/SiteThemeContext"
function App() {
  return (
    <SiteThemeProvider>
      <>
        <Navbar />
        <Toggle />
        <Hero />
        <WhatDesignFrontiers />
        <Agenda />
        <Judges />
        <FAQ />
        <Footer />
      </>
    </SiteThemeProvider>
  );
}


export default App;
