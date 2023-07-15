"use client";

import { useRouter } from "next/navigation";
import { HStack, Flex, Stack, Text, IconButton, Box } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useDeleteProduct, useProductsQuery } from "@/hooks";
import Spinner from "@/components/Spinner";
import ErrorAlert from "@/components/ErrorAlert";
import AmountItem from "@/components/AmountItem";
import Button from "@/components/Button";
import CategoryFilter from "@/components/CategoryFilter";
import { useEffect, useState } from "react";
import { useStore } from "@/store";
import { useCategoriesQuery } from "@/hooks/category";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const getCategoryFilter = useStore((state) => state.getCategoryFilter);
  const { data: queryCategories } = useCategoriesQuery();
  const { data, status, error } = useProductsQuery();
  const { mutate: deleteProduct } = useDeleteProduct();
  const router = useRouter();

  const getAll = () => data.filter((product) => product.isDeleted === false);

  useEffect(() => {
    if (data) {
      setProducts(getAll());
      handleChangedFilter();
    }
  }, [data]);

  useEffect(() => {
    if (queryCategories) {
      setCategories(
        queryCategories.reduce((prev, curr) => {
          prev[curr.id] = curr.title;
          return prev;
        }, {})
      );
    }
  }, [queryCategories]);

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

  const handleChangedFilter = () => {
    const categories = getCategoryFilter() || {};
    const length = Object.keys(categories).length;
    const filteredProducts =
      length > 0
        ? getAll().filter(({ categoryId }) => categories[categoryId])
        : getAll();

    setProducts(filteredProducts);
  };

  const renderProduct = (product) => {
    const { id, title, maker, categoryId } = product;
    return (
      <Flex
        key={id}
        justifyContent="space-between"
        alignItems="center"
        my="2"
        border="1px"
        p="2"
        borderColor="gray.200"
      >
        <Stack>
          <HStack>
            <Text as="b">{title}</Text>
            <Text as="span" fontSize="xs">
              {maker}
            </Text>
          </HStack>
          <Text fontSize="xs" color="blue">
            {categories[categoryId]}
          </Text>
          <AmountItem amount={product} />
        </Stack>
        <HStack>
          {product.weight > 1 && <Text as="b">шт.</Text>}
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
  };

  const renderedProducts = products.map((product) => renderProduct(product));

  return (
    <Box my="2">
      <Button href={`/products/add`} colorScheme="green">
        Добавить
      </Button>
      <CategoryFilter
        categories={queryCategories}
        onChanged={handleChangedFilter}
      />
      {renderedProducts}
    </Box>
  );
}
