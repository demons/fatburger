"use client";

import { Flex, Text, HStack } from "@chakra-ui/react";
import { useProductsQuery } from "@/hooks";
import Spinner from "./Spinner";
import ErrorAlert from "./ErrorAlert";
import Button from "./Button";
import CategoryFilter from "./CategoryFilter";
import { useCategoriesQuery } from "@/hooks/category";
import { useEffect, useState } from "react";
import { useStore } from "@/store";

export default function SelectProduct({ onApply }) {
  const [categories, setCategories] = useState({});
  const [products, setProducts] = useState([]);
  const getCategoryFilter = useStore((state) => state.getCategoryFilter);
  const { data: queryProducts, status, error } = useProductsQuery();
  const { data: queryCategories } = useCategoriesQuery();

  const getAll = () =>
    queryProducts.filter((product) => product.isDeleted === false);

  useEffect(() => {
    if (queryProducts) {
      setProducts(getAll());
      handleChangedFilter();
    }
  }, [queryProducts]);

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

  const handleChangedFilter = () => {
    const categories = getCategoryFilter() || {};
    const length = Object.keys(categories).length;
    const filteredProducts =
      length > 0
        ? getAll().filter(({ categoryId }) => categories[categoryId])
        : getAll();

    setProducts(filteredProducts);
  };

  const renderedProducts = products.map((product) => {
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

        <HStack>
          <Text>{product.weight > 1 && "шт."}</Text>
          <Button onClick={() => onApply(id)}>Выбрать</Button>
        </HStack>
      </Flex>
    );
  });

  return (
    <>
      {queryCategories && (
        <CategoryFilter
          categories={queryCategories}
          onChanged={handleChangedFilter}
        />
      )}
      {renderedProducts}
    </>
  );
}
