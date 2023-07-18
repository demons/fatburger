import { Wrap, WrapItem } from "@chakra-ui/react";
import Button from "./Button";
import { useStore } from "@/store";

export default function CategoryFilter({ categories, onChanged }) {
  const categoryFilter = useStore((state) => state.categoryFilter);
  const addCategoryFilter = useStore((state) => state.addCategoryFilter);
  const deleteCategoryFilter = useStore((state) => state.deleteCategoryFilter);
  const clearCategoryFilter = useStore((state) => state.clearCategoryFilter);

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

  const renderedCategories = categories.map(({ id, title }) => {
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
