"use client";

import { useRouter } from "next/navigation";
import SelectProduct from "@/components/SelectProduct";
import { useAddIngredient } from "@/hooks/dish";
import { useStore } from "@/store";

export default function Page({ params }) {
  const { groupId, dishId } = params;
  const { mutateAsync: addIngredient } = useAddIngredient();
  const setEditionIngredientId = useStore(
    (state) => state.setEditionIngredientId
  );
  const router = useRouter();

  const handleApply = async (productId) => {
    const { id } = await addIngredient({
      groupId,
      dishId,
      productId,
      count: 0,
    });
    setEditionIngredientId(id);
    router.push(`/groups/${groupId}/dishes/${dishId}`);
  };

  return <SelectProduct onApply={handleApply} />;
}
