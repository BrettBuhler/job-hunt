import React from 'react'
import '../styles/SideBar.css'

interface MenuItem {
  name: string;
  onClick: () => void;
}

interface SidebarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  menuItems: MenuItem[];
  setRouter: (route: string) => void;
}


const Sidebar: React.FC<SidebarProps> = ({ isMenuOpen, setIsMenuOpen, menuItems, setRouter }) => {
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };
  
  //Listen for page load then get sidebar element. If it has a scroll bar do nothing, else add a border
  window.addEventListener('load', ()=>{
    const sidebar = document.getElementById('sidebar')
  if ((sidebar as any).scrollHeight <= (sidebar as any).clientHeight){
    (sidebar as any).style.borderRight = '2px solid #fff'
  } else {
    (sidebar as any).style.borderRight = 'none'
  }
  })

  return (
    <div className={`sidebar ${isMenuOpen ? 'open' : ''}`} id='sidebar'>
      <button className="close-button" onClick={() => {
          setIsMenuOpen(!isMenuOpen)
        }}>Close</button>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} onClick={item.onClick}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;