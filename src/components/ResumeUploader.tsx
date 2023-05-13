import { useState } from "react"
import Popup from "./Popup"
import updateResume from "../services/updateResume"
import getUser from "../services/getUser"


type Resume = {
    name: string
    text: string
}

interface ResumeUploaderProps {
    resumes: Resume[]
    userName: string
    setResumes: (resumeArray: Resume[]) => void
    setUserInfo: (aUser: object) => void
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({resumes, setResumes, setUserInfo, userName}) => {
    const [selectedText, setSelectedText] = useState('');
    const [resumeName, setResumeName] = useState('')
    const [popup, setPopup] = useState(false)

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setResumeName(event.target.value)
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSelectedText(event.target.value)
    }

    const handleDelete = (name: string) => {
        let newResumes = resumes.filter((item)=>item.name !== name)
        setResumes(newResumes)
        async function handleDeleteHelper () {
            try {
                const response = await updateResume(userName, newResumes)
                if (response.email){
                    const getUserResponse = await getUser(userName)
                    setUserInfo(getUserResponse)
                }
            } catch (error){
                console.error(error)
            }
        }
        handleDeleteHelper()
    }

    const handleUpload = () => {
        const newResume = {name: resumeName, text: selectedText}
        if (selectedText !== '' && resumeName !== ''){
            if (resumes){
                setResumes([...resumes, newResume])
            } else {
                setResumes([newResume])
            }
            setResumeName('')
            setSelectedText('')
        } else {
            setPopup(true)
            return
        }
        async function handleUploadHelper () {
            let newResumes: Resume[]
            if (resumes){
                newResumes = [...resumes, newResume]
            } else {
                newResumes = [newResume]
            }
            try {
                const response = await updateResume(userName, newResumes)
                const getUserResponse = await getUser(userName)
                console.log('getuser', getUserResponse)
                setUserInfo(getUserResponse)
            } catch (error) {
                console.error(error)
            }
        }
        handleUploadHelper()
    }

    return(
        <div className="resume-uploader-body">
            <Popup message="Please include a resume name and resume body before saving" setPopup={setPopup} bool={popup}/>
            <div className="resume-upload-form">
                <h2 className="resume-uploader-title">My Resumes</h2>
                <input type='text' onChange={handleNameChange} value={resumeName} placeholder="Resume Name" />
                <textarea onChange={handleTextChange} value={selectedText} className="resume-uploader-text-area"/>

                <button onClick={handleUpload} className="resume-uploader-upload-button">Upload</button>
            </div>
            <div className="my-resumes">
                <h2 className="resume-uploader-title">Existing Resumes</h2>
                <ul className="resume-ul">
                {resumes && resumes.map((resume, i) => (
                    <li key={`resume_${i}`} className="resume-li">
                        <span className="resume-item">{resume.name}</span>
                        <button onClick={() => handleDelete(resume.name)} className="resume-delete-button">Delete</button>
                    </li>
                    ))}
                </ul>
            </div>
    </div>
    )
}

export default ResumeUploader