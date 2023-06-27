"use client";

import { useDeleteProduct, useProductsQuery } from "@/hooks";

export default function Page() {
  const { data: products, isLoading, isError } = useProductsQuery();
  const { mutate: deleteProduct } = useDeleteProduct();

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Произошла ошибка";
  }

  const handleDeleteClick = (productId) => {
    deleteProduct({ productId });
  };

  const renderedProducts = products.map((product) => (
    <div key={product.id}>
      {product.title}
      <button onClick={() => handleDeleteClick(product.id)}>Удалить</button>
    </div>
  ));

  return <div>{renderedProducts}</div>;
}
