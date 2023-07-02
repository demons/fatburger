"use client";

import { Flex, Stack, Text, HStack, IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import ErrorAlert from "@/components/ErrorAlert";
import Spinner from "@/components/Spinner";
import { useDeleteStory, useStoriesQuery } from "@/hooks/story";
import AmountItem from "@/components/AmountItem";
import Button from "@/components/Button";

export default function Page({ params }) {
  const { data: stories, status, error } = useStoriesQuery();
  const { mutate: deleteStory } = useDeleteStory();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorAlert />;
  }

  const handleEdit = () => {};

  const handleDelete = (storyId) => {
    deleteStory({ storyId });
  };

  const renderedStories = stories.map((story) => {
    const { id, date, comment, ...amount } = story;
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
        <Stack>
          <Text>{date}</Text>
          <AmountItem amount={amount} />
        </Stack>
        <Text>{comment}</Text>
        <HStack>
          <IconButton onClick={handleEdit} size="sm" icon={<EditIcon />} />
          <IconButton
            onClick={() => handleDelete(id)}
            size="sm"
            colorScheme="red"
            icon={<DeleteIcon />}
          />
        </HStack>
      </Flex>
    );
  });

  return (
    <Stack my="2">
      <HStack>
        <Button href={`/stories/add`} colorScheme="green">
          Добавить
        </Button>
      </HStack>
      {renderedStories}
    </Stack>
  );
}
