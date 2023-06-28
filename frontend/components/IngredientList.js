import Ingredient from "./Ingredient";

export default function IngredientList({
  ingredients,
  parentUrl,
  onChanged,
  onDelete,
}) {
  const renderedIngredients = ingredients.map((ingredient) => (
    <Ingredient
      key={ingredient.ingredientId}
      ingredient={ingredient}
      parentUrl={parentUrl}
      onChanged={onChanged}
      onDelete={onDelete}
    />
  ));

  return <div>{renderedIngredients}</div>;
}
