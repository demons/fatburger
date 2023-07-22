"use client";

import { useRouter } from "next/navigation";
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
  const router = useRouter();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorAlert message={error.message} />;
  }

  const handleEdit = (storyId) => {
    router.push(`/stories/${storyId}`);
  };

  const handleDelete = (storyId) => {
    deleteStory({ storyId });
  };

  const renderedStories = stories.map((story) => {
    const { id, date, comment, type, weight, ...amount } = story;
    let color = "";
    switch (type) {
      case 1:
        {
          color = "red";
        }
        break;
      case 2:
        {
          color = "orange";
        }
        break;
      case 3:
        {
          color = "green";
        }
        break;
    }
    const settings = {
      borderLeftColor: color,
      borderLeftWidth: "5px",
    };

    return (
      <Flex
        key={id}
        justifyContent="space-between"
        alignItems="center"
        border="1px"
        borderColor="gray.200"
        {...settings}
        my="2"
        p="2"
      >
        <Stack>
          <Flex justifyContent="space-between">
            <Text>{date}</Text>
            <Text as="b">{weight}</Text>
          </Flex>
          <AmountItem amount={amount} />
          {comment && (
            <Text borderTop="1px" borderColor="gray.200" py="1" w="90%">
              {comment}
            </Text>
          )}
        </Stack>
        <HStack>
          <IconButton
            onClick={() => handleEdit(id)}
            size="sm"
            icon={<EditIcon />}
          />
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
