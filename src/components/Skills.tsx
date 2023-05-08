import { useState } from "react";
import "../styles/Skills.css";
import EditSkillModal from "./EditSkillModal";
import SkillExpand from "./SkillExpand";

type Skill = {
  name: string;
  keywords: string[];
  description: string;
};

type SkillsProps = {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
};

const Skills = ({ skills, setSkills }: SkillsProps) => {
  const [selectedSkillIndex, setSelectedSkillIndex] = useState<number | null>(
    null
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [newSkill, setNewSkill] = useState<Skill>({
    name: "",
    keywords: [],
    description: "",
  });
  const [editingSkill, setEditingSkill] = useState<Skill>({
    name: "",
    keywords: [],
    description: "",
  });
  const [save, setSave] = useState<boolean>(false)

  const handleAddSkill = () => {
    setEditingSkill({ name: "", keywords: [], description: "" });
    setSelectedSkillIndex(-1);
    setShowEditModal(true);
    setSave(true);
  };

  const handleEditSkill = (index: number) => {
    setEditingSkill(skills[index]);
    setSelectedSkillIndex(index);
    setShowEditModal(true);
  };

  const handleDeleteSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const handleSaveSkill = () => {
    if (selectedSkillIndex === -1) {
      setSkills([...skills, editingSkill]);
    } else if (selectedSkillIndex !== null) {
      const newSkills = [...skills];
      newSkills[selectedSkillIndex] = editingSkill;
      setSkills(newSkills);
    }
    setSelectedSkillIndex(null);
    setShowEditModal(false);
  };

  return (
    <div className="skills">
      <div className="skills-top-bar">
        <button className='skills-edit'>Home</button>
        <h1 className="skills-title">Edit Skills</h1>
        <button className='skills-edit'>Save</button>
      </div>
      <ul className="skills-list">
        {skills.map((skill, index) => (
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
      <button className="skills-add" onClick={handleAddSkill}>
        Add Skill
      </button>
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
};

export default Skills;