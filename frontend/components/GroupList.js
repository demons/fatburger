"use client";

import Group from "./Group";
import { useGroupsQuery } from "@/hooks";

function GroupList() {
  const { data: groups, status } = useGroupsQuery();

  switch (status) {
    case "loading": {
      return "Loading...";
    }
    case "success": {
      return groups.map((group) => <Group key={group.id} group={group} />);
    }
  }
}

export default GroupList;
