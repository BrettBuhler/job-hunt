import {useState, useEffect} from 'react'
import {GoogleLoginButton, FacebookLoginButton, GithubLoginButton} from 'react-social-login-buttons'
import {googleLogout, useGoogleLogin} from '@react-oauth/google'
import axios from 'axios'
import Popup from './Popup'
import '../styles/popup.css'
import '../styles/signupa.css'
import generateToken from '../services/generateToken'
import handleSignUp from '../services/handleSignUp'
import handleLogin from '../services/handleLogin'


/**
 * A landing page component that allows users to log in or sign up using their email, 
 * Google, Facebook, or Github accounts. Once logged in, the user's profile information 
 * is retrieved using the Google OAuth API and displayed on the page. The user can also 
 * log out, which clears their profile information and sets the user name to an empty string.
 * 
 * TODO: Implement facebook and Github login
 */
interface LandingPageProps {
    userName: string
    setUserName: (name: string) => void
    user: object,
    setUser: (aUser: object) => void
    profile: object
    setProfile: (aProfile: object) => void
    setUserToken: (str: string) => void
    setSignUp: (bool: boolean) => void
    setUserInfo: (aUser: object) => void
}


const LandingPage: React.FC<LandingPageProps> = ({ setUser, setProfile, user, profile , setUserName, userName, setUserToken, setSignUp, setUserInfo}) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [popup, setPopup] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
  



  /**
   * ToDo: Check database for user email, if it exists, check if passowrds match, if they do LOGIN, if they don't PASSWORD ERROR, if the email
   * does not exist, take user to confiermantion screen + make account
   * @param event Submit event
   */


    const generateRandomPassword = (length: number): string => {
      const chars:string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*'
      let password:string = ''
      for (let i = 0; i< length; i++){
        const index = Math.floor(Math.random() * chars.length)
        password += chars[index]
      }
      return password
    }

    const handleFacebookLogin = () => {
      console.log('facebook')
      setMessage('Facebook login is under construction. Please use Google login or create an account with your email / password.')
      setPopup(true)
    }
  
    const handleGithubLogin = () => {
      console.log('github')
      setMessage('Github login is under construction. Please use Google login or create an account with your email / password.')
      setPopup(true)
    }

    const handleEmailSignup = (event: React.FormEvent) => {
      event.preventDefault()

      async function loginForm () {
        try {
          const response = await handleLogin(email, password)
          if (response.data){
            setUserName(email)
            setUserToken(response.data.token)
            setUserInfo(response.data.user)
            localStorage.setItem('token', response.data.token)
          } else {
            setEmail('')
            setPassword('')
            setMessage('Invalid Email or Password')
            setPopup(true)
          }
        } catch (error){
          console.error(error)
        }
      }
      loginForm()
    }

    const login = useGoogleLogin({
      onSuccess: (codeResponse) => {
        setUser(codeResponse)
      },
      onError: (error) => console.log('Login Failed:', error)
    })
    
      const logOut = () => {
        googleLogout()
        setProfile({})
        setUserName('')
        setUserToken('')
      }
    
      useEffect(()=>{
        if ((user as any).access_token) {
          axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${(user as any).access_token}`,{
            headers: {
              Authorization: `Bearer ${(user as any).access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res:object) => {
            setProfile((res as any).data)
            setUserName((res as any).data.email)

            async function fetchData(){
              try {
                const response = await generateToken((res as any).data.email)
                console.log(response)
                //set userToken
                setUserToken(response.token)
                localStorage.setItem('token', response.token)
                const signUpPassword = generateRandomPassword(10)
                // attempt to sign up as a new user (nothing happens if user already exists)
                handleSignUp((res as any).data.email, signUpPassword)
              } catch(error){
                console.log(error)
              }
            }
            //GENERATE TOKEN
            fetchData()
          })
          .catch((err:object) => console.log(err))
        }
      },[ user ])


    return (
        <div className="landingPage">
          <Popup message={message} bool={popup} setPopup={setPopup}></Popup>
            <div className='signup-card'>
                <h1>Job Hunt</h1>
                <p>Generate custom resumes based off your expereince and job descriptions</p>
                <form onSubmit={handleEmailSignup}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' autoComplete='username'></input>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' autoComplete='current-password'></input>
                    <input type="submit" value={'LogIn'}></input>
                </form>
                <a onClick={()=>{setSignUp(true)}} className='sign-up-a'>sign up with email and a password</a>
                <GoogleLoginButton onClick={() => login()}/>
                <FacebookLoginButton onClick={handleFacebookLogin}/>
                <GithubLoginButton onClick={handleGithubLogin}/>
            </div>
        </div>
    )
}

export default LandingPage