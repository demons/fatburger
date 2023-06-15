"use client";

import { useGroups } from "../store";
import AddGroupForm from "./AddGroupForm";
import GroupItem from "./GroupItem";

function GroupList() {
  const groups = useGroups((state) => state.groups);

  const renderedGroups = groups.map((group) => (
    <GroupItem key={group.id} group={group} />
  ));

  return (
    <div className="group-list">
      <div className="groups">{renderedGroups}</div>
      <AddGroupForm />
    </div>
  );
}

export default GroupList;
