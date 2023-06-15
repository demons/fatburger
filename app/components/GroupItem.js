import { useGroups, useItems, useProducts } from "../store";
import Amount from "./Amount";
import ItemList from "./ItemList";

function GroupItem({ group }) {
  const removeGroup = useGroups((state) => state.removeGroup);
  const { getProductById } = useProducts();

  const items = useItems((state) =>
    state.items
      .filter((item) => item.groupId === group.id)
      .map((item) => {
        const product = getProductById(item.productId);
        return product;
      })
  );

  return (
    <div className="group-item">
      <div className="header">
        <div className="title">{group.title}</div>
        <Amount />
        <button onClick={(e) => removeGroup(group.id)}>Удалить</button>
      </div>
      <ItemList items={items} />
    </div>
  );
}

export default GroupItem;
