import { useEffect, useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'


const App = () => {
  const [userName, setUserName] = useState<string>('')
  const [user, setUser] = useState<object>({})
  const [profile, setProfile] = useState<object>({})

  return (
    <LandingPage setUserName={setUserName} user={user} setUser={setUser} profile={profile} setProfile = {setProfile} userName={userName}/>
  );
}

export default App;
