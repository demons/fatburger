import { useRouter } from "next/navigation";
import AmountItem from "./AmountItem";
import GroupItemList from "./GroupItemList";
import { useRemoveGroupMutation } from "@/hooks";

export default function Group({ group }) {
  const router = useRouter();
  const { mutate: removeGroup } = useRemoveGroupMutation();

  const handleEdit = () => {
    router.push(`/groups/${group.id}`);
  };

  const handleRemove = () => {
    removeGroup(group.id);
  };

  return (
    <div className="group">
      <div className="header">
        <div className="title">{group.title}</div>
        <AmountItem items={group.groupItems} />
        <div>
          <button onClick={handleEdit}>Редактировать</button>
          <button onClick={handleRemove}>Удалить</button>
        </div>
      </div>
      <GroupItemList groupId={group.id} />
    </div>
  );
}
