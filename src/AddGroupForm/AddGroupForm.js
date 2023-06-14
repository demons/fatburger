import { useState } from "react";
import { useGroups } from "../store";

function AddGroupForm() {
  const [title, setTitle] = useState("");
  const addGroup = useGroups((state) => state.addGroup);

  const handleAddGroup = () => {
    addGroup(title);
    setTitle("");
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleAddGroup}>Добавить</button>
    </div>
  );
}

export default AddGroupForm;
