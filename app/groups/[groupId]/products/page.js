"use client";

import { useGroups } from "@/store";
import Link from "next/link";

export default function Page({ params }) {
  const { products } = useGroups();

  const { groupId } = params;

  const renderedProducts = products.map((product) => {
    return (
      <Link
        className="product-item"
        key={product.id}
        href={`/groups/${groupId}/products/${product.id}`}
      >
        {product.title}
      </Link>
    );
  });

  return <div>{renderedProducts}</div>;
}
