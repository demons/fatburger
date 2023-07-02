"use client";

import { useRouter } from "next/navigation";
import {
  Input,
  Textarea,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  useToast,
} from "@chakra-ui/react";
import Button from "./Button";
import { useState } from "react";
import { useCreateStory } from "@/hooks/story";
import { useGroupsQuery } from "@/hooks";
import dayjs from "dayjs";

export default function AddStoryForm() {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [type, setType] = useState();
  const [comment, setComment] = useState("");
  const toast = useToast();
  const { data: groups } = useGroupsQuery();
  const { mutate: createStory } = useCreateStory();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "date":
        {
          setDate(value);
        }
        break;
      case "comment":
        {
          setComment(value);
        }
        break;
      case "type": {
        setType(value);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type) {
      toast({
        title: "Необходимо выбрать тип соблюдения",
        // description: "We've created your account for you.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const { energy, protein, fat, carb } = groups.amount;
    createStory({ date, energy, protein, fat, carb, type, comment });

    setDate(dayjs().format("YYYY-MM-DD"));
    setComment("");
    setType(null);
    router.push(`/stories`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack maxW="lg" mx="auto" my="2">
        <FormControl>
          <FormLabel>Дата</FormLabel>
          <Input
            type="date"
            name="date"
            value={date}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Комментарий</FormLabel>
          <Textarea name="comment" value={comment} onChange={handleChange} />
        </FormControl>
        <RadioGroup my="4" mx="auto" name="type">
          <Stack spacing={5} direction="row">
            <Radio
              colorScheme="red"
              value="1"
              checked={type === "1"}
              onChange={handleChange}
            >
              Не соблюдал
            </Radio>
            <Radio
              colorScheme="yellow"
              value="2"
              checked={type === "2"}
              onChange={handleChange}
            >
              Частично
            </Radio>
            <Radio
              colorScheme="green"
              value="3"
              checked={type === "3"}
              onChange={handleChange}
            >
              Соблюдал
            </Radio>
          </Stack>
        </RadioGroup>
        <Button type="submit" colorScheme="green">
          Добавить
        </Button>
      </Stack>
    </form>
  );
}
