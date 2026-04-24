
import FAQ from "./Components/FAQ/FAQ"
// import Agenda from "./Components/Agenda/Agenda"
import Footer from "./Components/Footer/Footer"
import { Navbar } from "./Components/Navbar/Navbar"
import {Judges} from "./Components/Judges/Judges"

function App() {
  return (
    <>
    <Navbar/>
    {/* <Agenda/> */}
    <Judges/>
    <FAQ/>
    <Footer/>
    </>
  );
}


export default App;
