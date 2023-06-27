"use client";

import { useRouter } from "next/navigation";
import SelectProduct from "@/components/SelectProduct";
import { useEditIngredient } from "@/hooks";
import { useStore } from "@/store";

export default function Page({ params }) {
  const { groupId, ingredientId } = params;
  const { mutate: editIngredient } = useEditIngredient();
  const setEditionIngredientId = useStore(
    (state) => state.setEditionIngredientId
  );
  const router = useRouter();

  const handleApply = async (productId) => {
    editIngredient({ groupId, ingredientId, productId });
    router.push(`/groups/${groupId}`);
  };

  return <SelectProduct groupId={groupId} onApply={handleApply} />;
}
