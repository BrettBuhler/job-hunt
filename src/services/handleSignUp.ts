import axios from 'axios'

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL

async function handleSignUp(userEmail: string, userPassword: string) {
    const userObject = {email: userEmail, password: userPassword}
    try{
        const response = await axios.post(`${REACT_APP_BASE_URL}/signup`, userObject, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error: any) {
        return error
    }
}

export default handleSignUp