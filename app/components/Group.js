import { useRouter } from "next/navigation";
import { useGroups } from "../store";
import AmountItem from "./AmountItem";
import GroupItemList from "./GroupItemList";

function Group({ group }) {
  const router = useRouter();
  const { getIngredientsByGroupId } = useGroups();

  let ingredients = getIngredientsByGroupId(group.id);

  return (
    <div className="group" onClick={() => router.push(`/group/${group.id}`)}>
      <div className="header">
        <div className="title">{group.title}</div>
        <AmountItem items={ingredients} />
      </div>
      <GroupItemList groupId={group.id} />
    </div>
  );
}

export default Group;
