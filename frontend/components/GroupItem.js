import { useRouter } from "next/navigation";
import { useDeleteDish, useDeleteIngredientFromGroup } from "@/hooks";
import AmountItem from "./AmountItem";
import EditIngredientForm from "./EditIngredientForm";
import { useState } from "react";

function GroupItem({ groupItem, index }) {
  const [state, setState] = useState("");
  const router = useRouter();
  const { mutate: deleteDish } = useDeleteDish();
  const { mutate: deleteIngredient } = useDeleteIngredientFromGroup();
  const { energy, protein, fat, carb } = groupItem;
  const amount = { energy, protein, fat, carb };
  const { groupId, dishId, ingredientId } = groupItem;

  const handleChangeProductClick = () => {
    router.push(`/groups/${groupId}/ingredients/${ingredientId}`);
  };
  const handleEditClick = () => {
    setState("editIngredient");
  };

  const handleEditApply = () => {
    setState("");
  };

  const deleteGroupItem = () => {
    if (dishId) {
      deleteDish({ groupId, dishId });
    } else if (ingredientId) {
      deleteIngredient({ groupId, ingredientId });
    }
  };

  let content;

  switch (state) {
    case "editIngredient":
      {
        content = (
          <EditIngredientForm
            groupItem={groupItem}
            index={index}
            onApply={handleEditApply}
          />
        );
      }
      break;
    default: {
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
  }

  return <div className="group-item">{content}</div>;
}

export default GroupItem;
