"use client";

import { useGroups } from "../store";
import Group from "./Group";

function GroupList({ groupItems }) {
  const groups = useGroups((state) => state.groups);

  const renderedGroups = groups.map((group) => (
    <Group key={group.id} group={group} groupItems={groupItems} />
  ));

  return <div className="group-list">{renderedGroups}</div>;
}

export default GroupList;
