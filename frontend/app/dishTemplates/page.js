"use client";

import { useRouter } from "next/navigation";
import { Flex, Text, IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useDishTemplatesQuery } from "@/hooks";
import AddDishTemplateForm from "@/components/AddDishTemplateForm";
import Spinner from "@/components/Spinner";
import ErrorAlert from "@/components/ErrorAlert";

export default function Page() {
  const { data, status, error } = useDishTemplatesQuery();
  const router = useRouter();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorAlert message={error.message} />;
  }

  const handleEdit = (dishTemplateId) => {
    router.push(`/dishTemplates/${dishTemplateId}`);
  };

  const renderedDishTemplates = data.map((dishTemplate) => {
    const { id, title } = dishTemplate;
    return (
      <Flex key={id} justifyContent="space-between" alignItems="center" my="2">
        <Text>{title}</Text>
        <IconButton
          onClick={() => handleEdit(id)}
          size="sm"
          icon={<EditIcon />}
        />
      </Flex>
    );
  });

  return (
    <div>
      {renderedDishTemplates}
      <AddDishTemplateForm />
    </div>
  );
}
