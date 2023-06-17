import GroupItemList from "./GroupItemList";

export default function EditGroup({ groupId }) {
  return (
    <div>
      <GroupItemList groupId={groupId} />
    </div>
  );
}
