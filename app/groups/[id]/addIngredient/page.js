"use client";

import { useGroups } from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page({ params }) {
  const { products, addGroupItem } = useGroups();
  const [count, setCount] = useState(0);
  const router = useRouter();

  const groupId = params.id;

  const renderedProducts = products.map((product) => {
    return <div key={product.id}>{product.title}</div>;
  });

  return (
    <div>
      {renderedProducts}
      <input
        type="text"
        value={count}
        onChange={(e) => setCount(e.target.value)}
      />
      <button
        onClick={() => {
          addGroupItem(groupId, "1", count);

          router.push(`/groups/${groupId}`);
        }}
      >
        Добавить
      </button>
    </div>
  );
}
