"use client";

import { useGroups } from "../app/store";
import Group from "./Group";

function GroupList() {
  const groups = useGroups((state) => state.groups);

  const renderedGroups = groups.map((group) => (
    <Group key={group.id} group={group} />
  ));

  return <div className="group-list">{renderedGroups}</div>;
}

export default GroupList;
