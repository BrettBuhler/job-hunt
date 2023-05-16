import axios from 'axios'

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL

async function generateToken (email: string) {
    try {
        const response = await axios.post(`${REACT_APP_BASE_URL}/token`, {email: email})
        return response.data
    } catch (error){
        console.log(error)
    }
}

export default generateToken