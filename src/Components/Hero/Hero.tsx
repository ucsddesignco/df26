import "./Hero.scss";
import HeroBoard from "../HeroBoard/HeroBoard";

export default function Hero() {
  return (
    <>
      <div className="hero-section">
        <div className="hero-board">
          <HeroBoard></HeroBoard>
        </div>
      </div>
    </>
  );
}
