import { useState } from "react"
import getKeyWords from "../services/getKeyWords"
import getCoverLetter from '../services/getCoverLetter'
import ResumeSelect from '../components/ResumeSelect'
import Popup from "./Popup"
import LoadingScreen from "./LoadingScreen"
import LetterPage from "./LetterPage"
import '../styles/CoverLetterGen.css'

type Skill = {
    name: string;
    keywords: string[];
    description: string;
  }

  type Resume = {
    name: string
    text: string
}

interface CoverLetterGenProps {
    skills: Skill[]
    resumes: Resume[]
    setRouter: (route: string) => void
}

const CoverLetterGen: React.FC<CoverLetterGenProps> = ({skills, resumes, setRouter}) => {

    const [text, setText] = useState<string>('')
    const [returnText, setReturnText] = useState<string>('')
    const [popup, setPopup] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [renderSelect, setRenderSelect] = useState<boolean>(false)
    const [selectedResume, setSelectedResume] = useState<Resume>({name: 'void',text: 'void'})
    const [loading, setLoading] = useState<boolean>(false)
    const [doneLoading, setDoneLoading] = useState<boolean>(false)

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value)
    }

    const getOverlap = (jobKeywords: string[]) => {
        const overlap = []
        for (let i = 0; i < jobKeywords.length; i++){
            for (let j = 0; j < skills.length; j++){
                if (jobKeywords[i].toLocaleLowerCase().includes(skills[j].name.toLocaleLowerCase())){
                    overlap.push(skills[j])
                    continue
                } else {
                    for (let k = 0; k < skills[j].keywords.length; k++){
                        if (jobKeywords[i].toLocaleLowerCase().includes(skills[j].keywords[k].toLocaleLowerCase())){
                            overlap.push(skills[j])
                            continue
                        }
                    }
                }
            }
        }
        return overlap
    }

    async function getLetter (additions: string) {
        let sometext: string
        if (additions.length > 0){
            sometext = 'You are the greatest coverletter writer on earth and I have hired you to write me a cover letter. Think carefully about how the job description matches my skills and resume. Additional information about my skills\n' + additions +'Focus on how these skills add value and meet the job requirements.\nMy resume:\n' + selectedResume.text + '\nThe job description:\n' + text
        } else {
            sometext = 'You are the greatest coverletter writer on earth and I have hired you to write me a cover letter. You asked for my resume, and the job description. Think carefully about how the job description matches my skills and resume.\nHere is my resume:\n' + selectedResume.text + '\nHere isthe job description:\n' + text
        }
        try {
            const response = await getCoverLetter(sometext)
            return (response)
        } catch (error) {
            console.error(error)
            return "error generating coverletter"
        }
    }

    const makeAdditions = (mySkills: Skill[]):string => {
        let res = ''
        for (let i = 0; i < mySkills.length; i++){
            if (i == 5) break
            if (res !== '') res += '\n'
            res += `My background in ${mySkills[i].name} is from the following description. ${mySkills[i].description}`
        }
        return res
    }

    const handleWrite = ()=>{
        if (resumes){
            if (text){
                setRenderSelect(true)
            } else {
                setMessage('You need to input a job description before you write a cover letter')
                setPopup(true)
            }
        } else {
            setMessage('You must have a resume uploaded before you write a cover letter')
            setPopup(true)
        }
    }

    async function chatGPT () {
        setLoading(true)
        try{
            const getKeysResponse = await getKeyWords(text)
            let str = getKeysResponse.data.choices[0].text
            let index = str.lastIndexOf('\n')
            str = str.replace('\n', '')
            const keywords = str.slice(index).split(',')
            const overlap = getOverlap(keywords)
            const additions = makeAdditions(overlap)
            const getLetterResponse = await getLetter(additions)
            if (getLetterResponse.data.choices[0].text){
                let resText = getLetterResponse.data.choices[0].text
                resText = resText.slice(resText.indexOf('Dear'))
                resText += '\n\nThese are the keywords extracted from the job description, consider tailoring your resume to include any you can:\n' + keywords.join(', ')
                setReturnText(resText)
                //MAKE LETTER PAGE
            } else {
                setMessage("Unable to write coverletter. Consider shortening the job description as OpenAI has a maximum text length it can process.")
                setPopup(true)
            }   
            setDoneLoading(true)
        } catch(error) {
            console.error(error)
            setMessage("Unable to write coverletter. Consider shortening the job description as OpenAI has a maximum text length it can process.")
            setPopup(true)
            setDoneLoading(true)
        }
    }

    if(doneLoading){
        setLoading(false)
        setDoneLoading(false)
    }

    return (
        <div className="cover-letter-container">
            <div className="cover-letter-div">
                <div className="write-my-coverletter-title-container">
                    <h1 className="write-my-coverletter-title">Write my Cover Letter</h1>
                </div>
                <p className="write-my-coverletter-p">Welcome to Job Hunt. We make it easy for you to create a professional cover letter tailored to the job you want. If you've already saved your skills and resume, just input the job description in the text field and click start. Our system will take care of the rest. Try us today and get one step closer to your dream job.</p>
                <textarea value={text} onChange={handleTextAreaChange} className="job-description" placeholder="Input job description:" />
                <div className="write-my-coverletter-button-container">
                    <button className="write-my-coverletter-button" onClick={()=>setRouter('Home')}>Home</button>
                    <button className="write-my-coverletter-button" onClick={()=>{handleWrite()}}>Start</button>
                </div>
                <ResumeSelect resumes={resumes} renderSelect={renderSelect} setRenderSelect={setRenderSelect} setSelectedResume={setSelectedResume} selectedResume={selectedResume} chatGPT={chatGPT} setLoading={setLoading}/>
                <Popup message={message} bool={popup} setPopup={setPopup}/>
                <LoadingScreen loading={loading}/>
                <LetterPage returnText={returnText} onClose={()=>setRouter('Home')}/>
            </div>
        </div>
    )
}

export default CoverLetterGen