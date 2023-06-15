"use client";

import AddGroupForm from "./components/AddGroupForm";
import Amount from "./components/Amount";
import GroupList from "./components/GroupList";

export default function GroupListPage() {
  return (
    <main>
      <h1>Список групп</h1>
      <Amount />
      <GroupList />
      <AddGroupForm />
    </main>
  );
}
