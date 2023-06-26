import AmountItem from "./AmountItem";

function GroupItem({ groupItem, index }) {
  const { energy, protein, fat, carb } = groupItem;
  const amount = { energy, protein, fat, carb };

  const removeGroupItem = () => {
    if (groupItem.dishId) {
      console.log("Удаляем блюдо");
    } else if (groupItem.ingredientId) {
      console.log("Удаляем ингредиент");
    }
  };

  return (
    <div className="group-item">
      <div className="header">
        {index}. {groupItem.title} <AmountItem amount={amount} />
        <button onClick={removeGroupItem}>Удалить</button>
      </div>
    </div>
  );
}

export default GroupItem;
