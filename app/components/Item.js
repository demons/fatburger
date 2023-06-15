function Item({ item, index }) {
  return (
    <div>
      {index}. {item.title}
    </div>
  );
}

export default Item;
