import GroupItem from "./GroupItem";

function GroupItemList({ items }) {
  const renderedItems = items.map((item, index) => (
    <GroupItem key={item.id} item={item} index={index + 1} />
  ));

  return <div>{renderedItems}</div>;
}

export default GroupItemList;
