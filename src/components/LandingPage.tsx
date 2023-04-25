import {useState} from 'react'
import {GoogleLoginButton, FacebookLoginButton, GithubLoginButton} from 'react-social-login-buttons'

/**
 * The setUserName function is passed to the LandingPage component. Once users have loged in,
 * setUserName is called with the appropriate google/facebook/github login
 */
interface LandingPageProps {
    setUserName: (name: string) => void
}

const handleGoogleLogin = () => {
    console.log('google')
}

const handleFacebookLogin = () => {
    console.log('facebook')
}

const handleGithubLogin = () => {
    console.log('github')
}

const handleEmailSignup = (event: React.FormEvent) => {
    console.log(event)
}

const LandingPage: React.FC<LandingPageProps> = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='signup-card'>
            <h1>Job Hunt</h1>
            <p>Generate custom resumes based off your expereince and job descriptions</p>
            <form onSubmit={handleEmailSignup}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' autoComplete='username'></input>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' autoComplete='current-password'></input>
                <input type="submit" value={'LogIn / Create'}></input>
            </form>
            <GoogleLoginButton onClick={handleGoogleLogin}/>
            <FacebookLoginButton onClick={handleFacebookLogin}/>
            <GithubLoginButton onClick={handleGithubLogin}/>
        </div>
    )
}

export default LandingPage