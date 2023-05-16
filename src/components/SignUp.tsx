import { useState } from 'react'
import Popup from './Popup'
import '../styles/signup.css'
import '../styles/popup.css'
import handleSignUp from '../services/handleSignUp'

interface SignUpProps {
    setUserName: (str:string) => void;
    setSignUp: (bool: boolean) => void;
}
const SignUp: React.FC<SignUpProps> = ({setUserName, setSignUp}) => {
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
                    setSignUp(false)
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
        <div className='landingPage'>
            <Popup setPopup={setPopup} bool={popup} message={message}></Popup>
        <div className="signup-card">
            <div className='sighup-title-div'>
                <h1 className='signup-h1'>Job Hunt</h1>
            </div>
            <p className='sign-up-p'>Sign up with your email and password. Passwords must be 8 characters long and contain a capital letter</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="email" value={email} onChange={handleEmailChange} placeholder='Email'/>
                </label>
                <label>
                    <input type="password" value={password} onChange={handlePasswordChange} placeholder='Password'/>
                </label>
                <label>
                    <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder='Confirm Password'/>
                </label>
                <div className='border-bottom'></div>
                <button type="submit" className='sign-up-submit'>Sign Up</button>
            </form>
            <button className='sign-up-submit' onClick={()=>setSignUp(false)}>Back</button>
        </div>
        </div>
    )
}

export default SignUp