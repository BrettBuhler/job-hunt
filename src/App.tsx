import { useEffect, useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage'
import SignUp from './components/SignUp';
import axios from 'axios'


const App = () => {
  const [userName, setUserName] = useState<string>('')
  const [user, setUser] = useState<object>({})
  const [profile, setProfile] = useState<object>({})

  // Check if user has a token
  if (localStorage.getItem('token')) {
  // Do something if token exists
  console.log('User has a token');
} else {
  // Do something if token does not exist
  console.log('User does not have a token');
}

  return (
    <div>
      <SignUp></SignUp>
    </div>
  );
}
//<LandingPage setUserName={setUserName} user={user} setUser={setUser} profile={profile} setProfile = {setProfile} userName={userName}/>
export default App;
