import Item from "./Item";

function ItemList({ items }) {
  const renderedItems = items.map((item, index) => (
    <Item key={item.id} item={item} index={index + 1} />
  ));

  return <div>{renderedItems}</div>;
}

export default ItemList;
