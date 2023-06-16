import { useGroups } from "../store";
import Amount from "./Amount";
import GroupItemList from "./GroupItemList";

function Group({ group, groupItems }) {
  const { removeGroup } = useGroups();

  const filteredGroupItems = groupItems.filter(
    (groupItem) => groupItem.groupId === group.id
  );

  let ingredients = [];
  filteredGroupItems.forEach((groupItem) => {
    if (groupItem.groupItems) {
      ingredients = [...ingredients, ...groupItem.groupItems];
    } else {
      ingredients = [...ingredients, groupItem];
    }
  });

  return (
    <div className="group-item">
      <div className="header">
        <div className="title">{group.title}</div>
        <Amount items={ingredients} />
        <button onClick={(e) => removeGroup(group.id)}>Удалить</button>
      </div>
      <GroupItemList groupItems={filteredGroupItems} />
    </div>
  );
}

export default Group;
