import axios from 'axios'

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL

async function getUser(userEmail: string) {
    try {
        const response = await axios.get(`${REACT_APP_BASE_URL}/getinfo?email=${userEmail}`)
        return response.data
    } catch(error: any) {
        return error
    }
}

export default getUser