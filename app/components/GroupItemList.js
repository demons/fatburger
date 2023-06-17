"use client";

import { useGroups } from "../store";
import GroupItem from "./GroupItem";

function GroupItemList({ groupId }) {
  const { getGroupItemsByGroupId } = useGroups();

  const groupItems = getGroupItemsByGroupId(groupId);

  const renderedGroupItems = groupItems.map((groupItem, index) => (
    <GroupItem key={groupItem.id} groupItem={groupItem} index={index + 1} />
  ));

  return <div>{renderedGroupItems}</div>;
}

export default GroupItemList;
