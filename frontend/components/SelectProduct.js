"use client";

import { useProductsQuery } from "@/hooks";
import Spinner from "./Spinner";
import ErrorAlert from "./ErrorAlert";

export default function SelectProduct({ onApply }) {
  const { data, status, error } = useProductsQuery();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorAlert message={error.message} />;
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
