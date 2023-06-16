import Amount from "./Amount";

function GroupItem({ groupItem, index }) {
  const ingredients = groupItem.items ? groupItem.items : [groupItem];

  return (
    <div>
      {index}. {groupItem.title} <Amount items={ingredients} />
    </div>
  );
}

export default GroupItem;
