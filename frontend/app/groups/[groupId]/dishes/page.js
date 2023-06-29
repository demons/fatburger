"use client";

import Link from "next/link";
import { useDishTemplatesQuery } from "@/hooks";

export default function Page({ params }) {
  const { data, isLoading, isError } = useDishTemplatesQuery();
  const { groupId } = params;

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Произошла ошибка";
  }

  const handleAdd = (dishTemplateId) => {
    console.log(dishTemplateId);
  };

  const renderedDishTemplates = data.map((dishTemplate) => {
    const { id, title } = dishTemplate;
    return (
      <div key={id} className="dish-template">
        {title}
        <button onClick={() => handleAdd(id)}>Добавить</button>
      </div>
    );
  });

  return (
    <div className="dish-templates">
      <Link href={`/groups/${groupId}`}>Отмена</Link>
      {renderedDishTemplates}
    </div>
  );
}
