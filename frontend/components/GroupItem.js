import { useRouter } from "next/navigation";
import {
  useDeleteDish,
  useDeleteIngredientFromGroup,
  useEditIngredient,
} from "@/hooks";
import { Flex, IconButton, Text, HStack, Stack } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import AmountItem from "./AmountItem";
import EditIngredientForm from "./EditIngredientForm";
import { useStore } from "@/store";

function GroupItem({ groupItem, index, isCompact }) {
  const router = useRouter();
  const { mutate: deleteDish } = useDeleteDish();
  const { mutate: deleteIngredient } = useDeleteIngredientFromGroup();
  const { mutate: editIngredient } = useEditIngredient();

  const editionIngredientId = useStore((state) => state.editionIngredientId);
  const setEditionIngredientId = useStore(
    (state) => state.setEditionIngredientId
  );

  const { energy, protein, fat, carb, fib } = groupItem;
  const amount = { energy, protein, fat, carb, fib };
  const { groupId, dishId, ingredientId, productId } = groupItem;

  const handleChangeProductClick = () => {
    if (isCompact) {
      return;
    }
    if (groupItem.dishId) {
      router.push(`/groups/${groupId}/dishes/${groupItem.dishId}`);
    } else if (groupItem.ingredientId) {
      router.push(`/groups/${groupId}/ingredients/${ingredientId}`);
    }
  };
  const handleEditClick = () => {
    if (isCompact) {
      return;
    }
    setEditionIngredientId(ingredientId);
  };

  const handleApply = (data) => {
    if (data) {
      const { count } = data;
      editIngredient({ groupId, ingredientId, productId, count });
    }
    setEditionIngredientId(null);
  };

  const deleteGroupItem = () => {
    if (dishId) {
      deleteDish({ groupId, dishId });
    } else if (ingredientId) {
      deleteIngredient({ groupId, ingredientId });
    }
  };

  const measure = ingredientId && (groupItem.weight > 1 ? "шт." : "г.");

  let countContent;
  if (groupItem.ingredientId) {
    countContent = (
      <Text
        as="b"
        width="100px"
        textAlign="center"
        fontSize="sm"
        onClick={handleEditClick}
      >
        {groupItem.count} {measure}
      </Text>
    );
  } else if (groupItem.dishId && groupItem.dishWeight > 0) {
    countContent = (
      <Text as="b" width="100px" textAlign="center" fontSize="sm">
        {groupItem.dishCount} гр.
      </Text>
    );
  }

  const color = groupItem.ingredientId ? "lightgreen" : "blue";

  let content;

  if (editionIngredientId && editionIngredientId === ingredientId) {
    content = (
      <EditIngredientForm ingredient={groupItem} onApply={handleApply} />
    );
  } else {
    content = (
      <Flex
        py="2"
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Stack borderLeft="4px" borderLeftColor={color} pl="3px">
          <Text onClick={handleChangeProductClick}>
            {index}. {groupItem.title}
          </Text>
          <AmountItem amount={amount} />
        </Stack>
        <HStack>
          {countContent}
          {!isCompact && (
            <IconButton
              onClick={deleteGroupItem}
              size="sm"
              colorScheme="red"
              icon={<DeleteIcon />}
            />
          )}
        </HStack>
      </Flex>
    );
  }

  return <div className="group-item">{content}</div>;
}

export default GroupItem;
