// using the image version of the grain for the background could hurt performance

import "./Hero.scss";
import HeroBoard from "../HeroBoard/HeroBoard";
import TrainTrack from "../../SVGS/TrainTrack";
import BigTrainSVG from "../../SVGS/Train/BigTrainSVG";
import MedTrainSVG from "../../SVGS/Train/MedTrainSVG";
import SmallTrainSVG from "../../SVGS/Train/SmallTrainSVG";
import DepartOnScroll from "../DepartOnScroll/DepartOnScroll";
import BigFlower from "../../SVGS/Flower/BigFlower";
import MedFlower from "../../SVGS/Flower/MedFlower";
import SmallFlower from "../../SVGS/Flower/SmallFlower";

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-section">
        {/*
          Flowers are not yet styled or positioned
        <div className="left-flowers">
          <BigFlower className="left1"/>
          <MedFlower className="left2"/>
          <SmallFlower className="left3"/>
          <SmallFlower className="left4"/>
        </div>
        <div className="right-flowers">
          <BigFlower className="right1"/>
          <MedFlower className="right2"/>
          <SmallFlower className="right3"/>
          <SmallFlower className="right4"/>
        </div>
        */}
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
