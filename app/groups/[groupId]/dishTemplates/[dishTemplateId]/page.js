"use client";

import { useGroups } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [dish, setDish] = useState({ ingredients: [] });
  const router = useRouter();

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

  const handleCancel = () => {
    router.push(`/groups/${groupId}`);
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
      <button onClick={handleCancel}>Отмена</button>
      {dish.title}
      <div>{renderedIngredients}</div>
    </div>
  );
}
