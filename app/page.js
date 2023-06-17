"use client";

import AddGroupForm from "@/components/AddGroupForm";
import AmountItem from "@/components/AmountItem";
import GroupList from "@/components/GroupList";
import { useGroups } from "./store";

export default function GroupListPage() {
  const { getIngredients } = useGroups();

  const ingredients = getIngredients();

  return (
    <main>
      <h1>Список групп</h1>
      <AmountItem items={ingredients} />
      <GroupList />
      <AddGroupForm />
    </main>
  );
}
