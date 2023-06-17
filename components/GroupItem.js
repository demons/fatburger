import { useGroups } from "@/store";
import AmountItem from "./AmountItem";

function GroupItem({ groupItem, index, isEditable }) {
  const { removeGroupItem } = useGroups();

  const ingredients = groupItem.items ? groupItem.items : [groupItem];

  const buttons = (
    <>
      <button onClick={() => removeGroupItem(groupItem.id)}>Удалить</button>
    </>
  );

  return (
    <div className="group-item">
      <div className="header">
        {index}. {groupItem.title} <AmountItem items={ingredients} />
        {isEditable && buttons}
      </div>
    </div>
  );
}

export default GroupItem;
