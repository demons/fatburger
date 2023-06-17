import EditGroup from "@/app/components/EditGroup";

export default function Page({ params }) {
  return <EditGroup groupId={params.id} />;
}
