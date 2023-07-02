"use client";

import { Flex, Text, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useDishTemplatesQuery } from "@/hooks";
import { useAddDish } from "@/hooks/dish";
import Spinner from "@/components/Spinner";
import ErrorAlert from "@/components/ErrorAlert";
import Button from "@/components/Button";

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
      <Flex
        key={id}
        justifyContent="space-between"
        alignItems="center"
        border="1px"
        borderColor="gray.200"
        my="2"
        p="2"
      >
        <Text>{title}</Text>
        <Button onClick={() => handleAdd(id)}>Добавить</Button>
      </Flex>
    );
  });

  return (
    <Box my="2">
      <Button href={`/groups/${groupId}`}>Отмена</Button>
      {renderedDishTemplates}
    </Box>
  );
}
