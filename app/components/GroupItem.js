import { useGroups } from "../store";

function GroupItem({ group }) {
  const removeGroup = useGroups((state) => state.removeGroup);

  return (
    <div className="group-item">
      {group.title}
      <button onClick={(e) => removeGroup(group.id)}>Удалить</button>
    </div>
  );
}

export default GroupItem;
