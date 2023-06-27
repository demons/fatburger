import { useDeleteDish, useDeleteIngredientFromGroup } from "@/hooks";
import AmountItem from "./AmountItem";
import EditIngredientForm from "./EditIngredientForm";
import { useState } from "react";

function GroupItem({ groupItem, index }) {
  const [state, setState] = useState("");
  const { mutate: deleteDish } = useDeleteDish();
  const { mutate: deleteIngredient } = useDeleteIngredientFromGroup();
  const { energy, protein, fat, carb } = groupItem;
  const amount = { energy, protein, fat, carb };
  const { groupId, dishId, ingredientId } = groupItem;

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
            {index}. {groupItem.title} <AmountItem amount={amount} />
            <button onClick={handleEditClick}>Редактировать</button>
            <button onClick={deleteGroupItem}>Удалить</button>
          </div>
        </>
      );
    }
  }

  return <div className="group-item">{content}</div>;
}

export default GroupItem;
