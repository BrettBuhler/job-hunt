import { useState } from "react";
import "../styles/Skills.css";
import EditSkillModal from "./EditSkillModal";
import SkillExpand from "./SkillExpand";
import updateSkills from "../services/updateSkills";

type Skill = {
  name: string;
  keywords: string[];
  description: string;
};

type SkillsProps = {
  skills: Skill[]
  userName: string
  setSkills: (skills: Skill[]) => void
  setRouter: (str: string) => void
  setUserInfo: (aUser: object) => void
}

const Skills = ({ skills, setSkills, setRouter, setUserInfo, userName }: SkillsProps) => {
  const [selectedSkillIndex, setSelectedSkillIndex] = useState<number | null>(null)
  const [showEditModal, setShowEditModal] = useState(false);
  const [newSkill, setNewSkill] = useState<Skill>({
    name: "",
    keywords: [],
    description: "",
  })
  const [editingSkill, setEditingSkill] = useState<Skill>({
    name: "",
    keywords: [],
    description: "",
  })
  const [save, setSave] = useState<boolean>(false)

  const handleAddSkill = () => {
    setEditingSkill({ name: "", keywords: [], description: "" });
    setSelectedSkillIndex(-1)
    setShowEditModal(true)
    setSave(true)
  }

  const handleEditSkill = (index: number) => {
    setEditingSkill(skills[index])
    setSelectedSkillIndex(index)
    setShowEditModal(true)
  };

  const handleDeleteSkill = (index: number) => {
    const newSkills = [...skills]
    newSkills.splice(index, 1)
    setSkills(newSkills)
    async function updateSkillsHelper() {
      try {
        const response = updateSkills(userName, newSkills).then(res=>{
          if (res.email){
            setUserInfo(res)
          }
        })
      } catch (error) {
        console.error(error)
      }
    }
    updateSkillsHelper()
  }

  const handleSaveSkill = () => {

    async function saveSkillHelper(skillsToDB: object[]) {
      try {
        const response = updateSkills(userName, skillsToDB).then(res=>{
          if (res.email){
            setUserInfo(res)
          }
        })
      } catch (error) {
        console.error(error)
      }
    }

    if (skills){
      if (selectedSkillIndex === -1) {
        saveSkillHelper([...skills, editingSkill])
        setSkills([...skills, editingSkill])
      } else if (selectedSkillIndex !== null) {
          const newSkills = [...skills]
          newSkills[selectedSkillIndex] = editingSkill;
          saveSkillHelper(newSkills)
          setSkills(newSkills)
      }
    } else {
      saveSkillHelper([editingSkill])
      setSkills([editingSkill])
    }
    setSelectedSkillIndex(null)
    setShowEditModal(false)
  }

  return (
    <div className="skills">
      <div className="skills-list">
      <div className="skills-title-page">
        <div className="skills-top-bar">
        <h1 className="skills-title">Edit Skills</h1>
      </div>
      <p className="skills-p">Welcome to Job Hunt's skills editing page! Here, you can easily manage and update your skills to make your job applications stand out.</p>
      <p className="skills-p">To get started, enter the skill name and a brief description of your experience with it. We recommend including relevant keywords separated by commas, such as "front-end, frontend, front end". This will help our natural language processing feature match your skills to job descriptions.</p>
      <p className="skills-p">Once you've entered your skills, you can view them below. Click on the expand icon to see the relevant keywords and description. Editing and deleting skills is also a breeze - just click the corresponding button.</p>
      <p className="skills-p-bottom">At Job Hunt, we're committed to making your job search as seamless as possible. Give our skills component a try and see the difference it can make in your job hunt!</p>
      <div className="skills-actions">
        <button className='skills-edit' onClick={()=>setRouter('Home')}>Home</button>
        <button className="skills-edit" onClick={handleAddSkill}>Add Skill</button>
      </div>
    </div>
      </div>
      <ul className="skills-list">
        {skills && skills.map((skill, index) => (
          <li key={index} className="skills-item">
              <h2>{skill.name}</h2>
              <SkillExpand description={skill.description} keywords={skill.keywords} />
            <div className="skills-actions">
              <button
                className="skills-edit"
                onClick={() => handleEditSkill(index)}
              >
                Edit
              </button>
              <button
                className="skills-delete"
                onClick={() => handleDeleteSkill(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showEditModal && (
        <div className="modal-overlay">
          <EditSkillModal
            skill={editingSkill}
            onSave={handleSaveSkill}
            onCancel={() => setShowEditModal(false)}
            save={save}
            setSave={setSave}
            editingSkill={editingSkill}
            setEditingSkill={setEditingSkill}
          />
        </div>
      )}
    </div>
  );
}

export default Skills