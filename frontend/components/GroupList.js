"use client";

import { useGroups } from "@/store";
import { useQuery } from "@tanstack/react-query";
import Group from "./Group";
import { getGroups } from "@/services";

function GroupList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
  });
  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Произошла какая-то ошибка";
  }

  return data.map((group) => <div key={group.id}>{group.title}</div>);
  const groups = useGroups((state) => state.groups);

  const renderedGroups = groups.map((group) => (
    <Group key={group.id} group={group} />
  ));

  return <div className="group-list">{renderedGroups}</div>;
}

export default GroupList;
