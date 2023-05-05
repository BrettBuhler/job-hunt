import { googleLogout } from "@react-oauth/google"

interface DashboardProps {
    setUserName: (str: string) => void
    setUserToken: (str: string) => void
    setProfile: (item: object) => void
    setUser: (item: object) => void
}

const Dashboard: React.FC<DashboardProps>=({setUserName, setUserToken, setProfile, setUser}) => {

    const logOut = () => {
        googleLogout()
        setProfile({})
        setUserName('')
        setUserToken('')
        setUser({})
        localStorage.clear()
      }

    return (
    <div>
        <h1>Hello world</h1>
        <button onClick={logOut}>LOG OUT</button>
    </div>
    )
}

export default Dashboard