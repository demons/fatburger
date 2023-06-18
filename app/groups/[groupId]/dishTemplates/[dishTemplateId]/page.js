"use client";

import { useGroups } from "@/store";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [dish, setDish] = useState({ ingredients: [] });

  const { groupId, dishTemplateId } = params;
  const { createDishFromDishTemplate, getProductById } = useGroups();

  useEffect(() => {
    setDish(createDishFromDishTemplate(dishTemplateId));
  }, []);

  const handleRemove = (ingredientId) => {
    dish.ingredients = dish.ingredients.filter(
      (ingredient) => ingredient.id !== ingredientId
    );
    setDish({ ...dish });
  };

  const renderedIngredients = dish.ingredients.map((ingredient) => {
    const product = getProductById(ingredient.productId);

    return (
      <div key={ingredient.id}>
        {product.title}
        <button onClick={() => handleRemove(ingredient.id)}>Удалить</button>
      </div>
    );
  });

  return (
    <div>
      {dish.title}
      <div>{renderedIngredients}</div>
    </div>
  );
}
