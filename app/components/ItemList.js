import { useItems } from "../store";
import Item from "./Item";

function ItemList({ groupId }) {
  const items = useItems((state) =>
    state.items.filter((item) => item.groupId === groupId)
  );

  const renderedItems = items.map((item) => <Item key={item.id} data={item} />);

  return <div>{renderedItems}</div>;
}

export default ItemList;
