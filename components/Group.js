import { useRouter } from "next/navigation";
import { useGroups } from "@/store";
import AmountItem from "./AmountItem";
import GroupItemList from "./GroupItemList";

function Group({ group }) {
  const router = useRouter();
  const { getIngredientsByGroupId, removeGroup } = useGroups();

  let ingredients = getIngredientsByGroupId(group.id);

  return (
    <div className="group">
      <div className="header">
        <div className="title">{group.title}</div>
        <AmountItem items={ingredients} />
        <button onClick={() => router.push(`/group/${group.id}`)}>
          Редактировать
        </button>
        <button onClick={() => removeGroup(group.id)}>Удалить</button>
      </div>
      <GroupItemList groupId={group.id} />
    </div>
  );
}

export default Group;
