"use client";

import { useRouter } from "next/navigation";
import { useGroups } from "../store";
import AmountItem from "./AmountItem";
import GroupItemList from "./GroupItemList";
import NotFoundPage from "./NotFoundPage";

export default function EditGroup({ groupId }) {
  const router = useRouter();
  const { getGroupById, getIngredientsByGroupId, getIngredients } = useGroups();

  const group = getGroupById(groupId);

  if (!group) {
    return <NotFoundPage timeout={1500} />;
  }

  return (
    <div className="edit-group">
      <button onClick={() => router.push(`/`)}>Готово</button>
      <AmountItem items={getIngredients()} />
      <div className="header">
        <div className="title">{group.title}</div>
        <AmountItem items={getIngredientsByGroupId(groupId)} />
      </div>
      <GroupItemList groupId={groupId} isEditable={true} />
    </div>
  );
}
