import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  // Function to group products into rows of 3
  const groupProductsByRows = (products: Product[], itemsPerRow: number) => {
    const rows = [];
    for (let i = 0; i < products.length; i += itemsPerRow) {
      rows.push(products.slice(i, i + itemsPerRow));
    }
    return rows;
  };

  // Group products into rows of 3
  const rows = groupProductsByRows(products, 3);

  return (
    <div className="flex flex-col items-center">
      {rows.map((row, rowIndex) => (
        <div className="flex space-x-4" key={rowIndex}>
          {row.map((product) => (
            <div
              key={product.id}
              className="w-1/3 p-3 m-3 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
