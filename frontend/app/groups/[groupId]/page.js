"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGroups } from "@/store";
import AmountItem from "@/components/AmountItem";
import GroupItemList from "@/components/GroupItemList";
import NotFoundPage from "@/components/NotFoundPage";

export default function Page({ params }) {
  const router = useRouter();
  const { getGroupById, getIngredientsByGroupId, getIngredients } = useGroups();

  const { groupId } = params;
  const group = getGroupById(groupId);

  if (!group) {
    return <NotFoundPage timeout={1500} />;
  }

  return (
    <div className="edit-group">
      <button onClick={() => router.push(`/`)}>Готово</button>
      <AmountItem items={getIngredients()} />
      <div className="header">
        <div className="title">{group.title}</div>
        <AmountItem items={getIngredientsByGroupId(groupId)} />
      </div>
      <GroupItemList groupId={groupId} isEditable={true} />
      <div className="buttons">
        <Link href={`/groups/${groupId}/products`}>Добавить ингредиент</Link>
        <Link href={`/groups/${groupId}/dishTemplates`}>Добавить бюдо</Link>
      </div>
    </div>
  );
}
