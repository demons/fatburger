"use client";

import { useGroups } from "../store";
import Group from "./Group";

function GroupList() {
  const groups = useGroups((state) => state.groups);

  return groups.map((group) => <Group key={group.id} group={group} />);
}

export default GroupList;
