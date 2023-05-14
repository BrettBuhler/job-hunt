import { useState } from "react"
import getKeyWords from "../services/getKeyWords"
import getCoverLetter from '../services/getCoverLetter'
import ResumeSelect from '../components/ResumeSelect'
import Popup from "./Popup"
import LoadingScreen from "./LoadingScreen"

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
    const [letter, setLetter] = useState<string>('')
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

    async function getLetter (additions: string) {
        let sometext: string
        if (additions.length > 0){
            sometext = 'You are the greatest coverletter writer on earth and I have hired you to write me a cover letter. Think carefully about how the job description matches my skills and resume. Additional information about my skills\n' + additions +'\nMy resume:\n' + selectedResume.text + '\nThe job description:\n' + text
        } else {
            sometext = 'You are the greatest coverletter writer on earth and I have hired you to write me a cover letter. You asked for my resume, and the job description.\nHere is my resume:\n' + selectedResume.text + '\nHere isthe job description:\n' + text
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
            setRenderSelect(true)
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
            console.log(str.slice(index).split(','))
            const keywords = str.slice(index).split(',')
            const overlap = getOverlap(keywords)
            console.log('overlap is,', overlap)
            const additions = makeAdditions(overlap)
            const getLetterResponse = await getLetter(additions)
            console.log('I am here', getLetterResponse)
            console.log(getLetterResponse)
            if (getLetterResponse.data.choices[0].text){
                let resText = getLetterResponse.data.choices[0].text
                resText = resText.slice(resText.indexOf('Dear'))
                resText += '\n\nThese are the keywords extracted from the job descripton, consider tailoring your resume to include any you can:\n-' + keywords.join('\n-')
                setText(resText)
                //MAKE LETTER PAGE
            } else {
                //ERROR MESSAGE
            }
            setDoneLoading(true)
        } catch(error) {
            console.error(error)
        }
    }

    if(doneLoading){
        setLoading(false)
        setDoneLoading(false)
    }

    return (
        <div>
            <h1 className="write-my-coverletter-title">Write my CoverLetter</h1>
            <p className="write-my-coverletter-p">Welcome to Job Hunt. We make it easy for you to create a professional cover letter tailored to the job you want. Just input the job description in the text field and click start. Our system will take care of the rest. Try us today and get one step closer to your dream job.</p>
            <textarea value={text} onChange={handleTextAreaChange} className="job-description"/>
            <button className="start-button" onClick={()=>setRenderSelect(true)}>Start</button>
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
            {letter && <div>{letter}</div>}
            <button onClick={()=>{
                handleWrite()
            }}>SELECT RES</button>
            <ResumeSelect resumes={resumes} renderSelect={renderSelect} setRenderSelect={setRenderSelect} setSelectedResume={setSelectedResume} selectedResume={selectedResume} chatGPT={chatGPT} setLoading={setLoading}/>
            <Popup message={message} bool={popup} setPopup={setPopup}/>
            <LoadingScreen loading={loading}/>
            <button onClick={()=>{setLoading(true)}}>LOAD</button>
        </div>
    )
}

export default CoverLetterGen