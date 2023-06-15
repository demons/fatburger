"use client";

import AddGroupForm from "./components/AddGroupForm";
import Amount from "./components/Amount";
import GroupList from "./components/GroupList";
import { useGroups } from "./store";

export default function GroupListPage() {
  const { getProductById } = useGroups();

  const items = useGroups((state) =>
    state.items.map((item) => {
      const product = getProductById(item.productId);
      return {
        groupId: item.groupId,
        ...product,
      };
    })
  );

  return (
    <main>
      <h1>Список групп</h1>
      <Amount items={items} />
      <GroupList items={items} />
      <AddGroupForm />
    </main>
  );
}
