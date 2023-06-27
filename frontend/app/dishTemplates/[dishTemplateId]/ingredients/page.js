"use client";

import { useRouter } from "next/navigation";
import SelectProduct from "@/components/SelectProduct";
import { useAddIngredient } from "@/hooks/dishTemplate";
import { useStore } from "@/store";

export default function Page({ params }) {
  const { dishTemplateId } = params;
  const { mutateAsync: addIngredient } = useAddIngredient();
  const setEditionIngredientId = useStore(
    (state) => state.setEditionIngredientId
  );
  const router = useRouter();

  const handleApply = async (productId) => {
    const { id } = await addIngredient({ dishTemplateId, productId, count: 0 });
    setEditionIngredientId(id);
    router.push(`/dishTemplates/${dishTemplateId}`);
  };

  return <SelectProduct onApply={handleApply} />;
}
