import SelectProduct from "@/components/SelectProduct";

export default function Page({ params }) {
  const { groupId, ingredientId } = params;

  return <SelectProduct groupId={groupId} ingredientId={ingredientId} />;
}
