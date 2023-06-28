import { useEffect, useState } from "react";

export default function EditTitleForm({ title, onApply }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(title);
  }, [title]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply(value.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
      />
      <button type="submit">Готово</button>
    </form>
  );
}
