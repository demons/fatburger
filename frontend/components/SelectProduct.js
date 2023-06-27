"use client";

import { useRouter } from "next/navigation";
import { useAddIngredient, useEditIngredient, useProductsQuery } from "@/hooks";

export default function SelectProduct({ groupId, ingredientId }) {
  const { data, isLoading, isError } = useProductsQuery();
  const { mutate: addIngredient } = useAddIngredient();
  const { mutate: editIngredient } = useEditIngredient();
  const router = useRouter();

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Произошла ошибка";
  }

  const handleClick = (productId) => {
    if (ingredientId) {
      editIngredient({ groupId, ingredientId, productId });
    } else {
      addIngredient({ groupId, productId, count: 0 });
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
