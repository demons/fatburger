"use client";

import { useRouter } from "next/navigation";
import { useAddIngredient, useEditIngredient, useProductsQuery } from "@/hooks";
import { useStore } from "@/store";

export default function SelectProduct({ groupId, ingredientId }) {
  const { data, isLoading, isError } = useProductsQuery();
  const { mutateAsync: addIngredient } = useAddIngredient();
  const { mutate: editIngredient } = useEditIngredient();
  const setEditionIngredientId = useStore(
    (state) => state.setEditionIngredientId
  );
  const router = useRouter();

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Произошла ошибка";
  }

  const handleClick = async (productId) => {
    if (ingredientId) {
      editIngredient({ groupId, ingredientId, productId });
    } else {
      const { id } = await addIngredient({ groupId, productId, count: 0 });
      setEditionIngredientId(id);
    }
    router.push(`/groups/${groupId}`);
  };

  const renderedProducts = data.map((product) => {
    return (
      <div key={product.id}>
        {product.title}
        <button onClick={() => handleClick(product.id)}>Выбрать</button>
      </div>
    );
  });

  return <div>{renderedProducts}</div>;
}
