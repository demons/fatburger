"use client";

import { useAddIngredient, useProductsQuery } from "@/hooks";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const { groupId } = params;
  const { data, isLoading, isError } = useProductsQuery();
  const { mutate: addIngredient } = useAddIngredient();
  const router = useRouter();

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Произошла ошибка";
  }

  const handleAdd = (productId) => {
    addIngredient({ groupId, productId, count: 0 });
    router.push(`/groups/${groupId}`);
  };

  const renderedProducts = data.map((product) => {
    return (
      <div key={product.id}>
        {product.title}
        <button onClick={() => handleAdd(product.id)}>Добавить</button>
      </div>
    );
  });

  return <div>{renderedProducts}</div>;
}
