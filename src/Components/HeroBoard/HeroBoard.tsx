import './HeroBoard.scss'
import OpenInNew from '../../SVGS/OpenInNew';
import Station26Icon from '../../SVGS/Station26Icon';
import Button from '../Button/Button';


export default function HeroBoard() {
  return (
    <>
      <div className='hero-board'>
        <div className='board-legs'>
          <div className='left-leg'/>
          <div className='right-leg'/>
        </div>

        <div className='board-container'>
          <div className='header'>
            <div className='icon-wrapper'>
              <Station26Icon/>
            </div>
            <div className='header-text'>
              <p className="main-text">DESIGN FRONTIERS</p>
              <p className='sub-text'>Solve real world problems in Design Co&apos;s two day design-a-thon!</p>
            </div>
          </div>
          <div className="details-section">
            <div className='details-column-container'>
              {/* Column 1 -- Remark*/}
              <div className='column'>
                <div className='column-header'>
                  <p className='header-text'>Line</p>
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
                  <p className='header-text'>Date</p>
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
                  <p className='header-text'>Time</p>
                </div>
                <div className='card'>
                  <p className='card-text'>2 PM - 5 PM</p>
                </div>
                <div className='card'>
                  <p className='card-text'>10 AM - 3 PM</p>
                </div>
              </div>

              {/* Column 1 -- Platform*/}
              <div className='column'>
                <div className='column-header'>
                  <p className='header-text'>Platform</p>
                </div>
                <div className='card'>
                  <p className='card-text'>DIB 208</p>
                </div>
                <div className='card'>
                  <p className='card-text'>DIB 208</p>
                </div>
              </div>
            </div>
            <Button text='Register Now' icon={<OpenInNew/>} className='register-button'></Button>
          </div>
        </div>
      </div>
    </>
  );
}
