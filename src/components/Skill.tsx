import React from 'react';
import '../styles/Skill.css';

interface SkillDivProps {
  name: string;
  options: string[];
  selected: boolean;
  onClick: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SkillDiv: React.FC<SkillDivProps> = ({ name, options, selected, onClick, onChange }) => {
  return (
    <div className={`skill ${selected ? 'selected' : ''}`} onClick={onClick}>
      <h3 className='skill-name'>{name}</h3>
      <div className='skill-options'>
        {options.map((option) => (
          <label key={option} className='skill-option'>
            <input type='checkbox' name={option} value={option} onChange={onChange} />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SkillDiv;