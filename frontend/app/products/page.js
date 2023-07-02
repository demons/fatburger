"use client";

import Link from "next/link";
import { useDeleteProduct, useProductsQuery } from "@/hooks";
import Spinner from "@/components/Spinner";
import ErrorAlert from "@/components/ErrorAlert";

export default function Page() {
  const { data: products, status, error } = useProductsQuery();
  const { mutate: deleteProduct } = useDeleteProduct();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorAlert message={error.message} />;
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
