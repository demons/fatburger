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
  HStack,
  useToast,
} from "@chakra-ui/react";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useCreateStory, useUpdateStory } from "@/hooks/story";
import { useGroupsQuery } from "@/hooks";
import dayjs from "dayjs";

export default function AddStoryForm({ editData }) {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [weight, setWeight] = useState("");
  const [type, setType] = useState();
  const [comment, setComment] = useState("");
  const toast = useToast();
  const { data: groups } = useGroupsQuery();
  const { mutate: createStory } = useCreateStory();
  const { mutate: updateStory } = useUpdateStory();
  const router = useRouter();

  useEffect(() => {
    if (editData) {
      const { date, type, comment, weight } = editData;
      date && setDate(date);
      weight && setWeight(weight);
      type && setType(type.toString());
      comment && setComment(comment);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "date":
        {
          setDate(value);
        }
        break;
      case "weight":
        {
          setWeight(value);
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

    if (editData) {
      const { id: storyId, energy, protein, fat, carb, fib } = editData;
      updateStory({
        storyId,
        date,
        energy,
        protein,
        fat,
        carb,
        fib,
        type,
        comment,
        weight: weight || null,
      });
    } else {
      const { energy, protein, fat, carb, fib } = groups.amount;
      createStory({
        date,
        energy,
        protein,
        fat,
        carb,
        fib,
        type,
        comment,
        weight: weight || null,
      });
    }

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
          <FormLabel>Вес</FormLabel>
          <Input
            type="number"
            name="weight"
            size="sm"
            value={weight}
            onChange={handleChange}
            placeholder={editData && weight ? weight : "Указать можно позже"}
            step=".01"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Комментарий</FormLabel>
          <Textarea name="comment" value={comment} onChange={handleChange} />
        </FormControl>
        <RadioGroup my="4" mx="auto" name="type" value={type}>
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
        <HStack margin="auto">
          <Button type="submit" colorScheme="green">
            {editData ? "Обновить" : "Добавить"}
          </Button>
          <Button onClick={() => router.push(`/stories`)}>Отмена</Button>
        </HStack>
      </Stack>
    </form>
  );
}
