import { useState } from 'react'
import '../styles/ResumeSelect.css'

interface Resume {
    name: string
    text: string
}

interface ResumeSelectProps {
    resumes: Resume[]
    renderSelect: boolean
    setRenderSelect: (bool: boolean) => void
    setSelectedResume: (resume: Resume) => void
    chatGPT: () => void
    selectedResume: Resume
    setLoading: (bool:boolean) => void
}

const ResumeSelect: React.FC<ResumeSelectProps> = ({resumes, setSelectedResume, renderSelect, setRenderSelect, selectedResume, chatGPT, setLoading}) => {

    const handleSelectResume = (resume: Resume) => {
        setSelectedResume(resume)
    }

    const startWriting = () => {
        chatGPT()
    }

    return (
        <div>
            {renderSelect && <div className='resume-select-popup'>
            <div className='resume-popup-container'>
            <h2>Select a Resume</h2>
            <div className='resume-radios'>
                {resumes.map((x)=>(
                    <div key={`${x.name}-resume-key`} className='resume-radios-div' onClick={()=>handleSelectResume(x)}>
                        <div className='resume-input-text'>{x.name}</div>
                        <input
                        type = 'radio'
                        id={x.name}
                        name="resume"
                        value={x.name}
                        checked={selectedResume === x}
                        onChange={()=>handleSelectResume(x)}
                        className='resume-radios-input'
                        >
                        </input>
                    </div>
                ))}
            </div>
            <div className='resume-button-container'>
                <button className='resume-button' onClick={()=>{
                    setLoading(true)
                    chatGPT()
                    setRenderSelect(false)
                }}>Continue</button>
                <button className='resume-button' onClick={()=>{
                    setSelectedResume({name: 'void', text: 'void'})
                    setRenderSelect(false)
                }}>Back</button>
            </div>
            </div>
        </div>}
        </div>
    )
}

export default ResumeSelect