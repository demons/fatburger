"use client";

import { Flex, Text, HStack } from "@chakra-ui/react";
import { useProductsQuery } from "@/hooks";
import Spinner from "./Spinner";
import ErrorAlert from "./ErrorAlert";
import Button from "./Button";

export default function SelectProduct({ onApply }) {
  const { data, status, error } = useProductsQuery();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorAlert message={error.message} />;
  }

  const renderedProducts = data.map((product) => {
    const { id, title, maker } = product;
    return (
      <Flex
        key={id}
        justifyContent="space-between"
        alignItems="center"
        my="2"
        border="1px"
        borderColor="gray.200"
        p="2"
      >
        <HStack>
          <Text as="b">{title}</Text>
          <Text as="span" fontSize="xs">
            {maker}
          </Text>
        </HStack>
        <Button onClick={() => onApply(id)}>Выбрать</Button>
      </Flex>
    );
  });

  return <div>{renderedProducts}</div>;
}
