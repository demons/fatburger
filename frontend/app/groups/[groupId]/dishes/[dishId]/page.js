"use client";

import IngredientList from "@/components/IngredientList";
import {
  useDeleteIngredient,
  useDishQuery,
  useEditIngredient,
} from "@/hooks/dish";
import Link from "next/link";
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
      <Link href={`/groups/${groupId}`}>Готово</Link>
      <div>{data.title}</div>
      <IngredientList
        ingredients={data.ingredients}
        parentUrl={`/groups/${groupId}/dishes/${dishId}`}
        onChanged={handleEditIngredient}
        onDelete={handleDeleteIngredient}
      />
      <Link href={`/groups/${groupId}/dishes/${dishId}/ingredients`}>
        Добавить ингредиент
      </Link>
    </div>
  );
}
