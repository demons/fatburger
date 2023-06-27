import { useEditIngredient } from "@/hooks";
import { useState } from "react";

export default function EditIngredientForm({ groupItem, onApply, index }) {
  const [count, setCount] = useState("");
  const { mutate: edit } = useEditIngredient();
  const { groupId, ingredientId, productId, title } = groupItem;

  const handleEditCancel = () => {
    onApply();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(count) === groupItem.count || !count) {
      onApply();
      return;
    }
    edit({ groupId, ingredientId, productId, count });
    onApply();
  };

  const handleChangeCount = (e) => {
    setCount(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      {index}. {title}
      <input
        type="text"
        value={count}
        autoFocus
        placeholder={groupItem.count}
        onChange={handleChangeCount}
      />
      <button type="submit">Изменить</button>
      <button onClick={handleEditCancel}>Отмена</button>
    </form>
  );
}
