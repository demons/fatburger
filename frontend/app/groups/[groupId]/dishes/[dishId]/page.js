"use client";

import IngredientList from "@/components/IngredientList";
import { useDishQuery } from "@/hooks/dish";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const { groupId, dishId } = params;
  const { data, isLoading, isError } = useDishQuery(groupId, dishId);
  const router = useRouter();

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Произошла ошибка";
  }

  const handleEditIngredient = (data) => {
    if (!data) {
      return;
    }
    const { ingredientId, count } = data;
    console.log(data);
  };

  const handleDeleteIngredient = (ingredientId) => {
    console.log(ingredientId);
  };

  return (
    <div>
      DishEdit groupId: {groupId}, dishId: {dishId}, title: {data.title}
      <IngredientList
        ingredients={data.ingredients}
        parentUrl={`/dishes/${dishId}`}
        onChanged={handleEditIngredient}
        onDelete={handleDeleteIngredient}
      />
    </div>
  );
}
