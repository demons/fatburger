"use client";

import Link from "next/link";
import { useDishTemplatesQuery } from "@/hooks";
import AddDishTemplateForm from "@/components/AddDishTemplateForm";
import Spinner from "@/components/Spinner";
import ErrorAlert from "@/components/ErrorAlert";

export default function Page() {
  const { data, status, error } = useDishTemplatesQuery();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorAlert message={error.message} />;
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
