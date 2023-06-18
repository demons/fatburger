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

  const handleSubmit = (e) => {
    e.preventDefault();

    addGroupItem(groupId, productId, count);
    router.push(`/groups/${groupId}`);
  };

  const handleCancelClick = () => {
    router.push(`/groups/${groupId}/products`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        ref={input}
        value={count}
        onChange={(e) => setCount(e.target.value)}
        autoFocus
      />
      <button type="submit">Добавить</button>
      <button type="button" onClick={handleCancelClick}>
        Отмена
      </button>
    </form>
  );
}
