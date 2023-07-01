import { useState } from "react";
import { Input, Button, HStack, Center } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "@/services";

function AddGroupForm() {
  const [title, setTitle] = useState("");
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      return;
    }

    mutate(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Center>
        <HStack>
          <Input
            placeholder="Название группы"
            size="sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit" colorScheme="green" size="sm">
            Добавить
          </Button>
        </HStack>
      </Center>
    </form>
  );
}

export default AddGroupForm;
