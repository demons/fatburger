"use client";

import EditTitleForm from "@/components/EditTitleForm";
import IngredientList from "@/components/IngredientList";
import Spinner from "@/components/Spinner";
import {
  useDeleteIngredient,
  useDishQuery,
  useEditIngredient,
  useUpdateDish,
} from "@/hooks/dish";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page({ params }) {
  const [state, setState] = useState("");
  const { groupId, dishId } = params;
  const { data, isLoading, isError } = useDishQuery(groupId, dishId);
  const { mutate: updateDish } = useUpdateDish();
  const { mutate: editIngredient } = useEditIngredient();
  const { mutate: deleteIngredient } = useDeleteIngredient();
  const router = useRouter();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return "Произошла ошибка";
  }

  const handleTitleApply = (title) => {
    updateDish({ groupId, dishId, title });
    setState("");
  };

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

  const titleContent =
    state === "edit" ? (
      <EditTitleForm title={data.title} onApply={handleTitleApply} />
    ) : (
      <div onClick={() => setState("edit")}>{data.title}</div>
    );

  return (
    <div>
      <Link href={`/groups/${groupId}`}>Готово</Link>
      {titleContent}
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
