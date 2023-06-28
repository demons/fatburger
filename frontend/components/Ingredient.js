import EditIngredientForm from "./EditIngredientForm";
import { useStore } from "@/store";

export default function Ingredient({ ingredient, onEdit, onDelete }) {
  const { editionIngredientId, setEditionIngredientId } = useStore();
  const { ingredientId, title } = ingredient;

  const handleEdit = () => {
    setEditionIngredientId(ingredientId);
  };

  const handleApply = (count) => {
    onEdit(count);
    setEditionIngredientId(null);
  };

  const handleDelete = () => {
    onDelete(ingredientId);
  };

  if (editionIngredientId === ingredientId) {
    return <EditIngredientForm ingredient={ingredient} onApply={handleApply} />;
  }

  return (
    <div>
      {title}
      <button onClick={handleEdit}>Редактировать</button>
      <button onClick={handleDelete}>Удалить</button>
    </div>
  );
}
