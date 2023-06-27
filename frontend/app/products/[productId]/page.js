"use client";

import AddProduct from "@/components/AddProduct";
import { useProductQuery } from "@/hooks";

export default function Page({ params }) {
  const { productId } = params;
  const { data, isLoading, isError } = useProductQuery(productId);

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Произошла ошибка";
  }

  return <AddProduct product={data} />;
}
