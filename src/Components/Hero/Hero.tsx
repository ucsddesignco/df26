import "./Hero.scss";
import HeroBoard from "../HeroBoard/HeroBoard";
import TrainTrack from "../../SVGS/TrainTrack";
import TrainSVG from "../../SVGS/TrainSVG";
import DepartOnScroll from "../DepartOnScroll/DepartOnScroll";

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-section">
        <div className="hero-board">
          <HeroBoard/>
        </div>
        <DepartOnScroll>
          <div className="train-wrapper">
            <TrainSVG />
          </div>
        </DepartOnScroll>
        <div className="train-track">
          <TrainTrack/>
        </div>
      </div>
    </section>
  );
}
