import { useState } from "react";
import '../styles/Skills.css'

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

  const handleAddSkill = () => {
    setNewSkill({ name: "", keywords: [], description: "" });
    setSelectedSkillIndex(-1);
  };

  const handleEditSkill = (index: number) => {
    setEditingSkill(skills[index]);
    setSelectedSkillIndex(index);
  };

  const handleDeleteSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const handleSaveSkill = () => {
    if (selectedSkillIndex === -1) {
      setSkills([...skills, newSkill]);
    } else if (selectedSkillIndex !== null) {
      const newSkills = [...skills];
      newSkills[selectedSkillIndex] = editingSkill;
      setSkills(newSkills);
    }
    setSelectedSkillIndex(null);
  };

  return (
    <div className="skills">
      <h1>Skills</h1>
      <ul className="skills-list">
        {skills.map((skill, index) => (
          <li key={index} className="skills-item">
            <h2>{skill.name}</h2>
            <p className="skills-description">{skill.description}</p>
            <ul className="skills-keywords">
              {skill.keywords.map((keyword, i) => (
                <li key={i} className="skills-keyword">
                  {keyword}
                </li>
              ))}
            </ul>
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
      {selectedSkillIndex === -1 && (
        <>
          <h2>Add Skill</h2>
          <div className="skills-form">
            <div>
              <label>Name:</label>
              <input
                className="skills-name"
                value={newSkill.name}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, name: e.target.value })
                }
              />
            </div>
            <div>
              <label>Keywords:</label>
              <input
                className="skills-keywords"
                value={newSkill.keywords.join(",")}
                onChange={(e) =>
                  setNewSkill({
                    ...newSkill,
                    keywords: e.target.value.split(","),
                  })
                }
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                className="skills-description"
                value={newSkill.description}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, description: e.target.value})}
                />
            </div>
        <button className="skills-save" onClick={handleSaveSkill}>
          Save Skill
        </button>
      </div>
    </>
  )}
  {selectedSkillIndex !== null && selectedSkillIndex !== -1 && (
    <>
      <h2>Edit Skill</h2>
      <div className="skills-form">
        <div>
          <label>Name:</label>
          <input
            className="skills-name"
            value={editingSkill.name}
            onChange={(e) =>
              setEditingSkill({ ...editingSkill, name: e.target.value })
            }
          />
        </div>
        <div>
          <label>Keywords:</label>
          <input
            className="skills-keywords"
            value={editingSkill.keywords.join(",")}
            onChange={(e) =>
              setEditingSkill({
                ...editingSkill,
                keywords: e.target.value.split(","),
              })
            }
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            className="skills-description"
            value={editingSkill.description}
            onChange={(e) =>
              setEditingSkill({
                ...editingSkill,
                description: e.target.value,
              })
            }
          />
        </div>
        <button className="skills-save" onClick={handleSaveSkill}>
          Save Skill
        </button>
      </div>
    </>
  )}
</div>
  )
        }
        export default Skills;