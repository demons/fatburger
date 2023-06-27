import Ingredient from "./Ingredient";

export default function IngredientList({ ingredients }) {
  const renderedIngredients = ingredients.map((ingredient) => (
    <Ingredient key={ingredient.ingredientId} ingredient={ingredient} />
  ));

  return <div>{renderedIngredients}</div>;
}
