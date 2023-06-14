import { useGroups, useItems } from "../store";

function Group({ group }) {
  const removeGroup = useGroups((state) => state.removeGroup);
  const items = useItems((state) =>
    state.items.filter((item) => item.groupId === group.id)
  );

  const handleRemoveGroup = (id) => {
    removeGroup(id);
  };

  return (
    <div key={group.id}>
      {group.title}
      {items.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
      <button onClick={() => handleRemoveGroup(group.id)}>Удалить</button>
    </div>
  );
}

export default Group;
