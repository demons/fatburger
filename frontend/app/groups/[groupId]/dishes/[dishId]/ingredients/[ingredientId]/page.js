"use client";

import { useRouter } from "next/navigation";
import SelectProduct from "@/components/SelectProduct";
import { useEditIngredient } from "@/hooks/dish";

export default function Page({ params }) {
  const { mutate: editIngredient } = useEditIngredient();
  const router = useRouter();
  const { groupId, dishId, ingredientId } = params;

  const handleApply = (productId) => {
    editIngredient({ groupId, dishId, ingredientId, productId });
    router.push(`/groups/${groupId}/dishes/${dishId}`);
  };

  return <SelectProduct onApply={handleApply} />;
}
