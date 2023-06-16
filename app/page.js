"use client";

import AddGroupForm from "./components/AddGroupForm";
import Amount from "./components/Amount";
import GroupList from "./components/GroupList";
import { useGroups } from "./store";

export default function GroupListPage() {
  const { getGroupItems } = useGroups();

  const groupItems = getGroupItems();

  return (
    <main>
      <h1>Список групп</h1>
      <Amount items={groupItems} />
      <GroupList groupItems={groupItems} />
      <AddGroupForm />
    </main>
  );
}
