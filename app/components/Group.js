import { useRouter } from "next/navigation";
import { useGroups } from "../store";
import AmountItem from "./AmountItem";
import GroupItemList from "./GroupItemList";

function Group({ group }) {
  const router = useRouter();
  const { getGroupItemsByGroupId, getIngredientsByGroupId } = useGroups();

  const groupItems = getGroupItemsByGroupId(group.id);

  let ingredients = getIngredientsByGroupId(group.id);

  return (
    <div className="group" onClick={() => router.push(`/group/${group.id}`)}>
      <div className="header">
        <div className="title">{group.title}</div>
        <AmountItem items={ingredients} />
      </div>
      <GroupItemList groupItems={groupItems} />
    </div>
  );
}

export default Group;
