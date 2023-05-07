import { useState, useEffect } from "react"
import { googleLogout } from "@react-oauth/google"
import TopBar from "./TopBar"
import Sidebar from "./SideBar"
import ButtonCards from './ButtonCards'
import Skill from './Skill'
import Skills from "./Skills"

interface DashboardProps {
    userName: string
    setUserName: (str: string) => void
    setUserToken: (str: string) => void
    setProfile: (item: object) => void
    setUser: (item: object) => void
}

const Dashboard: React.FC<DashboardProps>=({setUserName, setUserToken, setProfile, setUser, userName}) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [skills, setSkills] = useState<{ name: string, keywords: string[], description: string }[]>([])

    useEffect(()=>{
        setSkills([{name: 'React', keywords: ['one', 'two', 'three'], description: 'This is a skill'},{name: 'JavaScript', keywords: ['one', 'two', 'three'], description: 'This is a skill'}])
    },[])

    const handleSkillsChange = (newSkills: {name: string, keywords: string[], description: string}[]) => {
        setSkills(newSkills)
        console.log(skills)
    }

    //Menu items for side bar
    const menuItems = [
        {name: 'About', onClick: ()=>console.log('Item 1')},
        {name: 'Skills', onClick: ()=>console.log('Item 1')},
        {name: 'Projects', onClick: ()=>console.log('Item 2')},
        {name: 'Work Experience', onClick: ()=>console.log('Item 3')},
        {name: 'Education', onClick: ()=>console.log('Item 3')},
        {name: 'Resume', onClick: ()=>console.log('Item 1')}
    ]

    const items = [
        'About',
        'Skills',
        'Projects',
        'Work Expereince',
        'Resume'
    ]

    

    const onButtonClick: (str: string) => void = (item) => {
        console.log(item)
    }

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
        <TopBar onLogout={logOut} siteName="Job Hunt" isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}></TopBar>
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} menuItems={menuItems}></Sidebar>
        <Skills setSkills={setSkills} skills={skills}/>
    </div>
    )
}

export default Dashboard

//<ButtonCards onButtonClick={onButtonClick} items={items}></ButtonCards>