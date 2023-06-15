import { useGroups } from "../store";
import Amount from "./Amount";
import ItemList from "./ItemList";

function GroupItem({ group }) {
  const removeGroup = useGroups((state) => state.removeGroup);

  return (
    <div className="group-item">
      <div className="header">
        <div className="title">{group.title}</div>
        <Amount />
        <button onClick={(e) => removeGroup(group.id)}>Удалить</button>
      </div>
      <ItemList />
    </div>
  );
}

export default GroupItem;
