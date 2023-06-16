function GroupItem({ groupItem, index }) {
  return (
    <div>
      {index}. {groupItem.title}
    </div>
  );
}

export default GroupItem;
