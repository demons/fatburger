"use client";

import { useDishTemplatesQuery } from "@/hooks";

export default function Page() {
  const { data, isLoading, isError } = useDishTemplatesQuery();

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Произошла ошибка";
  }

  const renderedDishTemplates = data.map((dishTemplate) => {
    return <div key={dishTemplate.id}>{dishTemplate.title}</div>;
  });

  return <div>{renderedDishTemplates}</div>;
}
