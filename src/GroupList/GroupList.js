import AddGroupForm from "../AddGroupForm";
import Group from "../Group";
import { useGroups } from "../store";

function GroupList() {
  const groups = useGroups((state) => state.groups);

  return (
    <div>
      {groups.map((group) => (
        <Group key={group.id} group={group} />
      ))}
      <AddGroupForm />
    </div>
  );
}

export default GroupList;
