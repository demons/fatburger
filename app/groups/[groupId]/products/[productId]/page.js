"use client";

import { useGroups } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Page({ params }) {
  const [count, setCount] = useState(0);
  const input = useRef();
  const { addGroupItem } = useGroups();
  const router = useRouter();

  const { groupId, productId } = params;

  useEffect(() => {
    input.current.select();
  }, []);

  return (
    <div>
      <input
        type="number"
        ref={input}
        value={count}
        onChange={(e) => setCount(e.target.value)}
        autoFocus
      />
      <button
        onClick={() => {
          addGroupItem(groupId, productId, count);

          router.push(`/groups/${groupId}`);
        }}
      >
        Добавить
      </button>
      <button onClick={() => router.push(`/groups/${groupId}/products`)}>
        Отмена
      </button>
    </div>
  );
}
