import { useRouter } from "next/navigation";
import {
  useDeleteDish,
  useDeleteIngredientFromGroup,
  useEditIngredient,
} from "@/hooks";
import AmountItem from "./AmountItem";
import EditIngredientForm from "./EditIngredientForm";
import { useStore } from "@/store";

function GroupItem({ groupItem, index }) {
  const router = useRouter();
  const { mutate: deleteDish } = useDeleteDish();
  const { mutate: deleteIngredient } = useDeleteIngredientFromGroup();
  const { mutate: editIngredient } = useEditIngredient();

  const editionIngredientId = useStore((state) => state.editionIngredientId);
  const setEditionIngredientId = useStore(
    (state) => state.setEditionIngredientId
  );

  const { energy, protein, fat, carb } = groupItem;
  const amount = { energy, protein, fat, carb };
  const { groupId, dishId, ingredientId, productId } = groupItem;

  const handleChangeProductClick = () => {
    router.push(`/groups/${groupId}/ingredients/${ingredientId}`);
  };
  const handleEditClick = () => {
    setEditionIngredientId(ingredientId);
  };

  const handleApply = (count) => {
    if (count) {
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

  let content;

  if (editionIngredientId && editionIngredientId === ingredientId) {
    content = (
      <EditIngredientForm ingredient={groupItem} onApply={handleApply} />
    );
  } else {
    content = (
      <>
        <div className="header">
          <span onClick={handleChangeProductClick}>
            {index}. {groupItem.title}
          </span>{" "}
          <AmountItem amount={amount} />
          <span onClick={handleEditClick}>{groupItem.count}</span>
          <button onClick={deleteGroupItem}>Удалить</button>
        </div>
      </>
    );
  }

  return <div className="group-item">{content}</div>;
}

export default GroupItem;
