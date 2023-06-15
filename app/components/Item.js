import { useProducts } from "../store";

function Item({ data }) {
  const { productId } = data;
  const { title } = useProducts((state) => state.getProductById(productId));

  return <div>{title}</div>;
}

export default Item;
