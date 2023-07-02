"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDishTemplatesQuery } from "@/hooks";
import { useAddDish } from "@/hooks/dish";
import Spinner from "@/components/Spinner";
import ErrorAlert from "@/components/ErrorAlert";

export default function Page({ params }) {
  const { data, status, error } = useDishTemplatesQuery();
  const { mutateAsync: addDish } = useAddDish();
  const router = useRouter();
  const { groupId } = params;

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorAlert message={error.message} />;
  }

  const handleAdd = async (dishTemplateId) => {
    const { id } = await addDish({ groupId, dishTemplateId });
    router.push(`/groups/${groupId}/dishes/${id}`);
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
