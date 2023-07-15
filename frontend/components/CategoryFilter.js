import { useCategoriesQuery } from "@/hooks/category";
import Spinner from "./Spinner";
import { Wrap, WrapItem } from "@chakra-ui/react";
import Button from "./Button";
import ErrorAlert from "./ErrorAlert";
import { useStore } from "@/store";
import { useEffect } from "react";

export default function CategoryFilter({ onChanged }) {
  const { data, status, error } = useCategoriesQuery();
  const categoryFilter = useStore((state) => state.categoryFilter);
  const addCategoryFilter = useStore((state) => state.addCategoryFilter);
  const deleteCategoryFilter = useStore((state) => state.deleteCategoryFilter);
  const clearCategoryFilter = useStore((state) => state.clearCategoryFilter);
  const getCategoryFilter = useStore((state) => state.getCategoryFilter);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorAlert message={error.message} />;
  }

  const handleClear = () => {
    if (!categoryFilter) {
      return;
    }
    clearCategoryFilter();
    onChanged && onChanged();
  };

  const handeButtonClick = (id) => {
    if (categoryFilter && categoryFilter[id]) {
      deleteCategoryFilter(id);
    } else {
      addCategoryFilter(id);
    }
    onChanged && onChanged();
  };

  const allButton = (
    <WrapItem>
      <Button
        colorScheme={!categoryFilter ? "blue" : "gray"}
        onClick={handleClear}
      >
        Все
      </Button>
    </WrapItem>
  );

  const renderedCategories = data.map(({ id, title }) => {
    return (
      <WrapItem key={id}>
        <Button
          colorScheme={categoryFilter && categoryFilter[id] ? "blue" : "gray"}
          onClick={() => handeButtonClick(id)}
        >
          {title}
        </Button>
      </WrapItem>
    );
  });

  return (
    <Wrap my="2">
      {allButton}
      {renderedCategories}
    </Wrap>
  );
}
