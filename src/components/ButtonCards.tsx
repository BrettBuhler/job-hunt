import React from 'react';
import '../styles/ButtonCards.css'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import '@fortawesome/fontawesome-free/css/regular.min.css';
import '@fortawesome/fontawesome-free/css/brands.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

interface ButtonCardsProps {
  items: string[];
  displayItems: object[]
  resumeItems: object[]
  onButtonClick: (item: string) => void
}

function ButtonCards({ items, onButtonClick, displayItems, resumeItems}: ButtonCardsProps) {
  return (
    <div className="button-cards-container">
      {items.map((item, i) => (
        <div className="button-card" key={item}>
          <h3>{item}</h3>
            <div className='edit-icon' onClick={() => onButtonClick(item)}>
                <FontAwesomeIcon icon={faEdit} />
            </div>
            <div className='display-items'>
            {displayItems && item == 'Skills' && displayItems.map(x=><div className='button-item' key={`${item}.${(x as any).name}`}>{(x as any).name}</div>)}
            {resumeItems && item == "Resumes" && resumeItems.map(x=><div className='button-item' key={`${item}.${(x as any).name}`}>{(x as any).name}</div>)}
            </div>
        </div>
      ))}
    </div>
  );
}
// {displayItems[i] && displayItems[i].map(x=><div className='button-item' key={`${item}.${(x as any).name}`}>{(x as any).name}</div>)}
export default ButtonCards;