export default function Ingredient({ ingredient, onDelete }) {
  const { ingredientId, title } = ingredient;

  return (
    <div>
      {title}
      <button onClick={() => onDelete(ingredientId)}>Удалить</button>
    </div>
  );
}
