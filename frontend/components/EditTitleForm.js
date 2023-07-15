import { useEffect, useState } from "react";
import { Input, HStack } from "@chakra-ui/react";
import Button from "./Button";

export default function EditTitleForm({ title, onApply }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(title);
  }, [title]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply(value.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack>
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="sm"
          autoFocus
        />
        <Button type="submit" colorScheme="green">
          Готово
        </Button>
      </HStack>
    </form>
  );
}
