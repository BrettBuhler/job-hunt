import axios from "axios"

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL

async function verifyToken (token: string) {
    try {
        const response = await axios.post(`${REACT_APP_BASE_URL}/verify`, {token: token})
        return response.data
    } catch(error){
        throw error
    }
}

export default verifyToken