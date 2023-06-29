"use client";

import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();

  const { groupId, dishId } = params;

  return (
    <div>
      DishEdit groupId: {groupId}, dishId: {dishId}
    </div>
  );
}
