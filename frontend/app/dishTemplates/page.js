"use client";

import { useRouter } from "next/navigation";
import { Flex, Text, IconButton, HStack } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useDishTemplatesQuery } from "@/hooks";
import AddDishTemplateForm from "@/components/AddDishTemplateForm";
import Spinner from "@/components/Spinner";
import ErrorAlert from "@/components/ErrorAlert";
import { useDeleteDishTemplate } from "@/hooks/dishTemplate";

export default function Page() {
  const { data, status, error } = useDishTemplatesQuery();
  const { mutate: deleteDishTemplate } = useDeleteDishTemplate();
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

  const handleDelete = (dishTemplateId) => {
    deleteDishTemplate({ dishTemplateId });
  };

  const renderedDishTemplates = data.map((dishTemplate) => {
    const { id, title } = dishTemplate;
    return (
      <Flex
        key={id}
        justifyContent="space-between"
        alignItems="center"
        my="2"
        border="1px"
        p="2"
        borderColor="gray.200"
      >
        <Text>{title}</Text>
        <HStack>
          <IconButton
            onClick={() => handleEdit(id)}
            size="sm"
            icon={<EditIcon />}
          />
          <IconButton
            onClick={() => handleDelete(id)}
            size="sm"
            colorScheme="red"
            icon={<DeleteIcon />}
          />
        </HStack>
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
