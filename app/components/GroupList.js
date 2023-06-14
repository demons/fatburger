"use client";

import { useGroups } from "../store";
import AddGroupForm from "./AddGroupForm";
import Group from "./Group";

function GroupList() {
  const groups = useGroups((state) => state.groups);

  const renderedGroups = groups.map((group) => (
    <Group key={group.id} group={group} />
  ));

  return (
    <div>
      <div className="groups">{renderedGroups}</div>
      <AddGroupForm />
    </div>
  );
}

export default GroupList;
