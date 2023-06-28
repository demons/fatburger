"use client";

import { useRouter } from "next/navigation";
import SelectProduct from "@/components/SelectProduct";
import { useEditIngredient } from "@/hooks/dishTemplate";

export default function Page({ params }) {
  const { mutate: editIngredient } = useEditIngredient();
  const router = useRouter();
  const { dishTemplateId, ingredientId } = params;

  const handleApply = (productId) => {
    editIngredient({ dishTemplateId, ingredientId, productId });
    router.push(`/dishTemplates/${dishTemplateId}`);
  };

  return <SelectProduct onApply={handleApply} />;
}
