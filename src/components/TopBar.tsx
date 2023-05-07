import { useState } from 'react'
import Hamburger from 'hamburger-react'
import '../styles/TopBar.css'

interface TopBarProps {
    siteName: string;
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
    onLogout: () => void;
  }
  
  const TopBar: React.FC<TopBarProps> = ({ siteName, isMenuOpen, setIsMenuOpen, onLogout }) => {
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    return (
      <div className="topbar">
        <div className="topbar-left">
          <Hamburger toggled={isMenuOpen} toggle={toggleMenu} />
        </div>
        <div className="topbar-center">
          <h1 className='site-name'>{siteName}</h1>
        </div>
        <div className="topbar-right">
          <button onClick={onLogout} className='logout-button'>Log Out</button>
        </div>
      </div>
    );
  };
  
  export default TopBar;