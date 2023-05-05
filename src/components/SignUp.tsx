import { useState } from 'react'
import Popup from './Popup'
import '../styles/signup.css'
import '../styles/popup.css'
import handleSignUp from '../services/handleSignUp'

const REACT_APP_BASE_URL: string = process.env.REACT_APP_BASE_URL || ''

interface SignUpProps {
    setUserName: (str:string) => void;
    setUserToken: (str:string) => void;
}
const SignUp: React.FC<SignUpProps> = ({setUserName, setUserToken}) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [message, setMessage] = useState('')
    const [popup, setPopup] = useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(validateInputs(email, password, confirmPassword)){
            //submit
            const response = handleSignUp(email, password)
            .then((res) => {
                if (res.data){
                    localStorage.setItem('token', res.data)
                    setUserName(email)
                    setUserToken(res.data)
                } else {
                    setMessage(`A user with that email is already signed up. `)
                    setPopup(true)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        } else {
            setMessage('Invalid Input. A valid email is required, and your password must be at least 8 characters long and contain one capital letter.')
            setPopup(true)
        }
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value)
    }
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value)
    }
    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setConfirmPassword(event.target.value)
    }

    const validateInputs = (userEmail: string, userPassword: string, userPassword2: string): boolean => {
        let isValid = true
        //Check for a valid email adress
        const emailRegex = /\S+@\S+\.\S+/
        if (!emailRegex.test(userEmail)){
            isValid = false
        } else {
            //Check for valid password
            const passwordRegex = /^(?=.*\d).{8,}$/
            if(!passwordRegex.test(userPassword)){
                isValid = false
            //check to see if password and confirmPassword match
            } else if (userPassword !== userPassword2){
                isValid = false
            }
        }
        return isValid
    }

    return (
        <div>
            <Popup setPopup={setPopup} bool={popup} message={message}></Popup>
        <div className="sign-up">
            <h1>Job-Hunt</h1>
            <br/>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <label>
                    Confirm Password:
                    <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </label>
                <br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
        </div>
    )
}

export default SignUp