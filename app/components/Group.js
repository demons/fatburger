import { useGroups } from "../store";
import Amount from "./Amount";
import GroupItemList from "./GroupItemList";

function Group({ group, items }) {
  const { removeGroup } = useGroups();

  const filteredItems = items.filter((item) => item.groupId === group.id);

  return (
    <div className="group-item">
      <div className="header">
        <div className="title">{group.title}</div>
        <Amount items={filteredItems} />
        <button onClick={(e) => removeGroup(group.id)}>Удалить</button>
      </div>
      <GroupItemList items={filteredItems} />
    </div>
  );
}

export default Group;
