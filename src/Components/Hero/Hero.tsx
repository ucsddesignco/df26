import "./Hero.scss";
import HeroBoard from "../HeroBoard/HeroBoard";
import TrainTrack from "../../SVGS/TrainTrack";
import BigTrainSVG from "../../SVGS/BigTrainSVG";
import MedTrainSVG from "../../SVGS/MedTrainSVG";
import SmallTrainSVG from "../../SVGS/SmallTrainSVG";
import DepartOnScroll from "../DepartOnScroll/DepartOnScroll";

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-section">
        <div className="hero-board">
          <HeroBoard/>
        </div>
        <DepartOnScroll>
          <div className="train-wrapper big-train">
            <BigTrainSVG />
          </div>
          <div className="train-wrapper med-train">
            <MedTrainSVG />
          </div>
          <div className="train-wrapper small-train">
            <SmallTrainSVG />
          </div>
        </DepartOnScroll>
        <div className="train-track">
          <TrainTrack/>
        </div>
      </div>
    </section>
  );
}
