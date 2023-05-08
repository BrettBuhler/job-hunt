import { useState } from "react"
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import '@fortawesome/fontawesome-free/css/regular.min.css';
import '@fortawesome/fontawesome-free/css/brands.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { faMinimize } from '@fortawesome/free-solid-svg-icons';


interface SkillExpandProps {
    description: string
    keywords: string[]
}

const SkillExpand: React.FC<SkillExpandProps> = ({description, keywords}) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    if (!isOpen){
        return (
            <div className="skill-expand-button" onClick={()=>setIsOpen(true)}>
                <FontAwesomeIcon icon={faExpand} />
            </div>
        )
    } else {
        return (
            <div className='skill-list-popup'>
                <p className="skills-description">Description: {description}</p>
                <ul className="skills-keywords">
                    {keywords.map((keyword, i) => (
                        <li key={i} className="skills-keyword">
                            {keyword}
                        </li>
                    ))}
                </ul>
                <div className="skill-expand-button" onClick={()=>setIsOpen(false)}>
                    <FontAwesomeIcon icon={faMinimize} />
                </div>
            </div>
        )
    }
}

export default SkillExpand