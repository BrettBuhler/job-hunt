import { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage'

const App = () => {
  const [userName, setUserName] = useState('guest')
  return (
    <LandingPage setUserName={setUserName}/>
  );
}

export default App;
