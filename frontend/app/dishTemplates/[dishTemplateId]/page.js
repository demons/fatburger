"use client";

import { useDishTemplateQuery } from "@/hooks";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [title, setTitle] = useState("");
  const { dishTemplateId } = params;
  const { data, isLoading, isError } = useDishTemplateQuery(dishTemplateId);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
    }
  }, [data]);

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Произошла ошибка";
  }

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
}
