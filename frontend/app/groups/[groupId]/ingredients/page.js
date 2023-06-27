import SelectProduct from "@/components/SelectProduct";

export default function Page({ params }) {
  const { groupId } = params;

  return <SelectProduct groupId={groupId} />;
}
