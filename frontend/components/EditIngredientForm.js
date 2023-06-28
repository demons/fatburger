import { useState } from "react";

export default function EditIngredientForm({ ingredient, onApply }) {
  const [count, setCount] = useState("");

  const handleCancel = () => {
    onApply(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (count === "" || parseInt(count) === ingredient.count) {
      return onApply(null);
    }
    onApply(count);
  };

  const handleChange = (e) => {
    setCount(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      {ingredient.title}
      <input
        type="number"
        value={count}
        autoFocus
        placeholder={ingredient.count}
        onChange={handleChange}
      />
      <button type="submit">Изменить</button>
      <button type="button" onClick={handleCancel}>
        Отмена
      </button>
    </form>
  );
}
