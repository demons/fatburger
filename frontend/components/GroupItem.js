import { useDeleteDish, useDeleteIngredientFromGroup } from "@/hooks";
import AmountItem from "./AmountItem";

function GroupItem({ groupItem, index }) {
  const { mutate: deleteDish } = useDeleteDish();
  const { mutate: deleteIngredient } = useDeleteIngredientFromGroup();
  const { energy, protein, fat, carb } = groupItem;
  const amount = { energy, protein, fat, carb };

  const deleteGroupItem = () => {
    const { groupId, dishId, ingredientId } = groupItem;
    if (dishId) {
      deleteDish({ groupId, dishId });
    } else if (ingredientId) {
      deleteIngredient({ groupId, ingredientId });
    }
  };

  return (
    <div className="group-item">
      <div className="header">
        {index}. {groupItem.title} <AmountItem amount={amount} />
        <button onClick={deleteGroupItem}>Удалить</button>
      </div>
    </div>
  );
}

export default GroupItem;
