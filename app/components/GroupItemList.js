"use client";

import { useGroups } from "../store";
import GroupItem from "./GroupItem";

function GroupItemList({ groupId, isEditable }) {
  const { getGroupItemsByGroupId } = useGroups();

  const groupItems = getGroupItemsByGroupId(groupId);

  const renderedGroupItems = groupItems.map((groupItem, index) => (
    <GroupItem
      key={groupItem.id}
      groupItem={groupItem}
      index={index + 1}
      isEditable={isEditable}
    />
  ));

  return <div>{renderedGroupItems}</div>;
}

export default GroupItemList;
