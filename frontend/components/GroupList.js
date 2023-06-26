"use client";

import Group from "./Group";

function GroupList({ groups }) {
  return groups.map((group) => {
    return <Group key={group.id} group={group} />;
  });
}

export default GroupList;
