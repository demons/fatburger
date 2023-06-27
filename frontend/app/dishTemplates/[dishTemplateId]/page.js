"use client";

import IngredientList from "@/components/IngredientList";
import {
  useDeleteIngredientFromDishTemplate,
  useDishTemplateQuery,
} from "@/hooks";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [title, setTitle] = useState("");
  const { dishTemplateId } = params;
  const {
    data: dishTemplate,
    isLoading,
    isError,
  } = useDishTemplateQuery(dishTemplateId);
  const { mutate: deleteIngredient } = useDeleteIngredientFromDishTemplate();

  useEffect(() => {
    if (dishTemplate) {
      setTitle(dishTemplate.title);
    }
  }, [dishTemplate]);

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Произошла ошибка";
  }

  const handleDeleteIngredient = (ingredientId) => {
    deleteIngredient({ dishTemplateId, ingredientId });
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <IngredientList
        ingredients={dishTemplate.ingredients}
        onDelete={handleDeleteIngredient}
      />
    </div>
  );
}
