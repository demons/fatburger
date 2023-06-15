"use client";

import { useGroups } from "../store";
import GroupItem from "./GroupItem";

function GroupList({ items }) {
  const groups = useGroups((state) => state.groups);

  const renderedGroups = groups.map((group) => (
    <GroupItem key={group.id} group={group} items={items} />
  ));

  return <div className="group-list">{renderedGroups}</div>;
}

export default GroupList;
