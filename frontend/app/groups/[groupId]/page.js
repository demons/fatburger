"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AmountItem from "@/components/AmountItem";
import GroupItemList from "@/components/GroupItemList";
import NotFoundPage from "@/components/NotFoundPage";
import { useGroupQuery } from "@/hooks";

export default function Page({ params }) {
  const { groupId } = params;
  const { data, isLoading, isError } = useGroupQuery(groupId);
  const router = useRouter();

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return <NotFoundPage timeout={1500} />;
  }

  const { amount, group } = data;

  return (
    <div className="edit-group">
      <button onClick={() => router.push(`/`)}>Готово</button>
      <AmountItem amount={amount} />
      <div className="header">
        <div className="title">{group.title}</div>
        <AmountItem
          amount={{
            energy: group.energy,
            protein: group.protein,
            fat: group.fat,
            carb: group.carb,
          }}
        />
      </div>
      <GroupItemList groupItems={group.groupItems} isEditable={true} />
      <div className="buttons">
        <Link href={`/groups/${groupId}/ingredients`}>Добавить ингредиент</Link>
        <Link href={`/groups/${groupId}/dishes`}>Добавить бюдо</Link>
      </div>
    </div>
  );
}
