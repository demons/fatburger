import Ingredient from "./Ingredient";

export default function IngredientList({ ingredients, onDelete }) {
  const renderedIngredients = ingredients.map((ingredient) => (
    <Ingredient
      key={ingredient.ingredientId}
      ingredient={ingredient}
      onDelete={onDelete}
    />
  ));

  return <div>{renderedIngredients}</div>;
}
