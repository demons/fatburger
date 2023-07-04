import Link from "next/link";
import { Flex, HStack, Text, IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import EditIngredientForm from "./EditIngredientForm";
import { useStore } from "@/store";

export default function Ingredient({
  ingredient,
  parentUrl,
  onChanged,
  onDelete,
}) {
  const { editionIngredientId, setEditionIngredientId } = useStore();
  const { ingredientId, title, count, weight } = ingredient;

  const handleEdit = () => {
    setEditionIngredientId(ingredientId);
  };

  const handleApply = (count) => {
    onChanged(count);
    setEditionIngredientId(null);
  };

  const handleDelete = () => {
    onDelete(ingredientId);
  };

  if (editionIngredientId === ingredientId) {
    return <EditIngredientForm ingredient={ingredient} onApply={handleApply} />;
  }

  const measure = weight > 1 ? "шт." : "г.";

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      my="2"
      border="1px"
      p="2"
      borderColor="gray.200"
    >
      <Link href={`${parentUrl}/ingredients/${ingredientId}`}>{title}</Link>
      <HStack>
        <Text as="b" width="100px" align="right" pr="2" fontSize="sm">
          {count} {measure}
        </Text>
        <IconButton onClick={handleEdit} size="sm" icon={<EditIcon />} />
        <IconButton
          onClick={handleDelete}
          size="sm"
          colorScheme="red"
          icon={<DeleteIcon />}
        />
      </HStack>
    </Flex>
  );
}
