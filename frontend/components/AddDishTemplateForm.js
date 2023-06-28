import { useAddDishTemplate } from "@/hooks/dishTemplate";
import { useState } from "react";

export default function AddDishTemplateForm() {
  const [title, setTitle] = useState("");
  const { mutate: addDishTemplate } = useAddDishTemplate();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDishTemplate({ title: title.trim() });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={handleChange} required />
      <button type="submit">Добавить</button>
    </form>
  );
}
