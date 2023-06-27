"use client";

import { useRouter } from "next/navigation";
import SelectProduct from "@/components/SelectProduct";
import { useAddIngredient } from "@/hooks";
import { useStore } from "@/store";

export default function Page({ params }) {
  const { groupId } = params;
  const { mutateAsync: addIngredient } = useAddIngredient();
  const setEditionIngredientId = useStore(
    (state) => state.setEditionIngredientId
  );
  const router = useRouter();

  const handleApply = async (productId) => {
    const { id } = await addIngredient({ groupId, productId, count: 0 });
    setEditionIngredientId(id);
    router.push(`/groups/${groupId}`);
  };

  return <SelectProduct onApply={handleApply} />;
}
