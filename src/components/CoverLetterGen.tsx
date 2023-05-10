import { useState } from "react"
import getKeyWords from "../services/getKeyWords"
interface CoverLetterGenProps {

}

const CoverLetterGen: React.FC<CoverLetterGenProps> = ({}) => {

    const [text, setText] = useState<string>('')
    const [keywords, setKeywords] = useState<string[]>([])
    const [returnText, setReturnText] = useState<string>('')

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value)
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
    return (
        <div>
            <textarea value={text} onChange={handleTextAreaChange}/>
            <button onClick={getKeys}>Get Keywords</button>
            <button onClick={()=>console.log(returnText)}>returntext</button>
        </div>
    )
}

export default CoverLetterGen