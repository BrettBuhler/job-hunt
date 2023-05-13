import axios from 'axios'

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL

async function getCoverLetter (text: string) {
    try{
        const response = await axios.post(`${REACT_APP_BASE_URL}/getcoverletter`, {text: text})
        return response
    } catch (error: any) {
        return error
    }
}

export default getCoverLetter
