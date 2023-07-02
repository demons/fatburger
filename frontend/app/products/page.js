"use client";

import { useRouter } from "next/navigation";
import { HStack, Flex, Stack, Text, IconButton, Box } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useDeleteProduct, useProductsQuery } from "@/hooks";
import Spinner from "@/components/Spinner";
import ErrorAlert from "@/components/ErrorAlert";
import AmountItem from "@/components/AmountItem";
import Button from "@/components/Button";

export default function Page() {
  const { data: products, status, error } = useProductsQuery();
  const { mutate: deleteProduct } = useDeleteProduct();
  const router = useRouter();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorAlert message={error.message} />;
  }

  const handleEdit = (productId) => {
    router.push(`/products/${productId}`);
  };

  const handleDelete = (productId) => {
    deleteProduct({ productId });
  };

  const renderedProducts = products
    .filter((product) => product.isDeleted === false)
    .map((product) => {
      const { id, title, maker } = product;
      return (
        <Flex
          key={id}
          justifyContent="space-between"
          alignItems="center"
          my="2"
        >
          <Stack>
            <HStack>
              <Text as="b">{title}</Text>
              <Text as="span" fontSize="xs">
                {maker}
              </Text>
            </HStack>
            <AmountItem amount={product} />
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
    <Box my="2">
      <Button href={`/products/add`} colorScheme="green">
        Добавить
      </Button>
      {renderedProducts}
    </Box>
  );
}
