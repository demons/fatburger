"use client";

import { Box, HStack, Heading } from "@chakra-ui/react";
import IngredientList from "@/components/IngredientList";
import {
  useDeleteIngredientFromDishTemplate,
  useDishTemplateQuery,
} from "@/hooks";
import { useState } from "react";
import { useEditIngredient, useUpdateDishTemplate } from "@/hooks/dishTemplate";
import EditTitleForm from "@/components/EditTitleForm";
import ErrorAlert from "@/components/ErrorAlert";
import Spinner from "@/components/Spinner";
import Button from "@/components/Button";

export default function Page({ params }) {
  const [state, setState] = useState("");
  const { dishTemplateId } = params;
  const {
    data: dishTemplate,
    status,
    error,
  } = useDishTemplateQuery(dishTemplateId);
  const { mutate: editIngredient } = useEditIngredient();
  const { mutate: deleteIngredient } = useDeleteIngredientFromDishTemplate();
  const { mutate: updateDishTemplate } = useUpdateDishTemplate();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorAlert message={error.message} />;
  }

  const { title } = dishTemplate;

  const handleApply = (title) => {
    updateDishTemplate({ dishTemplateId, title });
    setState("");
  };

  const handleEditIngredient = (data) => {
    if (!data) {
      return;
    }
    const { ingredientId, count } = data;
    editIngredient({ dishTemplateId, ingredientId, count });
  };

  const handleDeleteIngredient = (ingredientId) => {
    deleteIngredient({ dishTemplateId, ingredientId });
  };

  const titleContent =
    state === "edit" ? (
      <EditTitleForm title={title} onApply={handleApply} />
    ) : (
      <span onClick={() => setState("edit")}>{title}</span>
    );

  return (
    <Box my="2">
      <HStack>
        <Button href={`/dishTemplates`} colorScheme="green">
          Готово
        </Button>
        <Button href={`/dishTemplates/${dishTemplateId}/ingredients`}>
          Добавить ингредиент
        </Button>
      </HStack>
      <Heading as="h3" size="lg">
        {titleContent}
      </Heading>
      <IngredientList
        ingredients={dishTemplate.ingredients}
        parentUrl={`/dishTemplates/${dishTemplateId}`}
        onChanged={handleEditIngredient}
        onDelete={handleDeleteIngredient}
      />
    </Box>
  );
}
