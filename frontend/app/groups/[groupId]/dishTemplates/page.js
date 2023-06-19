"use client";

import { useGroups } from "@/store";
import Link from "next/link";

export default function Page({ params }) {
  const { dishTemplates } = useGroups();
  const { groupId } = params;

  const renderedDishTemplates = dishTemplates.map((dishTemplate) => (
    <div key={dishTemplate.id} className="dish-template">
      {dishTemplate.title}
      <Link href={`/groups/${groupId}/dishTemplates/${dishTemplate.id}`}>
        Добавить
      </Link>
    </div>
  ));

  return <div className="dish-templates">{renderedDishTemplates}</div>;
}
