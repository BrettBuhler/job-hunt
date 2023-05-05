import { useEffect, useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage'
import SignUp from './components/SignUp';
import verifyToken from './services/verifyToken';
import Dashboard from './components/Dashboard';


const App = () => {
  const [userToken, setUserToken] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [user, setUser] = useState<object>({})
  const [profile, setProfile] = useState<object>({})

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
      <Dashboard setUserName={setUserName} setUserToken={setUserToken} setProfile={setProfile} setUser={setUser}></Dashboard>
    )
  } else {
    return (
      <LandingPage setUserName={setUserName} user={user} setUser={setUser} profile={profile} setProfile = {setProfile} userName={userName} setUserToken= {setUserToken}/>
    )
  }
}
//<SignUp setUserName={setUserName} setUserToken={setUserToken}></SignUp>
//<LandingPage setUserName={setUserName} user={user} setUser={setUser} profile={profile} setProfile = {setProfile} userName={userName} setUserToken= {setUserToken}/>
export default App;
