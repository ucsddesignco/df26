import './Hero.scss';
import Train from '../../SVGS/Train';

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-content">
        <p> Hello </p>
        <div className='train'> 
          <Train/>
        </div>
      </div>
    </section>
  );
}