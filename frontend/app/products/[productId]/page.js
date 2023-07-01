"use client";

import AddProduct from "@/components/AddProduct";
import Spinner from "@/components/Spinner";
import { useProductQuery } from "@/hooks";

export default function Page({ params }) {
  const { productId } = params;
  const { data, isLoading, isError } = useProductQuery(productId);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return "Произошла ошибка";
  }

  return <AddProduct product={data} />;
}
