import { useState } from "react";
import { Input, Flex, HStack } from "@chakra-ui/react";
import Button from "./Button";

export default function EditIngredientForm({ ingredient, onApply }) {
  const [count, setCount] = useState("");

  const handleCancel = () => {
    onApply(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (count === "" || parseInt(count) === ingredient.count) {
      return onApply(null);
    }
    const { ingredientId } = ingredient;
    onApply({ ingredientId, count });
  };

  const handleChange = (e) => {
    setCount(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex justifyContent="space-between" alignItems="center">
        {ingredient.title}
        <HStack>
          <Input
            type="number"
            value={count}
            autoFocus
            placeholder={ingredient.count}
            onChange={handleChange}
            size="sm"
            width="100px"
          />
          <Button type="submit" colorScheme="green">
            Изменить
          </Button>
          <Button type="button" colorScheme="red" onClick={handleCancel}>
            Отмена
          </Button>
        </HStack>
      </Flex>
    </form>
  );
}
