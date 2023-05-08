import { useState } from "react";
import '../styles/EditSkillModal.css'

type Skill = {
    name: string;
    keywords: string[];
    description: string;
  };

interface EditSkillModalProps {
  skill: Skill
  onSave: (editedSkill: Skill) => void
  onCancel: () => void
  save: boolean;
  setSave: (bool: boolean) => void;
  editingSkill: Skill
  setEditingSkill: (skill: Skill) => void
};

const EditSkillModal: React.FC<EditSkillModalProps>= ({ skill, onSave, onCancel, save, setSave, editingSkill, setEditingSkill}) => {

  const handleSave = () => {
    setSave(false)
    onSave(editingSkill);
  };

  const handleCancel = () => {
    setSave(false)
    onCancel();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{`${save ? 'Add': 'Edit'} Skill`}</h2>
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
        <button className="skills-save" onClick={handleSave}>
          Save Skill
        </button>
        <button className="skills-cancel" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditSkillModal