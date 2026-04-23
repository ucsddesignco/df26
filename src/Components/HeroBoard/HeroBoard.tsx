import './HeroBoard.scss'
import { useEffect, useRef } from 'react'; // Added imports
import OpenInNew from '../../SVGS/OpenInNew';
import Station26Icon from '../../SVGS/Station26Icon';
import Button from '../Button/Button';
import { motion } from 'framer-motion';

export default function HeroBoard() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) return;


    /* 
    Shrinks the size of the text if greater than container size 
    Resolves issue with WebKit (Safari) font size rendering
    */
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const availableWidth = entry.contentRect.width;

        text.style.transform = 'none';
        const textWidth = text.scrollWidth;

        // If the text is wider than the container, calculate how much to shrink it
        if (textWidth > availableWidth) {
          const scaleFactor = availableWidth / textWidth;
          text.style.transform = `scale(${scaleFactor})`;
        } else {
          text.style.transform = 'none';
        }
      }
    });

    // Start observing the container
    resizeObserver.observe(container);

    // Cleanup function when component unmounts
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <motion.div className='hero-board'
        initial={{ y: "-120%" }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 150, 
          damping: 20, 
          mass: 1.0,
          delay: 0.2
        }}>
        <div className='board-legs'>
          <div className='left-leg'/>
          <div className='right-leg'/>
        </div>

        <div className='board-container'>
          <div className='header'>
            <div className='icon-wrapper'>
              <Station26Icon/>
            </div>
            <div className='header-text' ref={containerRef}>
              <p className="main-text" ref={textRef}>DESIGN FRONTIERS</p>
              <p className='sub-text'>Collaborate, ideate, create. Join Design Co&apos;s annual design-a-thon!</p>
            </div>
          </div>
          <div className="details-section">
            <div className='details-column-container'>
              {/* Column 1 -- Remark*/}
              <div className='column'>
                <div className='column-header'>
                  <p
                    className="header-text site-theme-paint-transition"
                    style={{ color: "var(--site-column-header)" }}
                  >
                    Line
                  </p>
                </div>
                <div className='card'>
                  <p className='card-text'>DAY 1</p>
                </div>
                <div className='card'>
                  <p className='card-text'>DAY 2</p>
                </div>
              </div>

              {/* Column 1 -- Date*/}
              <div className='column'>
                <div className='column-header'>
                  <p
                    className="header-text site-theme-paint-transition"
                    style={{ color: "var(--site-column-header)" }}
                  >
                    Date
                  </p>
                </div>
                <div className='card'>
                  <p className='card-text'>MAY 9</p>
                </div>
                <div className='card'>
                  <p className='card-text'>MAY 10</p>
                </div>
              </div>

              {/* Column 1 -- Time*/}
              <div className='column'>
                <div className='column-header'>
                  <p
                    className="header-text site-theme-paint-transition"
                    style={{ color: "var(--site-column-header)" }}
                  >
                    Time
                  </p>
                </div>
                <div className='card'>
                  <p className='card-text'>2 PM - 6 PM</p>
                </div>
                <div className='card'>
                  <p className='card-text'>10 AM - 4 PM</p>
                </div>
              </div>

              {/* Column 1 -- Platform*/}
              <div className='column'>
                <div className='column-header'>
                  <p
                    className="header-text site-theme-paint-transition"
                    style={{ color: "var(--site-column-header)" }}
                  >
                    Platform
                  </p>
                </div>
                <div className='card'>
                  <p className='card-text'>DIB 208</p>
                </div>
                <div className='card'>
                  <p className='card-text'>DIB 208</p>
                </div>
              </div>
            </div>
            <Button text='Register Now' icon={<OpenInNew/>} link="https://docs.google.com/forms/d/e/1FAIpQLSfXfMORaXDT25FozvsYMx6te3ffq0lKBhg8qvjTxi7zqC4_tA/viewform" className='register-button'></Button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
