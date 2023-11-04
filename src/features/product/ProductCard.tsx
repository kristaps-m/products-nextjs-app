import { Product } from "../../app/models/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div style={{ border: "1px solid red" }}>
      <h3>
        The name:
        {product.name}
      </h3>
      <p>Price: {product.price}</p>
      <p>Category: {product.category}</p>
      {/* <button component={Link} to={`products/${product.id}`} size="small">
        View
      </button> */}
      <a href={`/products/${product.id}`}>
        <button className="button-style">View</button>
      </a>
    </div>
  );
}
