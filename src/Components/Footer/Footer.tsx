import './Footer.scss'
import Button from '../Button/Button';
import DCoArrow from '../../SVGS/DCoArrow';

export default function Footer() {
  return (
    <footer>
      <div className='banner'>
        <div className='container'>
          <h1>Secure Your Spot!</h1>
          <Button text='Register' icon={<DCoArrow/>} className='register-button'></Button>
        </div>
      </div>
      <div className='footer-text'>
        <p>Made with &lt;3 by Design Co</p>
        <p>Winter 2026</p>
      </div>

    </footer>
  );
}