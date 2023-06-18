"use client";

import { useGroups } from "@/store";

export default function Page({ params }) {
  const { dishTemplates } = useGroups();

  const renderedDishTemplates = dishTemplates.map((dishTemplate) => (
    <div key={dishTemplate.id} className="dish-template">
      {dishTemplate.title}
      <button>Добавить</button>
    </div>
  ));

  return <div className="dish-templates">{renderedDishTemplates}</div>;
}
