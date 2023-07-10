"use client";

import { useRouter } from "next/navigation";
import { Box, HStack, Heading, Text, Input } from "@chakra-ui/react";
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
  const [weight, setWeight] = useState("");
  const { dishTemplateId } = params;
  const {
    data: dishTemplate,
    status,
    error,
  } = useDishTemplateQuery(dishTemplateId);
  const { mutate: editIngredient } = useEditIngredient();
  const { mutate: deleteIngredient } = useDeleteIngredientFromDishTemplate();
  const { mutate: updateDishTemplate } = useUpdateDishTemplate();
  const router = useRouter();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorAlert message={error.message} />;
  }

  const { title } = dishTemplate;

  const handleApply = () => {
    updateDishTemplate({
      dishTemplateId,
      weight: Math.round(weight || dishTemplate.weight || 0),
    });
    router.push(`/dishTemplates`);
  };

  const handleTitleEditApply = (title) => {
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
      <EditTitleForm title={title} onApply={handleTitleEditApply} />
    ) : (
      <span onClick={() => setState("edit")}>{title}</span>
    );

  return (
    <Box my="2">
      <HStack>
        <Button onClick={handleApply} colorScheme="green">
          Готово
        </Button>
        <Button href={`/dishTemplates/${dishTemplateId}/ingredients`}>
          Добавить ингредиент
        </Button>
        <Text>Вес:</Text>
        <Input
          type="number"
          name="weight"
          size="sm"
          w="100px"
          value={weight}
          onChange={({ target }) => setWeight(target.value)}
          placeholder={dishTemplate.weight || "Не указан"}
          step="1"
        />
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
