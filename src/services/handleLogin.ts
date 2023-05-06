import axios from 'axios'

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL

async function handleLogin(userEmail: string, userPassword: string) {
    const userObject:object = {email: userEmail, password: userPassword}
    try {
        const response = await axios.post(`${REACT_APP_BASE_URL}/login`, userObject)
        return response
    } catch(error: any) {
        return error
    }
}

export default handleLogin