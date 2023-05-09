import { useState, useEffect, useRef } from "react"
import { googleLogout } from "@react-oauth/google"
import TopBar from "./TopBar"
import Sidebar from "./SideBar"
import ButtonCards from './ButtonCards'
import Skill from './Skill'
import Skills from "./Skills"
import getUser from "../services/getUser"

type Skill = {
    name: string;
    keywords: string[];
    description: string;
  }

interface DashboardProps {
    userName: string
    userInfo: object
    setUserName: (str: string) => void
    setUserToken: (str: string) => void
    setProfile: (item: object) => void
    setUser: (item: object) => void
    setUserInfo: (aUser: object) => void
    
}

const Dashboard: React.FC<DashboardProps>=({setUserName, setUserToken, setProfile, setUser, userName, userInfo, setUserInfo}) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [skills, setSkills] = useState<{ name: string, keywords: string[], description: string }[]>([])
    const [router, setRouter] = useState<string>('Home')

    const effectRan = useRef(false)

    useEffect(()=>{
        async function getUserHelper() {
            try {
                const response = await getUser(userName)
                if (response.email){
                    setUserInfo(response)
                }
                
            } catch (error) {
                console.error(error)
            }
        }
        if (effectRan.current === false){
            getUserHelper()
            console.log('userName changed:', userName)
        }
        return ()=> {
            console.log('unmounted')
            effectRan.current = true
        }
    },[userName])

    useEffect(()=>{
        const skillArray: Skill[] = (userInfo as any).skills
        setSkills(skillArray)
    }, [userInfo])

    const handleSkillsChange = (newSkills: {name: string, keywords: string[], description: string}[]) => {
        setSkills(newSkills)
        console.log(skills)
    }

    //Menu items for side bar
    const menuItems = [
        {name: 'About', onClick: ()=>console.log('Item 1')},
        {name: 'Skills', onClick: ()=>{
            setRouter('Skills')
            setIsMenuOpen(false)
        }},
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
        setRouter(item)
    }

    const logOut = () => {
        googleLogout()
        setProfile({})
        setUserName('')
        setUserToken('')
        setUser({})
        setSkills([])
        localStorage.clear()
      }
      switch(router){
        case 'Home':
            return (
                <div>
                    <TopBar onLogout={logOut} siteName="Job Hunt" isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}></TopBar>
                    <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} menuItems={menuItems} setRouter={setRouter}></Sidebar>
                    <ButtonCards onButtonClick={onButtonClick} items={items} displayItems={skills}></ButtonCards>
                </div>
                )
        case 'Skills':
            return (
                <div>
                    <TopBar onLogout={logOut} siteName="Job Hunt" isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}></TopBar>
                    <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} menuItems={menuItems} setRouter={setRouter}></Sidebar>
                    <Skills setSkills={setSkills} skills={skills} setRouter={setRouter} setUserInfo={setUserInfo} userName={userName}/>
                </div>
            )
        default:
            return (
                <div></div>
            )
      }
}

export default Dashboard

//<ButtonCards onButtonClick={onButtonClick} items={items}></ButtonCards>
//<Skills setSkills={setSkills} skills={skills}/>