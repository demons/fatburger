import { useGroups } from "../store";
import Amount from "./Amount";
import GroupItemList from "./GroupItemList";

function Group({ group, items }) {
  const { removeGroup } = useGroups();

  const filteredGroupItems = items.filter((item) => item.groupId === group.id);

  let ingredients = [];
  filteredGroupItems.forEach((item) => {
    if (item.items) {
      ingredients = [...ingredients, ...item.items];
    } else {
      ingredients = [...ingredients, item];
    }
  });

  return (
    <div className="group-item">
      <div className="header">
        <div className="title">{group.title}</div>
        <Amount items={ingredients} />
        <button onClick={(e) => removeGroup(group.id)}>Удалить</button>
      </div>
      <GroupItemList items={filteredGroupItems} />
    </div>
  );
}

export default Group;
