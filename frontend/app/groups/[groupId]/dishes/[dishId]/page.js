"use client";

import { Box, HStack, Heading, Input, Text } from "@chakra-ui/react";
import EditTitleForm from "@/components/EditTitleForm";
import ErrorAlert from "@/components/ErrorAlert";
import IngredientList from "@/components/IngredientList";
import Spinner from "@/components/Spinner";
import {
  useDeleteIngredient,
  useDishQuery,
  useEditIngredient,
  useUpdateDish,
} from "@/hooks/dish";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/Button";

export default function Page({ params }) {
  const [state, setState] = useState("");
  const [weight, setWeight] = useState("");
  const [count, setCount] = useState("");
  const { groupId, dishId } = params;
  const { data, status, error } = useDishQuery(groupId, dishId);
  const { mutate: updateDish } = useUpdateDish();
  const { mutate: editIngredient } = useEditIngredient();
  const { mutate: deleteIngredient } = useDeleteIngredient();
  const router = useRouter();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorAlert message={error.message} />;
  }

  const handleTitleApply = (title) => {
    updateDish({ groupId, dishId, title });
    setState("");
  };

  const handleEditIngredient = (data) => {
    if (!data) {
      return;
    }
    const { ingredientId, count } = data;
    editIngredient({ groupId, dishId, ingredientId, count });
  };

  const handleDeleteIngredient = (ingredientId) => {
    deleteIngredient({ groupId, dishId, ingredientId });
  };

  const handleApply = () => {
    updateDish({
      groupId,
      dishId,
      title: data.title,
      weight: Math.round(weight || data.weight || 0),
      count: Math.round(count || data.count || 0),
    });
    router.push(`/groups/${groupId}`);
  };

  const titleContent =
    state === "edit" ? (
      <EditTitleForm title={data.title} onApply={handleTitleApply} />
    ) : (
      <div onClick={() => setState("edit")}>{data.title}</div>
    );

  return (
    <Box my="2">
      <HStack>
        <Button onClick={handleApply}>Готово</Button>
        <Text>Вес:</Text>
        <Input
          type="number"
          name="weight"
          size="sm"
          w="100px"
          value={weight}
          onChange={({ target }) => setWeight(target.value)}
          placeholder={data.weight || "Не указан"}
          step="1"
        />
        <Text>Кол-во:</Text>
        <Input
          type="number"
          name="count"
          size="sm"
          w="100px"
          value={count}
          onChange={({ target }) => setCount(target.value)}
          placeholder={data.count || "Не указан"}
          step="1"
        />
      </HStack>
      <Heading as="h2" size="lg">
        {titleContent}
      </Heading>
      <IngredientList
        ingredients={data.ingredients}
        parentUrl={`/groups/${groupId}/dishes/${dishId}`}
        onChanged={handleEditIngredient}
        onDelete={handleDeleteIngredient}
      />
      <Button
        href={`/groups/${groupId}/dishes/${dishId}/ingredients`}
        colorScheme="green"
      >
        Добавить ингредиент
      </Button>
    </Box>
  );
}
