"use client";

import { useGroups } from "@/store";
import Group from "./Group";
import { useGroupsQuery } from "@/hooks";

function GroupList() {
  const { data, isLoading, isSuccess } = useGroupsQuery();

  if (isLoading) {
    return "Loading...";
  }

  return (
    isSuccess && data.map((group) => <div key={group.id}>{group.title}</div>)
  );
  const groups = useGroups((state) => state.groups);

  const renderedGroups = groups.map((group) => (
    <Group key={group.id} group={group} />
  ));

  return <div className="group-list">{renderedGroups}</div>;
}

export default GroupList;
