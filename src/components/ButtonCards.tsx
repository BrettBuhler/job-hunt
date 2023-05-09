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
  displayItems: object[];
  onButtonClick: (item: string) => void;
}

function ButtonCards({ items, onButtonClick, displayItems}: ButtonCardsProps) {
  return (
    <div className="button-cards-container">
      {items.map((item) => (
        <div className="button-card" key={item}>
          <h3>{item}</h3>
            <div className='edit-icon' onClick={() => onButtonClick(item)}>
                <FontAwesomeIcon icon={faEdit} />
            </div>
            <div className='display-items'>
              {displayItems && displayItems.map(x=><div className='button-item' key={`${item}.${(x as any).name}`}>{(x as any).name}</div>)}
            </div>
        </div>
      ))}
    </div>
  );
}

export default ButtonCards;