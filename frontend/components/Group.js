import { useRouter } from "next/navigation";
import AmountItem from "./AmountItem";
import GroupItemList from "./GroupItemList";
import { useRemoveGroupMutation } from "@/hooks";

export default function Group({ group }) {
  const router = useRouter();
  const { mutate: removeGroup } = useRemoveGroupMutation();

  const { energy, protein, fat, carb, groupItems } = group;
  const amount = { energy, protein, fat, carb };

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
        <AmountItem amount={amount} />
        <div>
          <button onClick={handleEdit}>Редактировать</button>
          <button onClick={handleRemove}>Удалить</button>
        </div>
      </div>
      <GroupItemList groupItems={groupItems} />
    </div>
  );
}
