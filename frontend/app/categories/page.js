"use client";

import Spinner from "@/components/Spinner";
import Item from "@/components/common/Item";
import { useCategoriesQuery } from "@/hooks/category";

export default function Page() {
  const { data, status, error } = useCategoriesQuery();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorAlert message={error.message} />;
  }

  const renderedCategories = data.map((category) => {
    return <Item key={category.id} />;
  });

  return (
    <>
      <h1>Список категорий</h1>
      <div>{renderedCategories}</div>
    </>
  );
}
