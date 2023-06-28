import Ingredient from "./Ingredient";

export default function IngredientList({ ingredients, onEdit, onDelete }) {
  const renderedIngredients = ingredients.map((ingredient) => (
    <Ingredient
      key={ingredient.ingredientId}
      ingredient={ingredient}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ));

  return <div>{renderedIngredients}</div>;
}
