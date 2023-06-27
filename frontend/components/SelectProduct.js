"use client";

import { useProductsQuery } from "@/hooks";

export default function SelectProduct({ onApply }) {
  const { data, isLoading, isError } = useProductsQuery();

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Произошла ошибка";
  }

  const renderedProducts = data.map((product) => {
    return (
      <div key={product.id}>
        {product.title}
        <button onClick={() => onApply(product.id)}>Выбрать</button>
      </div>
    );
  });

  return <div>{renderedProducts}</div>;
}
