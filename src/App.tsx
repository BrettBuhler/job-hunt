import { useEffect, useState } from 'react';
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

  useEffect(()=>{
    const token: any = localStorage.getItem('token')
    async function fetchData() {
      try{
        const response = await verifyToken(token)
        if (response.email){
          setUserName(response.email)
        }
      } catch(error) {
        console.log('invalid token', error)
        throw error
      }
    }
    if (token){
      fetchData()
    }
  },[])

  if (userName){
    return (
      <Dashboard setUserName={setUserName} setUserToken={setUserToken} setProfile={setProfile} setUser={setUser} userName={userName}></Dashboard>
    )
  } else if (!signUp) {
    return (
      <LandingPage setUserName={setUserName} user={user} setUser={setUser} profile={profile} setProfile = {setProfile} userName={userName} setUserToken= {setUserToken} setSignUp={setSignUp}/>
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
