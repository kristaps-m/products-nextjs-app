import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
import Pagination, { paginate } from "../../component/Pagination";
import { useState } from "react";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  const groupProductsByRows = (products: Product[], itemsPerRow: number) => {
    const rows = [];
    for (let i = 0; i < products.length; i += itemsPerRow) {
      rows.push(products.slice(i, i + itemsPerRow));
    }
    return rows;
  };

  // Group products into rows of 2
  const rows = groupProductsByRows(products, 2);
  // const paginatedPosts: Product[][] = paginate(rows, currentPage, pageSize);
  const paginatedPosts: Product[] = paginate(products, currentPage, pageSize);

  return (
    <div data-testid="productList-1">
      {/* paginatedPosts */}
      {/* {paginatedPosts.map((row, rowIndex) => ( */}
      {/* <key={rowIndex}></key=> */}
      {/*  flex space-x-4 */}
      {/* className="grid grid-cols-2" */}
      <div className="grid grid-cols-2 gap-4 flex space-x-4">
        {paginatedPosts.map((product) => (
          <div
            key={product.id}
            // w-1/3 p-3 m-3
            className="hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      {/* ))} */}
      <br />
      <Pagination
        items={products.length} // rows.length
        currentPage={currentPage} // 1
        pageSize={pageSize} // 2
        onPageChange={onPageChange}
      />
    </div>
  );
}
