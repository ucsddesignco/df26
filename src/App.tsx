import FAQ from "./Components/FAQ/FAQ"
import Agenda from "./Components/Agenda/Agenda"
import Footer from "./Components/Footer/Footer"
import WhatDesignFrontiers from "./Components/WhatIs/WhatDesignFrontiers"
import { Navbar } from "./Components/Navbar/Navbar"

function App() {
  return (
    <>
    <Navbar/>
    <WhatDesignFrontiers/>
    <Agenda/>
    <FAQ/>
    <Footer/>
    </>
  );
}


export default App;
