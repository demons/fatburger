import AmountItem from "./AmountItem";

function GroupItem({ groupItem, index }) {
  const ingredients = groupItem.items ? groupItem.items : [groupItem];

  return (
    <div className="group-item">
      <div className="header">
        {index}. {groupItem.title} <AmountItem items={ingredients} />
      </div>
    </div>
  );
}

export default GroupItem;
