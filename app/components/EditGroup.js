"use client";

import { useGroups } from "../store";
import AmountItem from "./AmountItem";
import GroupItemList from "./GroupItemList";

export default function EditGroup({ groupId }) {
  const { getGroupById, getIngredientsByGroupId } = useGroups();

  const group = getGroupById(groupId);

  return (
    <div className="edit-group">
      <div className="header">
        <div className="title">{group.title}</div>
        <AmountItem items={getIngredientsByGroupId(groupId)} />
      </div>
      <GroupItemList groupId={groupId} />
    </div>
  );
}
