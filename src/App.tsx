import { useEffect, useState, useRef } from 'react';
import LandingPage from './components/LandingPage'
import SignUp from './components/SignUp';
import verifyToken from './services/verifyToken';
import Dashboard from './components/Dashboard';


const App = () => {
  const [userToken, setUserToken] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [user, setUser] = useState<object>({})
  const [profile, setProfile] = useState<object>({})
  const [signUp, setSignUp] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<object>({})

  const effectRan = useRef(false)

  useEffect(()=>{
    const token: any = localStorage.getItem('token')
    async function fetchData() {
      try{
        const response = await verifyToken(token)
        if (response.email){
          if (response.email != userName){
            setUserName(response.email)
          }
        }
      } catch(error) {
        console.log('invalid token', error)
        throw error
      }
    }
    if (effectRan.current === false){
    if (token){
      fetchData()
    }
    return () => {
      console.log('unmounted')
      effectRan.current = true
    }
    }
  },[])

  if (userName){
    return (
      <Dashboard setUserName={setUserName} setUserToken={setUserToken} setProfile={setProfile} setUser={setUser} userName={userName} userInfo={userInfo} setUserInfo={setUserInfo}></Dashboard>
    )
  } else if (!signUp) {
    return (
      <LandingPage setUserName={setUserName} user={user} setUser={setUser} profile={profile} setProfile = {setProfile} userName={userName} setUserToken= {setUserToken} setSignUp={setSignUp} setUserInfo={setUserInfo}/>
    )
  } else {
    return (
      <SignUp setUserName={setUserName} setUserToken={setUserToken} setSignUp={setSignUp}></SignUp>
    )
  }
}
//<SignUp setUserName={setUserName} setUserToken={setUserToken}></SignUp>
//<LandingPage setUserName={setUserName} user={user} setUser={setUser} profile={profile} setProfile = {setProfile} userName={userName} setUserToken= {setUserToken}/>
export default App;
