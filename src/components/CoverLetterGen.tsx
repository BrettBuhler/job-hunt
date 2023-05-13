import { useState } from "react"
import getKeyWords from "../services/getKeyWords"
import getCoverLetter from '../services/getCoverLetter'
import ResumeSelect from '../components/ResumeSelect'
import Popup from "./Popup"

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
}

const CoverLetterGen: React.FC<CoverLetterGenProps> = ({skills, resumes}) => {

    const [text, setText] = useState<string>('')
    const [keywords, setKeywords] = useState<string[]>([])
    const [returnText, setReturnText] = useState<string>('')
    const [additions, setAdditions] = useState<string>('')
    const [letter, setLetter] = useState<string>('')
    const [popup, setPopup] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [renderSelect, setRenderSelect] = useState<boolean>(false)
    const [selectedResume, setSelectedResume] = useState<Resume>({name: 'void',text: 'void'})

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
        console.log(overlap)
        return overlap
    }

    const getKeys = () => {
        async function getKeysHelper () {
            try {
                const response = await getKeyWords(text)
                console.log(response)
                let str = response.data.choices[0].text
                setReturnText(str)
            } catch(err){
                console.error(err)
            }
        }
        getKeysHelper()
    }

    const getLetter = () => {
        async function getLetterHelper() {
            try {
                const response = await getCoverLetter(sometext)
                console.log(response)
                console.log(response.data.choices[0])
            } catch (error) {
                console.error(error)
            }
        }
        if (!resumes[0]){
            setMessage('We can\'t write you a cover letter without a resume. Please upload one before writing a letter.')
            return
        }
        let sometext: string
        if (additions.length > 0){
            sometext = 'You are the greatest coverletter writer on earth and I have hired you to write me a cover letter. Think carefully about how the job description matches my skills and resume. Additional information about my skills\n' + additions +'\nMy resume:\n' + resumes[0] + '\nThe job description:\n' + text
        } else {
            sometext = 'You are the greatest coverletter writer on earth and I have hired you to write me a cover letter. You asked for my resume, and the job description.\nHere is my resume:\n' + resumes[0] + '\nHere isthe job description:\n' + text
        }
        //sometext = 'You are the greatest coverletter writer on earth. Write me a cover letter for a job at JimBob Bean Emporium. I have 3 years of experince with kidny bean identification, and a certificanion in bean management from bean.com.'
        getLetterHelper()
        
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
            setRenderSelect(true)
        } else {
            setMessage('You must have a resume uploaded before you write a cover letter')
            setPopup(true)
        }
    }
    return (
        <div>
            <textarea value={text} onChange={handleTextAreaChange}/>
            <button onClick={getKeys}>Get Keywords</button>
            <button onClick={()=>{
                let textToEdit = returnText
                let index = textToEdit.lastIndexOf('\n')
                textToEdit = textToEdit.replace('\n', '')
                console.log(textToEdit.slice(index).split(','))
                setKeywords(textToEdit.slice(index).split(','))
            }}>returntext</button>
            <button onClick={() => getOverlap(keywords)}>
                GET OVERLAP
            </button>
            <button onClick={()=>{
                setAdditions(makeAdditions(getOverlap(keywords)))
                console.log(makeAdditions(getOverlap(keywords)))
            }}>GenSTRING</button>
            <button onClick={()=>{
                getLetter()
            }}>GEN LETTER</button>
            {letter && <div>{letter}</div>}
            <button onClick={()=>{
                handleWrite()
            }}>SELECT RES</button>
            <ResumeSelect resumes={resumes} renderSelect={renderSelect} setRenderSelect={setRenderSelect} setSelectedResume={setSelectedResume} selectedResume={selectedResume}/>
            <Popup message={message} bool={popup} setPopup={setPopup}/>
        </div>
    )
}

export default CoverLetterGen