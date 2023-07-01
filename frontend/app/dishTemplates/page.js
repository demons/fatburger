"use client";

import Link from "next/link";
import { useDishTemplatesQuery } from "@/hooks";
import AddDishTemplateForm from "@/components/AddDishTemplateForm";
import Spinner from "@/components/Spinner";

export default function Page() {
  const { data, isLoading, isError } = useDishTemplatesQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return "Произошла ошибка";
  }

  const renderedDishTemplates = data.map((dishTemplate) => {
    return (
      <div key={dishTemplate.id}>
        {dishTemplate.title}
        <Link href={`/dishTemplates/${dishTemplate.id}`}>Редактировать</Link>
      </div>
    );
  });

  return (
    <div>
      {renderedDishTemplates}
      <AddDishTemplateForm />
    </div>
  );
}
