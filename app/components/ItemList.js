import { useItems } from "../store";
import Item from "./Item";

function ItemList({ groupId }) {
  const items = useItems((state) =>
    state.items.filter((item) => item.groupId === groupId)
  );

  const renderedItems = items.map((item, index) => (
    <Item key={item.id} data={item} index={index + 1} />
  ));

  return <div>{renderedItems}</div>;
}

export default ItemList;
