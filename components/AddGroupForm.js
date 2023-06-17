import { useState } from "react";
import { useGroups } from "../app/store";

function AddGroupForm() {
  const [title, setTitle] = useState("");
  const addGroup = useGroups((state) => state.addGroup);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      return;
    }

    addGroup(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Добавить</button>
    </form>
  );
}

export default AddGroupForm;
