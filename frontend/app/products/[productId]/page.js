"use client";

import AddProduct from "@/components/AddProduct";
import ErrorAlert from "@/components/ErrorAlert";
import Spinner from "@/components/Spinner";
import { useProductQuery } from "@/hooks";

export default function Page({ params }) {
  const { productId } = params;
  const { data, status, error } = useProductQuery(productId);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorAlert message={error.message} />;
  }

  return <AddProduct product={data} />;
}
