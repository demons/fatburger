"use client";

import AddGroupForm from "@/components/AddGroupForm";
import AmountItem from "@/components/AmountItem";
import GroupList from "@/components/GroupList";
import { useGroupsQuery } from "@/hooks";

export default function GroupListPage() {
  const { data, isLoading, isError } = useGroupsQuery();

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Произошла ошибка...";
  }

  return (
    <main>
      <AmountItem amount={data.amount} />
      <GroupList groups={data.groups} />
      <AddGroupForm />
    </main>
  );
}
