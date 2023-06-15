import { useProducts } from "../store";

function Item({ data, index }) {
  const { productId } = data;
  const { title } = useProducts((state) => state.getProductById(productId));

  return (
    <div>
      {index}. {title}
    </div>
  );
}

export default Item;
