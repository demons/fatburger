import { useGroups } from "../store";
import AmountItem from "./AmountItem";
import GroupItemList from "./GroupItemList";

function Group({ group }) {
  const { removeGroup, getGroupItemsByGroupId, getIngredientsByGroupId } =
    useGroups();

  const groupItems = getGroupItemsByGroupId(group.id);

  let ingredients = getIngredientsByGroupId(group.id);

  return (
    <div className="group-item">
      <div className="header">
        <div className="title">{group.title}</div>
        <AmountItem items={ingredients} />
        <button onClick={(e) => removeGroup(group.id)}>Удалить</button>
      </div>
      <GroupItemList groupItems={groupItems} />
    </div>
  );
}

export default Group;
