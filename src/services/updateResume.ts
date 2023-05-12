import axios from 'axios'

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL

async function updateResume (userEmail: string, userResumes: object[]){
    const userObject = {email: userEmail, resumes: userResumes}
    try {
        const response = await axios.put(`${REACT_APP_BASE_URL}/updateuser`, userObject)
        return response.data.response.updateUser.value
    } catch (error){
        return error
    }
}

export default updateResume