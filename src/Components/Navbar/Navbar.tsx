import './Navbar.scss'
import { Logo } from './Logo'
import { MenuIcon } from './Hamburger'


export const Navbar = () => {
  return (
    <div className="navbar-container">
        <span className='navbar-logo'><Logo /><a href='/' className="navbar-logo-text">Design Co</a></span>
        
        <div className="span-navbar">
            <li>About</li>
            <li>Events</li>
            <li>Community</li>
            <li>Contact</li>
        </div>

        <div className="hamburger-menu">
            <MenuIcon size={25} />
            
        </div>
    </div>
  )
}