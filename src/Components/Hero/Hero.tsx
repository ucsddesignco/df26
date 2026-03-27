import './Hero.scss';
import TrainSVG from '../../SVGS/TrainSVG';import DepartOnScroll from '../DepartOnScroll/DepartOnScroll';

export default function Hero() {
  const marqueeText = Array(12).fill('DESIGN FRONTIERS');

  return (
    <section id="hero">
      <div className="hero-content">
        <DepartOnScroll>
          <div className="train-wrapper">
            <TrainSVG />
          </div>
        </DepartOnScroll>
        <div className='hero-footer'> 
          {/* Track 1 */}
          <div className="marquee-content">
            {marqueeText.map((text, index) => (
              <span key={`track1-${index}`} className='scrolling-text'>{text}</span>
            ))}
          </div>
          {/* Track 2 */}
          <div className="marquee-content" aria-hidden="true">
            {marqueeText.map((text, index) => (
              <span key={`track2-${index}`} className='scrolling-text'>{text}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}