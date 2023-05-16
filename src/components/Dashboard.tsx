import { useState, useEffect, useRef } from "react"
import { googleLogout } from "@react-oauth/google"
import TopBar from "./TopBar"
import Sidebar from "./SideBar"
import ButtonCards from './ButtonCards'
import Skills from "./Skills"
import getUser from "../services/getUser"
import CoverLetterGen from "./CoverLetterGen"
import ResumeUploader from "./ResumeUploader"
import Welcome from "./Welcome"

type Skill = {
    name: string;
    keywords: string[];
    description: string;
  }

type Resume = {
    name: string
    text: string
}

interface DashboardProps {
    userName: string
    userInfo: object
    setUserName: (str: string) => void
    setProfile: (item: object) => void
    setUser: (item: object) => void
    setUserInfo: (aUser: object) => void
    
}

const Dashboard: React.FC<DashboardProps>=({setUserName, setProfile, setUser, userName, userInfo, setUserInfo}) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [skills, setSkills] = useState<{ name: string, keywords: string[], description: string }[]>([])
    const [router, setRouter] = useState<string>('Home')
    const [resumes, setResumes] = useState<{ name: string, text: string}[]>([])

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
        }
        return ()=> {
            effectRan.current = true
        }
    },[userName])

    useEffect(()=>{
        const skillArray: Skill[] = (userInfo as any).skills
        const resumeArray: Resume[] = (userInfo as any).resumes
        setResumes(resumeArray)
        setSkills(skillArray)
    }, [userInfo])

    //Menu items for side bar
    const menuItems = [
        {name: "Home", onClick: ()=>{
            setRouter('Home')
            setIsMenuOpen(false)
        }},
        {name: 'Write Letter', onClick: ()=>{
            setRouter('Letter')
            setIsMenuOpen(false)
        }},
        {name: 'Skills', onClick: ()=>{
            setRouter('Skills')
            setIsMenuOpen(false)
        }},
        {name: 'Resumes', onClick: ()=>{
            setRouter('Resumes')
            setIsMenuOpen(false)
        }},
        {name: 'Log Out', onClick: ()=>{
            logOut()
        }},
    ]

    const items = [
        'Skills',
        'Resumes'
    ]

    const onButtonClick: (str: string) => void = (item) => {
        setRouter(item)
    }

    const logOut = () => {
        googleLogout()
        setProfile({})
        setUserName('')
        setUser({})
        setSkills([])
        setResumes([])
        setUserInfo({})
        localStorage.clear()
      }

    switch(router){
        case 'Home':
            return (
                <div>
                    <TopBar onLogout={logOut} siteName="Job Hunt" isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}></TopBar>
                    <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} menuItems={menuItems} setRouter={setRouter}></Sidebar>
                    <div className="dashboard-container">
                        <Welcome />
                        <ButtonCards onButtonClick={onButtonClick} items={items} displayItems={skills} resumeItems={resumes}></ButtonCards>
                    </div>
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
        case 'Letter':
            return (
                <div>
                    <TopBar onLogout={logOut} siteName="Job Hunt" isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}></TopBar>
                    <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} menuItems={menuItems} setRouter={setRouter}></Sidebar>
                    <CoverLetterGen skills={skills} resumes={resumes} setRouter={setRouter}/>
                </div>
            )
        case 'Resumes':
            return (
                <div>
                    <TopBar onLogout={logOut} siteName="Job Hunt" isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}></TopBar>
                    <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} menuItems={menuItems} setRouter={setRouter}></Sidebar>
                    <ResumeUploader resumes={resumes} userName={userName} setUserInfo={setUserInfo} setResumes={setResumes} setRouter={setRouter}/>
                </div>
            )
        default:
            return (
                <div>
                    <p>Error Reload Page</p>
                </div>
            )
      }
}

export default Dashboard
