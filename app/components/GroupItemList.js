import GroupItem from "./GroupItem";

function GroupItemList({ groupItems }) {
  const renderedGroupItems = groupItems.map((groupItem, index) => (
    <GroupItem key={groupItem.id} groupItem={groupItem} index={index + 1} />
  ));

  return <div>{renderedGroupItems}</div>;
}

export default GroupItemList;
