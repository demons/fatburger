import AmountItem from "./AmountItem";

function GroupItem({ groupItem, index }) {
  const ingredients = groupItem.items ? groupItem.items : [groupItem];

  return (
    <div>
      {index}. {groupItem.title} <AmountItem items={ingredients} />
    </div>
  );
}

export default GroupItem;
