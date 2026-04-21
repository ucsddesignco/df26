import FAQ from "./Components/FAQ/FAQ"
import Agenda from "./Components/Agenda/Agenda"
import Footer from "./Components/Footer/Footer"
import WhatDesignFrontiers from "./Components/WhatIs/WhatDesignFrontiers"
import { Navbar } from "./Components/Navbar/Navbar"
import {Judges} from "./Components/Judges/Judges"
import Hero from "./Components/Hero/Hero"
function App() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <WhatDesignFrontiers/>
    <Agenda/>
    <Judges/>
    <FAQ/>
    <Footer/>
    </>
  );
}


export default App;
