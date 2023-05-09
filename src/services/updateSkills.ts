import axios from 'axios'

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL

async function updateSkills (userEmail: string, userSkills: object[]) {
    const userObject: object = { email: userEmail, skills: userSkills }
    try {
        const response = await axios.put(`${REACT_APP_BASE_URL}/updateuser`, userObject)
        return response
    } catch (error: any){
        return error
    }
}

export default updateSkills