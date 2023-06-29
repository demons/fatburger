"use client";

import { useGroups } from "@/store";

export default function Page({ params }) {
  const { dishTemplates } = useGroups();
  const { groupId } = params;

  const handleAdd = (dishTemplateId) => {
    console.log(dishTemplateId);
  };

  const renderedDishTemplates = dishTemplates.map((dishTemplate) => {
    const { id, title } = dishTemplate;
    return (
      <div key={id} className="dish-template">
        {title}
        <button onClick={() => handleAdd(id)}>Добавить</button>
      </div>
    );
  });

  return <div className="dish-templates">{renderedDishTemplates}</div>;
}
