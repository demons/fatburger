import Link from "next/link";
import EditIngredientForm from "./EditIngredientForm";
import { useStore } from "@/store";

export default function Ingredient({
  ingredient,
  parentUrl,
  onChanged,
  onDelete,
}) {
  const { editionIngredientId, setEditionIngredientId } = useStore();
  const { ingredientId, title } = ingredient;

  const handleEdit = () => {
    setEditionIngredientId(ingredientId);
  };

  const handleApply = (count) => {
    onChanged(count);
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
      <Link href={`${parentUrl}/ingredients/${ingredientId}`}>{title}</Link>
      <button onClick={handleEdit}>Редактировать</button>
      <button onClick={handleDelete}>Удалить</button>
    </div>
  );
}
