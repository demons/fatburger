"use client";

import AddGroupForm from "./components/AddGroupForm";
import Amount from "./components/Amount";
import GroupList from "./components/GroupList";
import { useItems, useProducts } from "./store";

export default function GroupListPage() {
  const { getProductById } = useProducts();

  const items = useItems((state) =>
    state.items.map((item) => {
      const product = getProductById(item.productId);
      return product;
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
