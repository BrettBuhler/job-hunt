import { useState } from "react"
import getKeyWords from "../services/getKeyWords"

type Skill = {
    name: string;
    keywords: string[];
    description: string;
  }

interface CoverLetterGenProps {
    skills: Skill[]
}

const CoverLetterGen: React.FC<CoverLetterGenProps> = ({skills}) => {

    const [text, setText] = useState<string>('')
    const [keywords, setKeywords] = useState<string[]>([])
    const [returnText, setReturnText] = useState<string>('')
    const [additions, setAdditions] = useState<string>('')

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value)
    }
    //todo make resume
    const resume = ""

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

    const makeAdditions = (mySkills: Skill[]):string => {
        let res = ''
        for (let i = 0; i < mySkills.length; i++){
            if (i == 5) break
            if (res !== '') res += '\n'
            res += `My background in ${mySkills[i].name} is from the following description. ${mySkills[i].description}`
        }
        return res
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
        </div>
    )
}

export default CoverLetterGen