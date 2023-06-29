"use client";

import IngredientList from "@/components/IngredientList";
import {
  useDeleteIngredient,
  useDishQuery,
  useEditIngredient,
} from "@/hooks/dish";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const { groupId, dishId } = params;
  const { data, isLoading, isError } = useDishQuery(groupId, dishId);
  const { mutate: editIngredient } = useEditIngredient();
  const { mutate: deleteIngredient } = useDeleteIngredient();
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
    editIngredient({ groupId, dishId, ingredientId, count });
  };

  const handleDeleteIngredient = (ingredientId) => {
    deleteIngredient({ groupId, dishId, ingredientId });
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
