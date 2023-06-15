import { useGroups } from "../store";
import Amount from "./Amount";

function GroupItem({ group }) {
  const removeGroup = useGroups((state) => state.removeGroup);

  return (
    <div className="group-item">
      <div className="header">
        <div className="title">{group.title}</div>
        <Amount />
        <button onClick={(e) => removeGroup(group.id)}>Удалить</button>
      </div>
    </div>
  );
}

export default GroupItem;
