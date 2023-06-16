import { useGroups } from "../store";
import Amount from "./Amount";
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
        <Amount items={ingredients} />
        <button onClick={(e) => removeGroup(group.id)}>Удалить</button>
      </div>
      <GroupItemList groupItems={groupItems} />
    </div>
  );
}

export default Group;
