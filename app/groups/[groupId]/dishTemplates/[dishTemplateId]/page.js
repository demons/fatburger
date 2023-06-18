"use client";

import { useGroups } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [count, setCount] = useState(0);
  const [currentIngredientId, setCurrentIngredientId] = useState(0);
  const [dish, setDish] = useState({ ingredients: [] });
  const router = useRouter();

  const { groupId, dishTemplateId } = params;
  const { createDishFromDishTemplate, getProductById, addDishToGroup } =
    useGroups();

  useEffect(() => {
    setDish(createDishFromDishTemplate(dishTemplateId));
  }, []);

  const handleCountChange = () => {
    dish.ingredients = dish.ingredients.map((ingredient) => {
      if (ingredient.id === currentIngredientId) {
        const newIngredient = {
          ...ingredient,
          count,
        };
        setCount(0);
        setCurrentIngredientId(0);
        return newIngredient;
      }
      return ingredient;
    });
    setDish({ ...dish });
  };

  const handleRemove = (ingredientId) => {
    dish.ingredients = dish.ingredients.filter(
      (ingredient) => ingredient.id !== ingredientId
    );
    setDish({ ...dish });
  };

  const handleReady = () => {
    // Add dish to the store
    addDishToGroup(groupId, dish);

    // Redirect
    router.push(`/groups/${groupId}`);
  };

  const handleCancel = () => {
    router.push(`/groups/${groupId}`);
  };

  const renderedIngredients = dish.ingredients.map((ingredient) => {
    const product = getProductById(ingredient.productId);

    let content;
    if (currentIngredientId === ingredient.id) {
      content = (
        <>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
          <button onClick={handleCountChange}>Готово</button>
        </>
      );
    } else {
      content = (
        <>
          Количество:{ingredient.count}
          <button onClick={() => setCurrentIngredientId(ingredient.id)}>
            Редактировать
          </button>
          <button onClick={() => handleRemove(ingredient.id)}>Удалить</button>
        </>
      );
    }

    return (
      <div key={ingredient.id}>
        {product.title} | {content}
      </div>
    );
  });

  return (
    <div>
      <button onClick={handleReady}>Готово</button>
      <button onClick={handleCancel}>Отмена</button>
      {dish.title}
      <div>{renderedIngredients}</div>
    </div>
  );
}
