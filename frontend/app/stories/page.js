"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Flex,
  Stack,
  Text,
  HStack,
  IconButton,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import ErrorAlert from "@/components/ErrorAlert";
import Spinner from "@/components/Spinner";
import { useDeleteStory, useStoriesQuery } from "@/hooks/story";
import AmountItem from "@/components/AmountItem";
import Button from "@/components/Button";

export default function Page({ params }) {
  const [view, setView] = useState("default");
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

  const toggleView = () => {
    const toggledView = view === "default" ? "table" : "default";
    setView(toggledView);
  };

  function getWeekDay(dateString) {
    const date = new Date(dateString);
    const days = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

    return days[date.getDay()];
  }

  const getWeightDiff = (prev, today) => {
    return prev && prev.weight && today.weight
      ? parseFloat((today.weight - prev.weight).toFixed(1))
      : null;
  };

  const renderDiff = (weightDiff) => {
    return weightDiff > 0 ? "+" + weightDiff : weightDiff;
  };

  const renderedStories = stories.map((story, index, array) => {
    const prevStory = index + 1 >= array.length ? null : array[index + 1];

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

    const weightDiff = getWeightDiff(prevStory, story);
    let weightColor = weightDiff && (weightDiff > 0 ? "red" : "green");

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
        <Stack w="100%">
          <Flex justifyContent="space-between">
            <Text>{date}</Text>
            <Text as="b" color={weightColor} w="110px">
              {weight && weight}{" "}
              {weight && weightDiff && <>({renderDiff(weightDiff)})</>}
            </Text>
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
          <AmountItem amount={amount} />
          {comment && (
            <Text borderTop="1px" borderColor="gray.200" py="1" w="90%">
              {comment}
            </Text>
          )}
        </Stack>
      </Flex>
    );
  });

  const renderedTable = () => {
    const renderedStories = stories.map((story, index, array) => {
      const prevStory = index + 1 >= array.length ? null : array[index + 1];
      const { id, date, comment, type, weight, ...amount } = story;

      // Вычисляем день недели
      let weightMondayDiff;
      let weightMondayColor;
      const dayOfWeek = new Date(date).getDay();
      if (dayOfWeek === 1) {
        const prevMonday = index + 7 >= array.length ? null : array[index + 7];
        weightMondayDiff = getWeightDiff(prevMonday, story);
        weightMondayColor =
          weightMondayDiff && (weightMondayDiff > 0 ? "red" : "green");
      }

      const weightDiff = getWeightDiff(prevStory, story);
      let weightColor = weightDiff && (weightDiff > 0 ? "red" : "green");

      return (
        <Tr>
          <Td>
            <Text as="b" color={weightMondayColor} w="110px">
              {dayOfWeek === 1 && <>{renderDiff(weightMondayDiff)}</>}
            </Text>
          </Td>
          <Td>{getWeekDay(date)}</Td>
          <Td>{date}</Td>
          <Td>
            <Text as="b" color={weightColor} w="110px">
              {weight && weight}{" "}
              {weight && weightDiff && <>({renderDiff(weightDiff)})</>}
            </Text>
          </Td>
          <Td>{comment}</Td>
        </Tr>
      );
    });
    return (
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Caption</TableCaption>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Дата</Th>
              <Th>Вес</Th>
            </Tr>
          </Thead>
          <Tbody>{renderedStories}</Tbody>
        </Table>
      </TableContainer>
    );
  };

  let content;
  switch (view) {
    case "table":
      {
        content = renderedTable();
      }
      break;
    default:
      content = renderedStories;
  }

  return (
    <Stack my="2">
      <HStack>
        <Button href={`/stories/add`} colorScheme="green">
          Добавить
        </Button>
        <Button
          colorScheme={view === "default" ? "gray" : "blue"}
          onClick={toggleView}
        >
          Таблица
        </Button>
      </HStack>
      {content}
    </Stack>
  );
}
