"use client";

import { useProductsQuery } from "@/hooks";

export default function Page() {
  const { data: products, isLoading, isError } = useProductsQuery();

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Произошла ошибка";
  }

  const renderedProducts = products.map((product) => (
    <div key={product.id}>{product.title}</div>
  ));

  return <div>{renderedProducts}</div>;
}
