"use client";

import Link from "next/link";
import { useDeleteProduct, useProductsQuery } from "@/hooks";
import Spinner from "@/components/Spinner";

export default function Page() {
  const { data: products, isLoading, isError } = useProductsQuery();
  const { mutate: deleteProduct } = useDeleteProduct();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return "Произошла ошибка";
  }

  const handleDeleteClick = (productId) => {
    deleteProduct({ productId });
  };

  const renderedProducts = products
    .filter((product) => product.isDeleted === false)
    .map((product) => (
      <div key={product.id}>
        <span>{product.title} | </span>
        {product.maker && <span>{product.maker} | </span>}
        <span>Калории: {product.energy} | </span>
        <span>Белки: {product.protein} | </span>
        <span>Жиры: {product.fat} | </span>
        <span>Углеводы: {product.carb}</span>
        <Link href={`/products/${product.id}`}>Редактировать</Link>
        <button onClick={() => handleDeleteClick(product.id)}>Удалить</button>
      </div>
    ));

  return (
    <div>
      {renderedProducts}
      <Link href={`/products/add`}>Добавить</Link>
    </div>
  );
}
