"use client";

import EditTitleForm from "@/components/EditTitleForm";
import Spinner from "@/components/Spinner";
import Item from "@/components/common/Item";
import {
  useCategoriesQuery,
  useDeleteCategory,
  useUpdateCategory,
} from "@/hooks/category";
import { useState } from "react";

export default function Page() {
  const [editId, setEditId] = useState(null);
  const { data, status, error } = useCategoriesQuery();
  const { mutate: updateCategory } = useUpdateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorAlert message={error.message} />;
  }

  const handleTitleClick = (categoryId) => {
    setEditId(categoryId);
  };

  const handleEditApply = (categoryId, title) => {
    updateCategory({ categoryId, title });
    setEditId(null);
  };

  const handleDelete = (categoryId) => {
    deleteCategory({ categoryId });
  };

  const renderedCategories = data.map(({ id, title }) => {
    const actions = {
      handleTitleClick: () => handleTitleClick(id),
      handleDelete: () => handleDelete(id),
    };
    const titleContent =
      editId === id ? (
        <EditTitleForm
          title={title}
          onApply={(title) => handleEditApply(id, title)}
        />
      ) : (
        title
      );
    return <Item key={id} title={titleContent} actions={actions} />;
  });

  return (
    <>
      <h1>Список категорий</h1>
      <div>{renderedCategories}</div>
    </>
  );
}
