import React from 'react'
import '../styles/LetterPage.css'

type LetterPageProps = {
  returnText: string
  onClose: () => void
}

const LetterPage: React.FC<LetterPageProps> = ({ returnText, onClose }) => {

    let displayText: string[] = returnText.split('\n').filter((x)=>x.replace(/ /g, "")!== '')
    displayText = displayText.map(x=>x.replace(/\s+(\.)/g, '.'))
    displayText = displayText.map(x=>x.replace(/\s+(\,)/g, ','))
    if (returnText){
        return (
            <div className="letter-page-popup-container">
              <div className="letter-page">
                <div className="leter-page-container">
                  <h2 className="letter-page-title">Cover Letter</h2>
                </div>
                <div className="letter-page-div">
                      {displayText.map((x, i)=><p key={`dispay-text-p-${i}`}>{displayText[i]}</p>)}
                </div>
                <div className="letter-page-button-container">
                    <button className="letter-page-button" onClick={onClose}>
                        Done
                    </button>
                </div>
              </div>
            </div>
          );
    }
    return null
}

export default LetterPage