import { useAddDishTemplate } from "@/hooks/dishTemplate";
import { useState } from "react";
import { Input, HStack } from "@chakra-ui/react";
import Button from "./Button";

export default function AddDishTemplateForm() {
  const [title, setTitle] = useState("");
  const { mutate: addDishTemplate } = useAddDishTemplate();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDishTemplate({ title: title.trim() });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack maxW="sm" m="auto">
        <Input
          type="text"
          value={title}
          onChange={handleChange}
          size="sm"
          required
        />
        <Button type="submit" colorScheme="green">
          Добавить
        </Button>
      </HStack>
    </form>
  );
}
