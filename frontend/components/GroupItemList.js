"use client";

import GroupItem from "./GroupItem";

function GroupItemList({ groupItems, isCompact }) {
  const renderedGroupItems = groupItems.map((groupItem, index) => (
    <GroupItem
      key={groupItem.createdAt}
      groupItem={groupItem}
      index={index + 1}
      isCompact={isCompact}
    />
  ));

  return <div>{renderedGroupItems}</div>;
}

export default GroupItemList;
